import { getSubscriptionStats, getAllSubscribers } from '../../../lib/subscription'
import { getAllPosts } from '../../../lib/blog'
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

  const subscriptionStats = getSubscriptionStats()
  const subscribers = getAllSubscribers()
  const posts = getAllPosts()

  const stats = {
    ...subscriptionStats,
    totalPosts: posts.length,
    recentSubscribers: subscribers.slice(-5).reverse(),
    recentPosts: posts.slice(0, 5)
  }

  res.status(200).json(stats)
}