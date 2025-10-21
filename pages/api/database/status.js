import { getDatabaseStatus, getAnalytics, getAllSubscribers, getAllPosts } from '../../../lib/db-adapter'
import { verifyToken, isAdmin } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Verify admin authentication
  const token = req.headers.authorization?.replace('Bearer ', '')
  const user = verifyToken(token)
  
  if (!user || !isAdmin(user)) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const [dbStatus, analytics, subscribers, posts] = await Promise.all([
      getDatabaseStatus(),
      getAnalytics(),
      getAllSubscribers(),
      getAllPosts()
    ])
    
    res.status(200).json({
      success: true,
      status: dbStatus.connected ? 'healthy' : 'error',
      database: {
        type: dbStatus.type,
        environment: dbStatus.environment,
        connected: dbStatus.connected,
        subscribers: subscribers.length,
        posts: posts.length,
        lastUpdated: new Date().toISOString()
      },
      analytics: analytics || {
        totalViews: 0,
        totalSubscribers: subscribers.length,
        totalPosts: posts.length,
        monthlyGrowth: 0
      }
    })
  } catch (error) {
    console.error('Database status error:', error)
    res.status(500).json({
      success: false,
      status: 'error',
      message: 'Database connection failed',
      error: error.message
    })
  }
}