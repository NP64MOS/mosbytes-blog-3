import { getAllSubscribers, getAllPosts, getAnalytics } from '../../../lib/db-adapter'
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
    const [subscribers, posts, analytics] = await Promise.all([
      getAllSubscribers(),
      getAllPosts(),
      getAnalytics()
    ])

    const activeSubscribers = subscribers.filter(sub => sub.status === 'active')
    
    const stats = {
      totalSubscribers: subscribers.length,
      activeSubscribers: activeSubscribers.length,
      totalPosts: posts.length,
      totalViews: analytics?.totalViews || 0,
      monthlyGrowth: analytics?.monthlyGrowth || 0,
      recentSubscribers: subscribers.slice(-5).reverse(),
      recentPosts: posts.slice(0, 5),
      subscriptionStats: {
        free: activeSubscribers.filter(sub => sub.plan === 'free').length,
        premium: activeSubscribers.filter(sub => sub.plan === 'premium').length
      }
    }

    res.status(200).json(stats)
  } catch (error) {
    console.error('Stats API error:', error)
    res.status(500).json({ message: 'Failed to fetch stats', error: error.message })
  }
}