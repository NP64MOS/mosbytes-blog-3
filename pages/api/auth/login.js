import { authenticateAdmin, generateToken } from '../../../lib/auth'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' })
  }

  const user = authenticateAdmin(email, password)
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = generateToken({ id: user.id, email: user.email, role: user.role })

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  })
}