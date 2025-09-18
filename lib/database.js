import fs from 'fs'
import path from 'path'

const DATABASE_PATH = path.join(process.cwd(), 'data', 'database.json')
const DATA_DIR = path.join(process.cwd(), 'data')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Initialize database with demo data if it doesn't exist
function initializeDatabase() {
  if (!fs.existsSync(DATABASE_PATH)) {
    const initialData = {
      subscribers: [
        {
          id: '1',
          email: 'john.doe@example.com',
          name: 'John Doe',
          subscribedAt: '2024-01-15T00:00:00.000Z',
          plan: 'free',
          status: 'active',
          tutorialsCompleted: 12,
          aiToolsUsed: 8,
          learningStreak: 15,
          joinedDate: '2024-01-15',
          lastActive: '2024-12-15T10:30:00.000Z',
          preferences: {
            newsletter: true,
            notifications: true,
            theme: 'auto'
          },
          progress: {
            currentTutorial: 'building-first-chatbot',
            completedTutorials: [
              'getting-started-with-ai',
              'ai-basics',
              'machine-learning-intro'
            ],
            bookmarkedPosts: ['getting-started-with-ai'],
            skillLevel: 'beginner'
          }
        },
        {
          id: '2',
          email: 'jane.smith@example.com',
          name: 'Jane Smith',
          subscribedAt: '2024-02-01T00:00:00.000Z',
          plan: 'free',
          status: 'active',
          tutorialsCompleted: 8,
          aiToolsUsed: 5,
          learningStreak: 7,
          joinedDate: '2024-02-01',
          lastActive: '2024-12-14T15:45:00.000Z',
          preferences: {
            newsletter: true,
            notifications: false,
            theme: 'dark'
          },
          progress: {
            currentTutorial: 'ai-tools-productivity',
            completedTutorials: [
              'getting-started-with-ai',
              'ai-basics'
            ],
            bookmarkedPosts: [],
            skillLevel: 'beginner'
          }
        },
        {
          id: '3',
          email: 'bob.wilson@example.com',
          name: 'Bob Wilson',
          subscribedAt: '2024-02-10T00:00:00.000Z',
          plan: 'free',
          status: 'active',
          tutorialsCompleted: 5,
          aiToolsUsed: 3,
          learningStreak: 3,
          joinedDate: '2024-02-10',
          lastActive: '2024-12-13T09:20:00.000Z',
          preferences: {
            newsletter: false,
            notifications: true,
            theme: 'light'
          },
          progress: {
            currentTutorial: 'getting-started-with-ai',
            completedTutorials: [],
            bookmarkedPosts: ['getting-started-with-ai', 'building-first-chatbot'],
            skillLevel: 'beginner'
          }
        },
        {
          id: '4',
          email: 'alice.johnson@example.com',
          name: 'Alice Johnson',
          subscribedAt: '2024-02-15T00:00:00.000Z',
          plan: 'free',
          status: 'active',
          tutorialsCompleted: 20,
          aiToolsUsed: 12,
          learningStreak: 25,
          joinedDate: '2024-02-15',
          lastActive: '2024-12-15T14:10:00.000Z',
          preferences: {
            newsletter: true,
            notifications: true,
            theme: 'auto'
          },
          progress: {
            currentTutorial: 'advanced-ai-concepts',
            completedTutorials: [
              'getting-started-with-ai',
              'building-first-chatbot',
              'ai-tools-productivity',
              'machine-learning-basics',
              'ai-future-everyday'
            ],
            bookmarkedPosts: ['building-first-chatbot', 'ai-tools-productivity'],
            skillLevel: 'intermediate'
          }
        },
        {
          id: '5',
          email: 'charlie.brown@example.com',
          name: 'Charlie Brown',
          subscribedAt: '2024-02-20T00:00:00.000Z',
          plan: 'free',
          status: 'active',
          tutorialsCompleted: 3,
          aiToolsUsed: 2,
          learningStreak: 1,
          joinedDate: '2024-02-20',
          lastActive: '2024-12-12T11:55:00.000Z',
          preferences: {
            newsletter: true,
            notifications: false,
            theme: 'light'
          },
          progress: {
            currentTutorial: 'getting-started-with-ai',
            completedTutorials: [],
            bookmarkedPosts: [],
            skillLevel: 'beginner'
          }
        }
      ],
      posts: [
        {
          id: 'getting-started-with-ai',
          title: "Getting Started with AI: A Beginner's Guide",
          description: "Learn the fundamentals of artificial intelligence and how it can transform your daily workflow.",
          date: '2024-12-15',
          category: 'beginner',
          featured: true,
          readTime: '5 min read',
          author: 'MOSBytes Team',
          tags: ['ai', 'beginner', 'tutorial'],
          views: 1250,
          likes: 89,
          content: `# Welcome to the World of AI

Artificial Intelligence is no longer a concept from science fiction—it's here, and it's transforming how we work, learn, and live.

## What is Artificial Intelligence?

AI refers to computer systems that can perform tasks that typically require human intelligence...`
        },
        {
          id: 'building-first-chatbot',
          title: "Building Your First Chatbot with Python",
          description: "Step-by-step tutorial on creating an intelligent chatbot using modern AI frameworks.",
          date: '2024-12-10',
          category: 'tutorial',
          featured: false,
          readTime: '8 min read',
          author: 'MOSBytes Team',
          tags: ['python', 'chatbot', 'tutorial', 'coding'],
          views: 892,
          likes: 67,
          content: `# Building Your First AI Chatbot

Ready to create your own chatbot? In this tutorial, we'll build a simple but intelligent chatbot using Python...`
        }
      ],
      analytics: {
        totalViews: 5420,
        totalSubscribers: 5,
        totalPosts: 2,
        monthlyGrowth: 12.5,
        popularPosts: ['getting-started-with-ai', 'building-first-chatbot'],
        userEngagement: {
          averageSessionTime: '4:32',
          bounceRate: '32%',
          returnVisitors: '68%'
        }
      },
      settings: {
        siteName: 'MOSBytes',
        siteDescription: 'AI for Everyone - Learn, Build, and Grow with AI',
        maintenanceMode: false,
        allowRegistrations: true,
        maxSubscribers: 10000,
        featuredPostsLimit: 3
      }
    }

    fs.writeFileSync(DATABASE_PATH, JSON.stringify(initialData, null, 2))
    console.log('✅ Database initialized with demo data')
  }
}

