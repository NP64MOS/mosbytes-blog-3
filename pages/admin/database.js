import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { motion } from 'framer-motion'

export default function DatabaseViewer() {
  const [data, setData] = useState({
    subscribers: [],
    posts: [],
    stats: null
  })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('subscribers')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }
    fetchAllData(token)
  }, [router])

  const fetchAllData = async (token) => {
    try {
      // Fetch subscribers
      const subscribersResponse = await fetch('/api/admin/subscribers', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const subscribersData = subscribersResponse.ok ? await subscribersResponse.json() : { subscribers: [] }

      // Fetch posts
      const postsResponse = await fetch('/api/posts')
      const postsData = postsResponse.ok ? await postsResponse.json() : []

      // Fetch stats
      const statsResponse = await fetch('/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const statsData = statsResponse.ok ? await statsResponse.json() : null

      setData({
        subscribers: subscribersData.subscribers || [],
        posts: postsData || [],
        stats: statsData
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout title="Database Viewer - MOSBytes">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Database Viewer - MOSBytes">
      <div className="min-h-screen bg-gradient-to-br from-light to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary dark:text-white">Database Viewer</h1>
              <p className="text-gray-600 dark:text-gray-300">View all system data for debugging</p>
            </div>
            
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Back to Dashboard
            </button>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'subscribers', name: 'Subscribers', count: data.subscribers.length },
                  { id: 'posts', name: 'Posts', count: data.posts.length },
                  { id: 'stats', name: 'Statistics', count: null }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-neon text-neon'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab.name} {tab.count !== null && `(${tab.count})`}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'subscribers' && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-primary dark:text-white mb-4">
                  Subscribers Data
                </h3>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-auto text-sm">
                  {JSON.stringify(data.subscribers, null, 2)}
                </pre>
              </div>
            )}

            {activeTab === 'posts' && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-primary dark:text-white mb-4">
                  Posts Data
                </h3>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-auto text-sm">
                  {JSON.stringify(data.posts, null, 2)}
                </pre>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-primary dark:text-white mb-4">
                  Statistics Data
                </h3>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-auto text-sm">
                  {JSON.stringify(data.stats, null, 2)}
                </pre>
              </div>
            )}
          </motion.div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={() => {
                const jsonData = JSON.stringify(data, null, 2)
                const blob = new Blob([jsonData], { type: 'application/json' })
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `mosbytes-database-${new Date().toISOString().split('T')[0]}.json`
                a.click()
                window.URL.revokeObjectURL(url)
              }}
              className="bg-gradient-to-r from-neon to-neon-purple text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Export All Data
            </button>
            
            <button
              onClick={() => fetchAllData(localStorage.getItem('adminToken'))}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Refresh Data
            </button>
            
            <button
              onClick={async () => {
                const token = localStorage.getItem('adminToken')
                try {
                  const response = await fetch('/api/database/backup', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` }
                  })
                  const result = await response.json()
                  if (result.success) {
                    alert('Database backup created successfully!')
                  } else {
                    alert('Failed to create backup: ' + result.message)
                  }
                } catch (error) {
                  alert('Error creating backup: ' + error.message)
                }
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Create Backup
            </button>
            
            <button
              onClick={() => {
                console.log('Database Data:', data)
                alert('Data logged to console. Check browser developer tools.')
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Log to Console
            </button>
          </div>

          {/* Database Status */}
          <div className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-primary dark:text-white mb-4">
              Database Status
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Status:</span>
                <span className="ml-2 text-green-600 dark:text-green-400 font-medium">Healthy</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Type:</span>
                <span className="ml-2 text-gray-900 dark:text-white font-medium">JSON File</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Location:</span>
                <span className="ml-2 text-gray-900 dark:text-white font-medium">./data/database.json</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Last Updated:</span>
                <span className="ml-2 text-gray-900 dark:text-white font-medium">{new Date().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}