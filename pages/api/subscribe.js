import { addSubscriber } from '../../lib/db-adapter'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, name, plan } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  try {
    // Add subscriber
    const result = await addSubscriber({ email, name, plan })
    
    if (!result.success) {
      return res.status(400).json({ message: result.message })
    }

    res.status(200).json({
      success: true,
      message: 'Successfully subscribed!',
      subscriber: result.subscriber
    })
  } catch (error) {
    console.error('Subscribe API error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Failed to subscribe', 
      error: error.message 
    })
  }
}