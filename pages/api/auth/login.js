import { authenticateAdmin, generateToken } from '../../../lib/auth'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { username, email, password } = req.body
  const loginField = username || email

  if (!loginField || !password) {
    return res.status(400).json({ message: 'Username/email and password required' })
  }

  const user = authenticateAdmin(loginField, password)
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = generateToken({ id: user.id, username: user.username, role: user.role })

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role
    }
  })
}