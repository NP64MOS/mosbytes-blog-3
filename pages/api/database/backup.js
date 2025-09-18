import { backupDatabase } from '../../../lib/database'
import { verifyToken, isAdmin } from '../../../lib/auth'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Verify admin authentication
  const token = req.headers.authorization?.replace('Bearer ', '')
  const user = verifyToken(token)
  
  if (!user || !isAdmin(user)) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const backupPath = backupDatabase()
  
  if (backupPath) {
    res.status(200).json({
      success: true,
      message: 'Database backup created successfully',
      backupPath
    })
  } else {
    res.status(500).json({
      success: false,
      message: 'Failed to create database backup'
    })
  }
}