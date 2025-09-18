// Database functions - only available on server side
let dbFunctions = null

if (typeof window === 'undefined') {
  // Server-side only
  try {
    dbFunctions = require('./database.js')
  } catch (error) {
    console.error('Database not available:', error)
  }
}

export const SUBSCRIPTION_PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Access to basic tutorials',
      'Community support',
      '5 AI tool recommendations',
      'Weekly newsletter',
      'Basic AI learning resources',
      'Access to blog posts'
    ]
  }
}

export function addSubscriber(email, name = '') {
  if (dbFunctions) {
    return dbFunctions.addSubscriber({ email, name, plan: 'free' })
  }
  return { success: false, message: 'Database not available' }
}

export function getSubscriber(email) {
  if (dbFunctions) {
    return dbFunctions.getSubscriberByEmail(email)
  }
  return null
}

export function getAllSubscribers() {
  if (dbFunctions) {
    return dbFunctions.getAllSubscribers()
  }
  return []
}

export function updateSubscription(email, planId) {
  const plan = SUBSCRIPTION_PLANS[planId.toUpperCase()]
  if (!plan) {
    return { success: false, message: 'Invalid plan' }
  }

  if (dbFunctions) {
    const success = dbFunctions.updateSubscriber(email, { 
      plan: planId, 
      updatedAt: new Date().toISOString() 
    })

    if (success) {
      const subscriber = dbFunctions.getSubscriberByEmail(email)
      return { success: true, subscriber }
    }
  }

  return { success: false, message: 'Failed to update subscription' }
}

export function getSubscriptionStats() {
  if (!dbFunctions) {
    return {
      totalSubscribers: 0,
      planCounts: {},
      monthlyRevenue: 0,
      growthRate: 0
    }
  }

  const analytics = dbFunctions.getAnalytics()
  if (!analytics) {
    return {
      totalSubscribers: 0,
      planCounts: {},
      monthlyRevenue: 0,
      growthRate: 0
    }
  }

  const subscribers = dbFunctions.getAllSubscribers()
  const planCounts = subscribers.reduce((acc, sub) => {
    acc[sub.plan] = (acc[sub.plan] || 0) + 1
    return acc
  }, {})

  const revenue = subscribers.reduce((total, sub) => {
    const plan = SUBSCRIPTION_PLANS[sub.plan.toUpperCase()]
    return total + (plan ? plan.price : 0)
  }, 0)

  return {
    totalSubscribers: analytics.totalSubscribers,
    planCounts,
    monthlyRevenue: revenue,
    growthRate: analytics.monthlyGrowth || 0,
    recentSubscribers: analytics.recentSubscribers || [],
    totalPosts: analytics.totalPosts || 0
  }
}