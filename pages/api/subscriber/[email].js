import { getSubscriber } from '../../../lib/subscription'

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email } = req.query

  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  const subscriber = getSubscriber(email)
  
  if (!subscriber) {
    return res.status(404).json({ message: 'Subscriber not found' })
  }

  res.status(200).json({
    success: true,
    subscriber
  })
}