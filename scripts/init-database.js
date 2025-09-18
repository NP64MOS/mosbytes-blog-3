#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(process.cwd(), 'data')
const DATABASE_PATH = path.join(DATA_DIR, 'database.json')

console.log('🚀 Initializing MOSBytes Database...')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  console.log('✅ Created data directory')
}

// Initialize database with demo data
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
        completedTutorials: ['getting-started-with-ai', 'ai-basics', 'machine-learning-intro'],
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
        completedTutorials: ['getting-started-with-ai', 'ai-basics'],
        bookmarkedPosts: [],
        skillLevel: 'beginner'
      }
    },
    {
      id: '3',
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
      content: `# Welcome to the World of AI\n\nArtificial Intelligence is no longer a concept from science fiction—it's here, and it's transforming how we work, learn, and live.\n\n## What is Artificial Intelligence?\n\nAI refers to computer systems that can perform tasks that typically require human intelligence...`
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
      content: `# Building Your First AI Chatbot\n\nReady to create your own chatbot? In this tutorial, we'll build a simple but intelligent chatbot using Python...`
    }
  ],
  analytics: {
    totalViews: 5420,
    totalSubscribers: 3,
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

try {
  fs.writeFileSync(DATABASE_PATH, JSON.stringify(initialData, null, 2))
  console.log('✅ Database initialized successfully!')
  console.log(`📍 Database location: ${DATABASE_PATH}`)
  console.log(`📊 Demo data includes:`)
  console.log(`   - ${initialData.subscribers.length} subscribers`)
  console.log(`   - ${initialData.posts.length} blog posts`)
  console.log(`   - Analytics and settings`)
  console.log('')
  console.log('🎉 Ready to start development!')
  console.log('   Run: npm run dev')
} catch (error) {
  console.error('❌ Error initializing database:', error)
  process.exit(1)
}