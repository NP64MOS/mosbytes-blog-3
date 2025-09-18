import { getAllSubscribers } from '../../../lib/subscription'
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

  const subscribers = getAllSubscribers()
  
  res.status(200).json({
    success: true,
    subscribers,
    total: subscribers.length
  })
}