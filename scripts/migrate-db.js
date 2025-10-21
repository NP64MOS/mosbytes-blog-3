const { neon } = require('@neondatabase/serverless')

const sql = neon(process.env.DATABASE_URL)

async function migrateDatabase() {
  try {
    console.log('🔄 Starting database migration...')
    
    // Drop existing tables to recreate with correct schema
    await sql`DROP TABLE IF EXISTS posts CASCADE`
    await sql`DROP TABLE IF EXISTS subscribers CASCADE`
    await sql`DROP TABLE IF EXISTS analytics CASCADE`
    await sql`DROP TABLE IF EXISTS settings CASCADE`
    
    console.log('✅ Dropped existing tables')
    
    // Create subscribers table with all required columns
    await sql`
      CREATE TABLE subscribers (
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
    console.log('✅ Created subscribers table')
    
    // Create posts table with all required columns
    await sql`
      CREATE TABLE posts (
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
    console.log('✅ Created posts table')
    
    // Create analytics table
    await sql`
      CREATE TABLE analytics (
        id SERIAL PRIMARY KEY,
        total_views INTEGER DEFAULT 0,
        total_subscribers INTEGER DEFAULT 0,
        total_posts INTEGER DEFAULT 0,
        monthly_growth DECIMAL(5,2) DEFAULT 0,
        popular_posts TEXT[] DEFAULT '{}',
        user_engagement JSONB DEFAULT '{"averageSessionTime": "0:00", "bounceRate": "0%", "returnVisitors": "0%"}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log('✅ Created analytics table')
    
    // Create settings table
    await sql`
      CREATE TABLE settings (
        id SERIAL PRIMARY KEY,
        site_name VARCHAR(255) DEFAULT 'MOSBytes',
        site_description TEXT DEFAULT 'AI for Everyone - Learn, Build, and Grow with AI',
        maintenance_mode BOOLEAN DEFAULT false,
        allow_registrations BOOLEAN DEFAULT true,
        max_subscribers INTEGER DEFAULT 10000,
        featured_posts_limit INTEGER DEFAULT 3,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log('✅ Created settings table')
    
    // Insert sample data
    await sql`
      INSERT INTO posts (id, title, description, category, featured, content) VALUES
      ('getting-started-with-ai', 'Getting Started with AI: A Beginner''s Guide', 'Learn the fundamentals of artificial intelligence and how it can transform your daily workflow.', 'beginner', true, '# Welcome to the World of AI\n\nArtificial Intelligence is transforming how we work and live.\n\n## What is AI?\n\nAI refers to computer systems that can perform tasks that typically require human intelligence...'),
      ('building-first-chatbot', 'Building Your First Chatbot with Python', 'Step-by-step tutorial on creating an intelligent chatbot using modern AI frameworks.', 'tutorial', false, '# Building Your First AI Chatbot\n\nReady to create your own chatbot? In this tutorial, we will build a simple but intelligent chatbot using Python...')
    `
    console.log('✅ Inserted sample posts')
    
    // Insert default analytics
    await sql`
      INSERT INTO analytics (total_views, total_subscribers, total_posts, monthly_growth)
      VALUES (0, 0, 2, 0)
    `
    console.log('✅ Inserted default analytics')
    
    // Insert default settings
    await sql`
      INSERT INTO settings (site_name, site_description)
      VALUES ('MOSBytes', 'AI for Everyone - Learn, Build, and Grow with AI')
    `
    console.log('✅ Inserted default settings')
    
    // Verify data
    const posts = await sql`SELECT id, title FROM posts`
    const subscribers = await sql`SELECT COUNT(*) as count FROM subscribers`
    
    console.log('📊 Migration completed successfully!')
    console.log(`   Posts: ${posts.length}`)
    console.log(`   Subscribers: ${subscribers[0].count}`)
    
    posts.forEach(post => {
      console.log(`   - ${post.title}`)
    })
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    process.exit(1)
  }
}

// Run migration
migrateDatabase()