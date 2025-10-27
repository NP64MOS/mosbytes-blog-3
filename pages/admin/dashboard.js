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
      <Layout title="Admin Dashboard – MOSBytes">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 loading-spinner mx-auto"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Admin Dashboard – MOSBytes">
      <div className="min-h-screen paper-bg">
        <div className="container-clean py-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-12 space-y-6 lg:space-y-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <h1 className="text-section-title text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-body text-text-secondary">
                Welcome back, {user?.email}
              </p>
            </motion.div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => router.push('/admin/posts')}
                className="btn-primary text-sm px-4 py-2"
              >
                Manage Posts
              </button>
              <button
                onClick={() => router.push('/admin/subscribers')}
                className="btn-secondary text-sm px-4 py-2"
              >
                View Subscribers
              </button>
              <button
                onClick={() => router.push('/admin/database')}
                className="bg-steel-gray hover:bg-steel-light text-cloud-white px-4 py-2 rounded-xl transition-colors text-sm"
              >
                Database
              </button>
              <button
                onClick={() => router.push('/admin/unsubscribed')}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 px-4 py-2 rounded-xl transition-colors text-sm"
              >
                Unsubscribed Users
              </button>
              <button
                onClick={handleLogout}
                className="bg-graphite hover:bg-graphite-light text-cloud-white px-4 py-2 rounded-xl transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              className="card-glass hover-glow p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-sm font-medium text-text-muted mb-2">Total Subscribers</h3>
              <p className="text-3xl font-bold text-frost-blue">{stats?.totalSubscribers || 0}</p>
            </motion.div>

            <motion.div
              className="card-glass hover-glow p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-sm font-medium text-text-muted mb-2">Monthly Revenue</h3>
              <p className="text-3xl font-bold text-frost-blue">${stats?.monthlyRevenue?.toFixed(2) || '0.00'}</p>
            </motion.div>

            <motion.div
              className="card-glass hover-glow p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-sm font-medium text-text-muted mb-2">Total Posts</h3>
              <p className="text-3xl font-bold text-frost-blue">{stats?.totalPosts || 0}</p>
            </motion.div>

            <motion.div
              className="card-glass hover-glow p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-sm font-medium text-text-muted mb-2">Growth Rate</h3>
              <p className="text-3xl font-bold text-frost-blue">{stats?.growthRate || 0}%</p>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Subscribers */}
            <motion.div
              className="card-glass hover-lift p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-card-title text-cloud-white mb-6">
                Recent Subscribers
              </h3>
              <div className="space-y-4">
                {stats?.recentSubscribers?.map((subscriber, index) => (
                  <div key={subscriber.id} className="flex justify-between items-center py-3 border-b border-graphite/20 last:border-b-0">
                    <div>
                      <p className="font-medium text-cloud-white">{subscriber.email}</p>
                      <p className="text-sm text-text-muted">{subscriber.plan} plan</p>
                    </div>
                    <span className="text-xs text-text-muted">
                      {new Date(subscriber.subscribedAt).toLocaleDateString()}
                    </span>
                  </div>
                )) || <p className="text-text-secondary">No subscribers yet</p>}
              </div>
            </motion.div>

            {/* Recent Posts */}
            <motion.div
              className="card-glass hover-lift p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-card-title text-cloud-white mb-6">
                Recent Posts
              </h3>
              <div className="space-y-4">
                {stats?.recentPosts?.map((post, index) => (
                  <div key={post.id} className="py-3 border-b border-graphite/20 last:border-b-0">
                    <p className="font-medium text-cloud-white">{post.title}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs bg-frost-blue/20 text-frost-blue px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-text-muted">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )) || <p className="text-text-secondary">No posts yet</p>}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
}