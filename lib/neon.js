import { neon } from '@neondatabase/serverless'

// Create Neon serverless connection
const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL)

// Test connection function
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW()`
    console.log('✅ Connected to Neon PostgreSQL database')
    return true
  } catch (error) {
    console.error('❌ Neon PostgreSQL connection error:', error)
    return false
  }
}

// Initialize database tables
export async function initializeNeonDatabase() {
  try {
    // Create subscribers table
    await sql`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        plan VARCHAR(50) DEFAULT 'free',
        status VARCHAR(50) DEFAULT 'active',
        tutorials_completed INTEGER DEFAULT 0,
        ai_tools_used INTEGER DEFAULT 0,
        learning_streak INTEGER DEFAULT 0,
        joined_date DATE DEFAULT CURRENT_DATE,
        last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        preferences JSONB DEFAULT '{"newsletter": true, "notifications": true, "theme": "auto"}',
        progress JSONB DEFAULT '{"currentTutorial": null, "completedTutorials": [], "bookmarkedPosts": [], "skillLevel": "beginner"}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create posts table
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        description TEXT,
        date DATE DEFAULT CURRENT_DATE,
        category VARCHAR(100) DEFAULT 'general',
        featured BOOLEAN DEFAULT false,
        read_time VARCHAR(50) DEFAULT '5 min read',
        author VARCHAR(255) DEFAULT 'MOSBytes Team',
        tags TEXT[] DEFAULT '{}',
        views INTEGER DEFAULT 0,
        likes INTEGER DEFAULT 0,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create analytics table
    await sql`
      CREATE TABLE IF NOT EXISTS analytics (
        id SERIAL PRIMARY KEY,
        total_views INTEGER DEFAULT 0,
        total_subscribers INTEGER DEFAULT 0,
        total_posts INTEGER DEFAULT 0,
        monthly_growth DECIMAL(5,2) DEFAULT 0,
        popular_posts TEXT[] DEFAULT '{}',
        user_engagement JSONB DEFAULT '{"averageSessionTime": "0:00", "bounceRate": "0%", "returnVisitors": "0%"}',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create settings table
    await sql`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        site_name VARCHAR(255) DEFAULT 'MOSBytes',
        site_description TEXT DEFAULT 'AI for Everyone - Learn, Build, and Grow with AI',
        maintenance_mode BOOLEAN DEFAULT false,
        allow_registrations BOOLEAN DEFAULT true,
        max_subscribers INTEGER DEFAULT 10000,
        featured_posts_limit INTEGER DEFAULT 3,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Insert default analytics if not exists
    const analyticsResult = await sql`SELECT COUNT(*) FROM analytics`
    if (parseInt(analyticsResult[0].count) === 0) {
      await sql`
        INSERT INTO analytics (total_views, total_subscribers, total_posts, monthly_growth)
        VALUES (0, 0, 0, 0)
      `
    }

    // Insert default settings if not exists
    const settingsResult = await sql`SELECT COUNT(*) FROM settings`
    if (parseInt(settingsResult[0].count) === 0) {
      await sql`
        INSERT INTO settings (site_name, site_description)
        VALUES ('MOSBytes', 'AI for Everyone - Learn, Build, and Grow with AI')
      `
    }

    // Insert sample posts if none exist
    const postsResult = await sql`SELECT COUNT(*) FROM posts`
    if (parseInt(postsResult[0].count) === 0) {
      await sql`
        INSERT INTO posts (id, title, description, category, featured, content) VALUES
        ('getting-started-with-ai', 'Getting Started with AI: A Beginner''s Guide', 'Learn the fundamentals of artificial intelligence and how it can transform your daily workflow.', 'beginner', true, '# Welcome to the World of AI\n\nArtificial Intelligence is no longer a concept from science fiction—it''s here, and it''s transforming how we work, learn, and live.\n\n## What is Artificial Intelligence?\n\nAI refers to computer systems that can perform tasks that typically require human intelligence...'),
        ('building-first-chatbot', 'Building Your First Chatbot with Python', 'Step-by-step tutorial on creating an intelligent chatbot using modern AI frameworks.', 'tutorial', false, '# Building Your First AI Chatbot\n\nReady to create your own chatbot? In this tutorial, we''ll build a simple but intelligent chatbot using Python...')
      `
    }

    console.log('✅ Neon PostgreSQL database tables initialized')
    
  } catch (error) {
    console.error('❌ Error initializing Neon PostgreSQL database:', error)
    throw error
  }
}

