// Database adapter that switches between JSON and Neon PostgreSQL
import { 
  getAllSubscribers as getJsonSubscribers,
  getSubscriberByEmail as getJsonSubscriberByEmail,
  addSubscriber as addJsonSubscriber,
  deleteSubscriber as deleteJsonSubscriber,
  getAllPosts as getJsonPosts,
  getPostById as getJsonPostById,
  addPost as addJsonPost,
  updatePost as updateJsonPost,
  deletePost as deleteJsonPost,
  getAnalytics as getJsonAnalytics
} from './database.js'

import {
  testConnection,
  initializeNeonDatabase,
  getAllSubscribersNeon,
  getSubscriberByEmailNeon,
  addSubscriberNeon,
  deleteSubscriberNeon,
  getAllPostsNeon,
  getPostByIdNeon,
  addPostNeon,
  updatePostNeon,
  deletePostNeon,
  getAnalyticsNeon
} from './neon.js'

// Check if we should use Neon database
const useNeonDatabase = process.env.USE_NEON_DATABASE === 'true' && process.env.DATABASE_URL

// Initialize database on startup
let isInitialized = false

async function initializeDatabase() {
  if (isInitialized) return
  
  if (useNeonDatabase) {
    try {
      console.log('🔄 Initializing Neon PostgreSQL database...')
      await testConnection()
      await initializeNeonDatabase()
      console.log('✅ Neon PostgreSQL database ready')
    } catch (error) {
      console.error('❌ Failed to initialize Neon database, falling back to JSON:', error)
      // Fall back to JSON database
    }
  } else {
    console.log('📁 Using JSON file database')
  }
  
  isInitialized = true
}

// Subscriber functions
export async function getAllSubscribers() {
  await initializeDatabase()
  
  if (useNeonDatabase) {
    try {
      return await getAllSubscribersNeon()
    } catch (error) {
      console.error('Neon error, falling back to JSON:', error)
      return getJsonSubscribers()
    }
  }
  
  return getJsonSubscribers()
}

export async function getSubscriberByEmail(email) {
  await initializeDatabase()
  
  if (useNeonDatabase) {
    try {
      return await getSubscriberByEmailNeon(email)
    } catch (error) {
      console.error('Neon error, falling back to JSON:', error)
      return getJsonSubscriberByEmail(email)
    }
  }
  
  return getJsonSubscriberByEmail(email)
}

export async function addSubscriber(subscriberData) {
  await initializeDatabase()
  
  if (useNeonDatabase) {
    try {
      return await addSubscriberNeon(subscriberData)
    } catch (error) {
      console.error('Neon error, falling back to JSON:', error)
      return addJsonSubscriber(subscriberData)
    }
  }
  
  return addJsonSubscriber(subscriberData)
}

export async function deleteSubscriber(email) {
  await initializeDatabase()
  
  if (useNeonDatabase) {
    try {
      return await deleteSubscriberNeon(email)
    } catch (error) {
      console.error('Neon error, falling back to JSON:', error)
      return deleteJsonSubscriber(email)
    }
  }
  
  return deleteJsonSubscriber(email)
}

// Post functions
export async function getAllPosts() {
  await initializeDatabase()
  
  if (useNeonDatabase) {
    try {
      return await getAllPostsNeon()
    } catch (error) {
      console.error('Neon error, falling back to JSON:', error)
      return getJsonPosts()
    }
  }
  
  return getJsonPosts()
}

export async function getPostById(id) {
  await initializeDatabase()
  
  if (useNeonDatabase) {
    try {
      return await getPostByIdNeon(id)
    } catch (error) {
      console.error('Neon error, falling back to JSON:', error)
      return getJsonPostById(id)
    }
  }
  
  return getJsonPostById(id)
}

export async function addPost(postData) {
  await initializeDatabase()
  
  if (useNeonDatabase) {
    try {
      return await addPostNeon(postData)
    } catch (error) {
      console.error('Neon error, falling back to JSON:', error)
      return addJsonPost(postData)
    }
  }
  
  return addJsonPost(postData)
}

export async function updatePost(id, updateData) {
  await initializeDatabase()
  
  if (useNeonDatabase) {
    try {
      const result = await updatePostNeon(id, updateData)
      return result !== null && result !== undefined
    } catch (error) {
      console.error('Neon error, falling back to JSON:', error)
      return updateJsonPost(id, updateData)
    }
  }
  
  return updateJsonPost(id, updateData)
}

export async function deletePost(id) {
  await initializeDatabase()
  
  if (useNeonDatabase) {
    try {
      return await deletePostNeon(id)
    } catch (error) {
      console.error('Neon error, falling back to JSON:', error)
      return deleteJsonPost(id)
    }
  }
  
  return deleteJsonPost(id)
}

// Analytics functions
export async function getAnalytics() {
  await initializeDatabase()
  
  if (useNeonDatabase) {
    try {
      return await getAnalyticsNeon()
    } catch (error) {
      console.error('Neon error, falling back to JSON:', error)
      return getJsonAnalytics()
    }
  }
  
  return getJsonAnalytics()
}

// Database status
export async function getDatabaseStatus() {
  await initializeDatabase()
  
  return {
    type: useNeonDatabase ? 'PostgreSQL (Neon)' : 'JSON File',
    connected: useNeonDatabase ? await testConnection() : true,
    environment: process.env.NODE_ENV || 'development'
  }
}