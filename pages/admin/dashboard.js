import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const userData = localStorage.getItem('adminUser')
    
    if (!token || !userData) {
      router.push('/admin/login')
      return
    }

    setUser(JSON.parse(userData))
    fetchStats(token)
  }, [router])

  const fetchStats = async (token) => {
    try {
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      } else {
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <Layout title="Admin Dashboard - MOSBytes">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Admin Dashboard - MOSBytes">
      <div className="min-h-screen bg-gradient-to-br from-light to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold text-primary dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Welcome back, {user?.email}
              </p>
            </motion.div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => router.push('/admin/posts')}
                className="bg-gradient-to-r from-neon to-neon-purple text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Manage Posts
              </button>
              <button
                onClick={() => router.push('/admin/subscribers')}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                View Subscribers
              </button>
              <button
                onClick={() => router.push('/admin/database')}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Database
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Subscribers</h3>
              <p className="text-3xl font-bold text-neon">{stats?.totalSubscribers || 0}</p>
            </motion.div>

            <motion.div
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Revenue</h3>
              <p className="text-3xl font-bold text-neon">${stats?.monthlyRevenue?.toFixed(2) || '0.00'}</p>
            </motion.div>

            <motion.div
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Posts</h3>
              <p className="text-3xl font-bold text-neon">{stats?.totalPosts || 0}</p>
            </motion.div>

            <motion.div
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Growth Rate</h3>
              <p className="text-3xl font-bold text-neon">{stats?.growthRate || 0}%</p>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Subscribers */}
            <motion.div
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-primary dark:text-white mb-4">
                Recent Subscribers
              </h3>
              <div className="space-y-3">
                {stats?.recentSubscribers?.map((subscriber, index) => (
                  <div key={subscriber.id} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{subscriber.email}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{subscriber.plan} plan</p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(subscriber.subscribedAt).toLocaleDateString()}
                    </span>
                  </div>
                )) || <p className="text-gray-500 dark:text-gray-400">No subscribers yet</p>}
              </div>
            </motion.div>

            {/* Recent Posts */}
            <motion.div
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-primary dark:text-white mb-4">
                Recent Posts
              </h3>
              <div className="space-y-3">
                {stats?.recentPosts?.map((post, index) => (
                  <div key={post.id} className="py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <p className="font-medium text-gray-900 dark:text-white">{post.title}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )) || <p className="text-gray-500 dark:text-gray-400">No posts yet</p>}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
}