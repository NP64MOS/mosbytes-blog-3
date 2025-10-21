import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { motion } from 'framer-motion'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [blocked, setBlocked] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already blocked
    const blockedUntil = localStorage.getItem('adminBlocked')
    if (blockedUntil && new Date() < new Date(blockedUntil)) {
      setBlocked(true)
      setError('Access temporarily blocked due to multiple failed attempts. Please try again later.')
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    if (blocked) return

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password
        }),
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('adminToken', data.token)
        localStorage.setItem('adminUser', JSON.stringify(data.user))
        localStorage.removeItem('adminBlocked') // Clear any blocks on successful login
        router.push('/admin/dashboard')
      } else {
        const newAttempts = attempts + 1
        setAttempts(newAttempts)
        
        if (newAttempts >= 5) {
          setBlocked(true)
          const blockUntil = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
          localStorage.setItem('adminBlocked', blockUntil.toISOString())
          setError('Too many failed attempts. Access blocked for 15 minutes.')
        } else {
          setError(data.message || `Invalid credentials. ${5 - newAttempts} attempts remaining.`)
        }
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout title="Admin Login – MOSBytes">
      <div className="min-h-screen bg-deep-navy flex items-center justify-center py-12">
        <div className="container-narrow">
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <div className="space-y-4">
              <div className="w-16 h-16 bg-frost-blue/20 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-frost-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              
              <h1 className="text-section-title text-cloud-white">
                Administrator Login
              </h1>
              
              <p className="text-body-large text-text-secondary max-w-2xl mx-auto">
                Enter your administrator credentials to access the dashboard.
              </p>
            </div>

            {/* Login Form */}
            {blocked ? (
              <div className="card-glass max-w-md mx-auto">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-cloud-white">Access Temporarily Blocked</h3>
                  <p className="text-text-secondary">Too many failed attempts. Please wait 15 minutes.</p>
                  <button
                    onClick={() => router.push('/')}
                    className="btn-secondary w-full"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            ) : (
              <div className="card-glass max-w-md mx-auto">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-cloud-white mb-3">
                      Username
                    </label>
                    <input
                      type="text"
                      required
                      value={credentials.username}
                      onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                      className="input-modern"
                      placeholder="Enter username"
                      autoComplete="username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-cloud-white mb-3">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      className="input-modern"
                      placeholder="Enter password"
                      autoComplete="current-password"
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-2xl text-sm bg-red-500/20 text-red-300 border border-red-500/30"
                    >
                      {error}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 loading-spinner"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </form>
              </div>
            )}

            <button
              onClick={() => router.push('/')}
              className="btn-ghost"
            >
              Back to Home
            </button>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}