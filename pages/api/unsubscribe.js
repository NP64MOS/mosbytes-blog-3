import { updateSubscriber, getSubscriberByEmail } from '../../lib/database'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, reason } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  try {
    // Check if subscriber exists
    const subscriber = getSubscriberByEmail(email)
    
    if (!subscriber) {
      return res.status(404).json({ message: 'Email not found in our system' })
    }

    if (subscriber.status === 'unsubscribed') {
      return res.status(400).json({ message: 'Email is already unsubscribed' })
    }

    // Update subscriber status to unsubscribed
    const updateData = {
      status: 'unsubscribed',
      unsubscribedAt: new Date().toISOString(),
      unsubscribeReason: reason || 'No reason provided',
      preferences: {
        ...subscriber.preferences,
        newsletter: false,
        notifications: false
      }
    }

    const success = updateSubscriber(email, updateData)

    if (success) {
      return res.status(200).json({
        success: true,
        message: 'Successfully unsubscribed. We\'re sorry to see you go!'
      })
    } else {
      return res.status(500).json({ message: 'Failed to unsubscribe. Please try again.' })
    }

  } catch (error) {
    console.error('Unsubscribe error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}