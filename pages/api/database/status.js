import { readDatabase, getAnalytics } from '../../../lib/database'
import { verifyToken, isAdmin } from '../../../lib/auth'

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Verify admin authentication
  const token = req.headers.authorization?.replace('Bearer ', '')
  const user = verifyToken(token)
  
  if (!user || !isAdmin(user)) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const db = readDatabase()
  const analytics = getAnalytics()
  
  if (db && analytics) {
    res.status(200).json({
      success: true,
      status: 'healthy',
      database: {
        subscribers: db.subscribers.length,
        posts: db.posts.length,
        lastUpdated: new Date().toISOString()
      },
      analytics: {
        totalViews: analytics.totalViews,
        totalSubscribers: analytics.totalSubscribers,
        totalPosts: analytics.totalPosts,
        monthlyGrowth: analytics.monthlyGrowth
      }
    })
  } else {
    res.status(500).json({
      success: false,
      status: 'error',
      message: 'Database connection failed'
    })
  }
}