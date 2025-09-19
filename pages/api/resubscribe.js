import { updateSubscriber, getSubscriberByEmail } from '../../lib/database'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  try {
    // Check if subscriber exists
    const subscriber = getSubscriberByEmail(email)
    
    if (!subscriber) {
      return res.status(404).json({ message: 'Email not found in our system' })
    }

    if (subscriber.status === 'active') {
      return res.status(400).json({ message: 'Email is already subscribed' })
    }

    // Reactivate subscriber
    const updateData = {
      status: 'active',
      resubscribedAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      preferences: {
        ...subscriber.preferences,
        newsletter: true,
        notifications: true
      }
    }

    // Remove unsubscribe data
    delete updateData.unsubscribedAt
    delete updateData.unsubscribeReason

    const success = updateSubscriber(email, updateData)

    if (success) {
      return res.status(200).json({
        success: true,
        message: 'Welcome back! You have been resubscribed successfully.',
        subscriber: { ...subscriber, ...updateData }
      })
    } else {
      return res.status(500).json({ message: 'Failed to resubscribe. Please try again.' })
    }

  } catch (error) {
    console.error('Resubscribe error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}