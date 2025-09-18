import { addSubscriber, updateSubscription } from '../../lib/subscription'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, name, plan } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  // Add subscriber
  const result = addSubscriber(email, name)
  
  if (!result.success) {
    return res.status(400).json({ message: result.message })
  }

  // If plan is specified and not free, update subscription
  if (plan && plan !== 'free') {
    const subscriptionResult = updateSubscription(email, plan)
    if (!subscriptionResult.success) {
      return res.status(400).json({ message: subscriptionResult.message })
    }
  }

  res.status(200).json({
    success: true,
    message: 'Successfully subscribed!',
    subscriber: result.subscriber
  })
}