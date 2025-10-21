import { getDatabaseStatus, testConnection } from '../../lib/neon'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // Test the database connection
    const isConnected = await testConnection()
    
    res.status(200).json({
      success: true,
      message: 'Database test completed',
      database: {
        type: 'Neon PostgreSQL',
        connected: isConnected,
        url: process.env.DATABASE_URL ? 'Configured' : 'Not configured',
        environment: process.env.NODE_ENV || 'development'
      }
    })
  } catch (error) {
    console.error('Database test error:', error)
    res.status(500).json({
      success: false,
      message: 'Database test failed',
      error: error.message
    })
  }
}