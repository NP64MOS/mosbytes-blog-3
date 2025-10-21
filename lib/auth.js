// Simple authentication system for demo purposes
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || process.env.ADMIN_EMAIL || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export function generateToken(payload) {
  // Simple token generation for demo
  return btoa(JSON.stringify({ ...payload, timestamp: Date.now() }))
}

export function verifyToken(token) {
  try {
    const decoded = JSON.parse(atob(token))
    // Check if token is less than 24 hours old
    const isValid = (Date.now() - decoded.timestamp) < (24 * 60 * 60 * 1000)
    return isValid ? decoded : null
  } catch (error) {
    return null
  }
}

export function authenticateAdmin(username, password) {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return {
      id: 'admin',
      username: ADMIN_USERNAME,
      role: 'admin'
    }
  }
  return null
}

export function isAdmin(user) {
  return user && user.role === 'admin'
}