// Read database
export function readDatabase() {
  try {
    initializeDatabase()
    const data = fs.readFileSync(DATABASE_PATH, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading database:', error)
    return null
  }
}

// Write database
export function writeDatabase(data) {
  try {
    fs.writeFileSync(DATABASE_PATH, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Error writing database:', error)
    return false
  }
}

// Get all subscribers
export function getAllSubscribers() {
  const db = readDatabase()
  return db ? db.subscribers : []
}

// Get subscriber by email
export function getSubscriberByEmail(email) {
  const db = readDatabase()
  if (!db) return null
  return db.subscribers.find(sub => sub.email.toLowerCase() === email.toLowerCase())
}

// Add new subscriber
export function addSubscriber(subscriberData) {
  const db = readDatabase()
  if (!db) return false

  const existingSubscriber = db.subscribers.find(sub => sub.email === subscriberData.email)
  if (existingSubscriber) {
    return { success: false, message: 'Email already subscribed' }
  }

  const newSubscriber = {
    id: Date.now().toString(),
    email: subscriberData.email,
    name: subscriberData.name || '',
    subscribedAt: new Date().toISOString(),
    plan: subscriberData.plan || 'free',
    status: 'active',
    tutorialsCompleted: 0,
    aiToolsUsed: 0,
    learningStreak: 0,
    joinedDate: new Date().toISOString().split('T')[0],
    lastActive: new Date().toISOString(),
    preferences: {
      newsletter: true,
      notifications: true,
      theme: 'auto'
    },
    progress: {
      currentTutorial: null,
      completedTutorials: [],
      bookmarkedPosts: [],
      skillLevel: 'beginner'
    }
  }

  db.subscribers.push(newSubscriber)
  const success = writeDatabase(db)
  
  return success 
    ? { success: true, subscriber: newSubscriber }
    : { success: false, message: 'Failed to save subscriber' }
}

// Update subscriber
export function updateSubscriber(email, updateData) {
  const db = readDatabase()
  if (!db) return false

  const subscriberIndex = db.subscribers.findIndex(sub => sub.email.toLowerCase() === email.toLowerCase())
  if (subscriberIndex === -1) return false

  db.subscribers[subscriberIndex] = { ...db.subscribers[subscriberIndex], ...updateData }
  return writeDatabase(db)
}

// Delete subscriber
export function deleteSubscriber(email) {
  const db = readDatabase()
  if (!db) return false

  const subscriberIndex = db.subscribers.findIndex(sub => sub.email.toLowerCase() === email.toLowerCase())
  if (subscriberIndex === -1) return false

  db.subscribers.splice(subscriberIndex, 1)
  return writeDatabase(db)
}

// Get all posts
export function getAllPosts() {
  const db = readDatabase()
  return db ? db.posts : []
}

// Get post by ID
export function getPostById(id) {
  const db = readDatabase()
  if (!db) return null
  return db.posts.find(post => post.id === id)
}

// Add new post
export function addPost(postData) {
  const db = readDatabase()
  if (!db) return false

  const newPost = {
    id: postData.id,
    title: postData.title,
    description: postData.description,
    date: new Date().toISOString().split('T')[0],
    category: postData.category || 'general',
    featured: postData.featured || false,
    readTime: postData.readTime || '5 min read',
    author: 'MOSBytes Team',
    tags: postData.tags || [],
    views: 0,
    likes: 0,
    content: postData.content
  }

  db.posts.push(newPost)
  return writeDatabase(db)
}

// Update post
export function updatePost(id, updateData) {
  const db = readDatabase()
  if (!db) return false

  const postIndex = db.posts.findIndex(post => post.id === id)
  if (postIndex === -1) return false

  db.posts[postIndex] = { ...db.posts[postIndex], ...updateData }
  return writeDatabase(db)
}

// Delete post
export function deletePost(id) {
  const db = readDatabase()
  if (!db) return false

  const postIndex = db.posts.findIndex(post => post.id === id)
  if (postIndex === -1) return false

  db.posts.splice(postIndex, 1)
  return writeDatabase(db)
}

// Get analytics
export function getAnalytics() {
  const db = readDatabase()
  if (!db) return null

  // Update real-time analytics
  const subscribers = db.subscribers
  const posts = db.posts

  const analytics = {
    ...db.analytics,
    totalSubscribers: subscribers.length,
    totalPosts: posts.length,
    totalViews: posts.reduce((sum, post) => sum + (post.views || 0), 0),
    activeSubscribers: subscribers.filter(sub => sub.status === 'active').length,
    recentSubscribers: subscribers.slice(-5).reverse(),
    recentPosts: posts.slice(-5).reverse()
  }

  return analytics
}

// Update analytics
export function updateAnalytics(analyticsData) {
  const db = readDatabase()
  if (!db) return false

  db.analytics = { ...db.analytics, ...analyticsData }
  return writeDatabase(db)
}

// Get settings
export function getSettings() {
  const db = readDatabase()
  return db ? db.settings : null
}

// Update settings
export function updateSettings(settingsData) {
  const db = readDatabase()
  if (!db) return false

  db.settings = { ...db.settings, ...settingsData }
  return writeDatabase(db)
}

// Backup database
export function backupDatabase() {
  const db = readDatabase()
  if (!db) return false

  const backupPath = path.join(DATA_DIR, `backup-${Date.now()}.json`)
  try {
    fs.writeFileSync(backupPath, JSON.stringify(db, null, 2))
    return backupPath
  } catch (error) {
    console.error('Error creating backup:', error)
    return false
  }
}

// Initialize database on import
initializeDatabase()