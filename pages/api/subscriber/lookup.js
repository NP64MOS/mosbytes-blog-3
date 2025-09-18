import { getSubscriber } from '../../../lib/subscription'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  try {
    const subscriber = getSubscriber(email)
    
    if (subscriber) {
      // Return subscriber data (excluding sensitive info if needed)
      res.status(200).json({
        success: true,
        subscriber: {
          id: subscriber.id,
          email: subscriber.email,
          name: subscriber.name,
          plan: subscriber.plan,
          status: subscriber.status,
          subscribedAt: subscriber.subscribedAt,
          tutorialsCompleted: subscriber.tutorialsCompleted || 0,
          aiToolsUsed: subscriber.aiToolsUsed || 0,
          learningStreak: subscriber.learningStreak || 0,
          joinedDate: subscriber.joinedDate || subscriber.subscribedAt,
          lastActive: subscriber.lastActive || subscriber.subscribedAt,
          preferences: subscriber.preferences || {},
          progress: subscriber.progress || {}
        }
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      })
    }
  } catch (error) {
    console.error('Error looking up subscriber:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}