// Subscriber functions
export async function getAllSubscribersNeon() {
  try {
    const result = await sql`SELECT * FROM subscribers ORDER BY subscribed_at DESC`
    return result
  } catch (error) {
    console.error('Error getting subscribers:', error)
    return []
  }
}

export async function getSubscriberByEmailNeon(email) {
  try {
    const result = await sql`SELECT * FROM subscribers WHERE email = ${email.toLowerCase()}`
    return result[0] || null
  } catch (error) {
    console.error('Error getting subscriber:', error)
    return null
  }
}

export async function addSubscriberNeon(subscriberData) {
  try {
    const existingSubscriber = await getSubscriberByEmailNeon(subscriberData.email)
    if (existingSubscriber) {
      return { success: false, message: 'Email already subscribed' }
    }

    const result = await sql`
      INSERT INTO subscribers (email, name, plan)
      VALUES (${subscriberData.email.toLowerCase()}, ${subscriberData.name || ''}, ${subscriberData.plan || 'free'})
      RETURNING *
    `

    return { success: true, subscriber: result[0] }
  } catch (error) {
    console.error('Error adding subscriber:', error)
    return { success: false, message: 'Failed to save subscriber' }
  }
}

export async function deleteSubscriberNeon(email) {
  try {
    const result = await sql`DELETE FROM subscribers WHERE email = ${email.toLowerCase()}`
    return result.length > 0
  } catch (error) {
    console.error('Error deleting subscriber:', error)
    return false
  }
}

// Post functions
export async function getAllPostsNeon() {
  try {
    const result = await sql`SELECT * FROM posts ORDER BY date DESC`
    return result
  } catch (error) {
    console.error('Error getting posts:', error)
    return []
  }
}

export async function getPostByIdNeon(id) {
  try {
    const result = await sql`SELECT * FROM posts WHERE id = ${id}`
    return result[0] || null
  } catch (error) {
    console.error('Error getting post:', error)
    return null
  }
}

export async function addPostNeon(postData) {
  try {
    const result = await sql`
      INSERT INTO posts (id, title, description, category, featured, read_time, tags, content)
      VALUES (${postData.id}, ${postData.title}, ${postData.description}, ${postData.category || 'general'}, ${postData.featured || false}, ${postData.readTime || '5 min read'}, ${postData.tags || []}, ${postData.content})
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error('Error adding post:', error)
    return null
  }
}

export async function updatePostNeon(id, updateData) {
  try {
    const result = await sql`
      UPDATE posts 
      SET title = ${updateData.title}, description = ${updateData.description}, content = ${updateData.content}, category = ${updateData.category}, featured = ${updateData.featured}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `
    console.log('Update result:', result)
    return result.length > 0 ? result[0] : null
  } catch (error) {
    console.error('Error updating post:', error)
    return null
  }
}

export async function deletePostNeon(id) {
  try {
    const result = await sql`DELETE FROM posts WHERE id = ${id}`
    console.log('Delete result:', result)
    return result.length > 0
  } catch (error) {
    console.error('Error deleting post:', error)
    return false
  }
}

// Analytics functions
export async function getAnalyticsNeon() {
  try {
    const [analyticsResult, subscribersCount, postsCount] = await Promise.all([
      sql`SELECT * FROM analytics ORDER BY id DESC LIMIT 1`,
      sql`SELECT COUNT(*) FROM subscribers WHERE status = 'active'`,
      sql`SELECT COUNT(*) FROM posts`
    ])

    const analytics = analyticsResult[0] || {}
    
    return {
      ...analytics,
      totalSubscribers: parseInt(subscribersCount[0].count),
      totalPosts: parseInt(postsCount[0].count),
      activeSubscribers: parseInt(subscribersCount[0].count)
    }
  } catch (error) {
    console.error('Error getting analytics:', error)
    return null
  }
}

export async function updateAnalyticsNeon(analyticsData) {
  try {
    const result = await sql`
      UPDATE analytics 
      SET total_views = ${analyticsData.totalViews || 0}, 
          monthly_growth = ${analyticsData.monthlyGrowth || 0},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
      RETURNING *
    `
    return result[0] || null
  } catch (error) {
    console.error('Error updating analytics:', error)
    return null
  }
}

export default sql