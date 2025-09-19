import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { motion } from 'framer-motion'

export default function UnsubscribedUsers() {
  const [unsubscribedUsers, setUnsubscribedUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchUnsubscribedUsers()
  }, [])

  const fetchUnsubscribedUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        router.push('/admin')
        return
      }

      const response = await fetch('/api/admin/subscribers', {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        const data = await response.json()
        const unsubscribed = data.subscribers.filter(sub => sub.status === 'unsubscribed')
        setUnsubscribedUsers(unsubscribed)
      } else {
        setMessage('Failed to fetch unsubscribed users')
      }
    } catch (error) {
      console.error('Error fetching unsubscribed users:', error)
      setMessage('Error loading data')
    } finally {
      setLoading(false)
    }
  }

  const handleResubscribe = async (email) => {
    try {
      const response = await fetch('/api/resubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage(`Successfully resubscribed ${email}`)
        fetchUnsubscribedUsers() // Refresh the list
      } else {
        setMessage(data.message || 'Failed to resubscribe user')
      }
    } catch (error) {
      console.error('Resubscribe error:', error)
      setMessage('Error resubscribing user')
    }
  }

  const getUnsubscribeReasons = () => {
    const reasons = {}
    unsubscribedUsers.forEach(user => {
      const reason = user.unsubscribeReason || 'No reason provided'
      reasons[reason] = (reasons[reason] || 0) + 1
    })
    return reasons
  }

  if (loading) {
    return (
      <Layout title="Unsubscribed Users - Admin">
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon"></div>
        </div>
      </Layout>
    )
  }

  const reasons = getUnsubscribeReasons()

  return (
    <Layout title="Unsubscribed Users - Admin">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              Unsubscribed Users Management
            </h1>
            <p className="text-gray-300">
              View and manage users who have unsubscribed from MOSBytes
            </p>
          </motion.div>

          {message && (
            <motion.div
              className="mb-6 p-4 rounded-lg bg-blue-900/30 text-blue-300 border border-blue-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {message}
            </motion.div>
          )}

          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                Total Unsubscribed
              </h3>
              <p className="text-3xl font-bold text-red-400">
                {unsubscribedUsers.length}
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                This Month
              </h3>
              <p className="text-3xl font-bold text-orange-400">
                {unsubscribedUsers.filter(user => {
                  const unsubDate = new Date(user.unsubscribedAt)
                  const now = new Date()
                  return unsubDate.getMonth() === now.getMonth() && 
                         unsubDate.getFullYear() === now.getFullYear()
                }).length}
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                Top Reason
              </h3>
              <p className="text-sm text-gray-300">
                {Object.keys(reasons).length > 0 
                  ? Object.entries(reasons).sort(([,a], [,b]) => b - a)[0][0]
                  : 'No data'
                }
              </p>
            </motion.div>
          </div>

          {/* Unsubscribe Reasons Chart */}
          {Object.keys(reasons).length > 0 && (
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Unsubscribe Reasons
              </h3>
              <div className="space-y-3">
                {Object.entries(reasons)
                  .sort(([,a], [,b]) => b - a)
                  .map(([reason, count]) => (
                    <div key={reason} className="flex items-center justify-between">
                      <span className="text-gray-300">{reason}</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-700 rounded-full h-2 mr-3">
                          <div 
                            className="bg-neon h-2 rounded-full" 
                            style={{ width: `${(count / unsubscribedUsers.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-medium w-8 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* Unsubscribed Users List */}
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">
                Unsubscribed Users ({unsubscribedUsers.length})
              </h3>
            </div>

            {unsubscribedUsers.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-400">No unsubscribed users found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Unsubscribed Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Reason
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {unsubscribedUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-800/30">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-white">
                              {user.name || 'No name'}
                            </div>
                            <div className="text-sm text-gray-400">
                              {user.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {user.unsubscribedAt 
                            ? new Date(user.unsubscribedAt).toLocaleDateString()
                            : 'Unknown'
                          }
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          <div className="max-w-xs truncate">
                            {user.unsubscribeReason || 'No reason provided'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleResubscribe(user.email)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition-colors"
                          >
                            Resubscribe
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="mt-8 text-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button
              onClick={() => router.push('/admin/subscribers')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              View Active Subscribers
            </button>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Back to Admin Dashboard
            </button>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}