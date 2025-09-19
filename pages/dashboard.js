import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import { SUBSCRIPTION_PLANS } from '../lib/subscription'

export default function Dashboard() {
  const [subscriber, setSubscriber] = useState(null)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setMessage('')

    try {
      // Try to fetch subscriber data using the lookup API
      const response = await fetch('/api/subscriber/lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (data.success && data.subscriber) {
        setSubscriber(data.subscriber)
        localStorage.setItem('subscriberEmail', email)
      } else {
        // Create new subscriber if not found
        const createResponse = await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            plan: 'free'
          })
        })

        const createData = await createResponse.json()

        if (createData.success) {
          // Fetch the newly created subscriber
          const newResponse = await fetch('/api/subscriber/lookup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
          })

          const newData = await newResponse.json()
          if (newData.success) {
            setSubscriber(newData.subscriber)
            localStorage.setItem('subscriberEmail', email)
          } else {
            setMessage('Account created but unable to load dashboard. Please try again.')
          }
        } else {
          setMessage('Unable to create account. Please try again.')
        }
      }
    } catch (error) {
      console.error('Dashboard login error:', error)
      setMessage('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const savedEmail = localStorage.getItem('subscriberEmail')
    if (savedEmail) {
      setEmail(savedEmail)
      // Auto-login with saved email by fetching actual data
      fetchSubscriberData(savedEmail)
    }
  }, [])

  const fetchSubscriberData = async (emailToFind) => {
    try {
      const response = await fetch('/api/subscriber/lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailToFind })
      })

      const data = await response.json()
      if (data.success && data.subscriber) {
        setSubscriber(data.subscriber)
      }
    } catch (error) {
      console.error('Error fetching subscriber data:', error)
    }
  }

  const handleLogout = () => {
    setSubscriber(null)
    setEmail('')
    localStorage.removeItem('subscriberEmail')
  }

  const currentPlan = subscriber ? SUBSCRIPTION_PLANS[subscriber.plan.toUpperCase()] : null

  if (!subscriber) {
    return (
      <Layout title="Subscriber Dashboard - MOSBytes">
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4">
          <motion.div
            className="max-w-md w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white text-center mb-6">
                Access Your Dashboard
              </h2>
              
              {message && (
                <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
                  {message}
                </div>
              )}
              
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon bg-gray-700 text-white"
                    placeholder="Enter your email"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-neon to-neon-purple text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? 'Accessing...' : 'Access Dashboard'}
                </button>
              </form>
              
              <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800">
                <h4 className="text-sm font-medium text-blue-200 mb-2">
                  Try these demo accounts:
                </h4>
                <div className="text-xs text-blue-300 space-y-1">
                  <div>• john.doe@example.com (12 tutorials, 15-day streak)</div>
                  <div>• alice.johnson@example.com (20 tutorials, 25-day streak)</div>
                  <div>• jane.smith@example.com (8 tutorials, 7-day streak)</div>
                  <div className="mt-2 text-blue-400">
                    Or enter any email to create a new account
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Dashboard - MOSBytes">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold text-primary dark:text-white">
                Welcome back, {subscriber.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage your AI learning journey
              </p>
            </motion.div>
            
            <button
              onClick={handleLogout}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Current Plan */}
          <motion.div
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-primary dark:text-white mb-2">
                  Current Plan: {currentPlan?.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Subscribed since {new Date(subscriber.subscribedAt).toLocaleDateString()}
                </p>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-neon">
                    ${currentPlan?.price || 0}
                  </span>
                  {currentPlan?.price > 0 && (
                    <span className="text-gray-500 dark:text-gray-400 ml-1">/month</span>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  subscriber.status === 'active' 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                }`}>
                  {subscriber.status}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Subscription Management */}
          <motion.div
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="text-xl font-semibold text-primary dark:text-white mb-4">
              Subscription Management
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Email Preferences */}
              <div>
                <h3 className="text-lg font-medium text-primary dark:text-white mb-3">
                  Email Preferences
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={subscriber.preferences?.newsletter}
                      onChange={(e) => {
                        // Update preferences logic here
                        console.log('Newsletter preference:', e.target.checked)
                      }}
                      className="w-4 h-4 text-neon bg-gray-100 border-gray-300 rounded focus:ring-neon dark:focus:ring-neon dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Newsletter & Updates
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={subscriber.preferences?.notifications}
                      onChange={(e) => {
                        // Update preferences logic here
                        console.log('Notifications preference:', e.target.checked)
                      }}
                      className="w-4 h-4 text-neon bg-gray-100 border-gray-300 rounded focus:ring-neon dark:focus:ring-neon dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Course Notifications
                    </span>
                  </label>
                </div>
              </div>

              {/* Unsubscribe Section */}
              <div>
                <h3 className="text-lg font-medium text-primary dark:text-white mb-3">
                  Account Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => window.open(`/unsubscribe?email=${encodeURIComponent(subscriber.email)}`, '_blank')}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors border border-red-200 dark:border-red-800"
                  >
                    Unsubscribe from all emails
                  </button>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    You can always resubscribe later by visiting our homepage.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <motion.div
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-primary dark:text-white mb-3">
                Learning Progress
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Tutorials Completed</span>
                  <span className="font-semibold text-neon">{subscriber.tutorialsCompleted || 0}/25</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-neon to-neon-purple h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(((subscriber.tutorialsCompleted || 0) / 25) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-primary dark:text-white mb-3">
                AI Tools Used
              </h3>
              <div className="text-3xl font-bold text-neon mb-2">{subscriber.aiToolsUsed || 0}</div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Different AI tools explored
              </p>
            </motion.div>

            <motion.div
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-primary dark:text-white mb-3">
                Learning Streak
              </h3>
              <div className="text-3xl font-bold text-neon mb-2">{subscriber.learningStreak || 0} days</div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {(subscriber.learningStreak || 0) > 0 ? 'Keep it up! 🔥' : 'Start your streak today! 💪'}
              </p>
            </motion.div>
          </div>

          {/* Additional Stats */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-primary dark:text-white mb-3">
                Account Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Member Since:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {new Date(subscriber.joinedDate || subscriber.subscribedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Last Active:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {new Date(subscriber.lastActive || subscriber.subscribedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Status:</span>
                  <span className={`font-medium ${
                    subscriber.status === 'active' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {subscriber.status || 'Active'}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-primary dark:text-white mb-3">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Continue Learning</span>
                </button>
                <button className="w-full text-left px-4 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Browse AI Tools</span>
                </button>
                <button className="w-full text-left px-4 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Join Community</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Plan Features */}
          <motion.div
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-primary dark:text-white mb-4">
              Your Plan Features
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {currentPlan?.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-neon mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}