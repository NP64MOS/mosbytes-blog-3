import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { motion } from 'framer-motion'

export default function SecureAdminAccess() {
  const [credentials, setCredentials] = useState({ email: '', password: '', accessCode: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1) // 1: access code, 2: credentials
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

  const handleAccessCode = (e) => {
    e.preventDefault()
    if (blocked) return

    // Simple access code check (in production, this should be more secure)
    if (credentials.accessCode === 'MOS2025SECURE') {
      setStep(2)
      setError('')
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      
      if (newAttempts >= 3) {
        setBlocked(true)
        const blockUntil = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
        localStorage.setItem('adminBlocked', blockUntil.toISOString())
        setError('Too many failed attempts. Access blocked for 15 minutes.')
      } else {
        setError(`Invalid access code. ${3 - newAttempts} attempts remaining.`)
      }
    }
  }

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
          email: credentials.email,
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
        setError(data.message || 'Invalid credentials')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (blocked) {
    return (
      <Layout title="Access Blocked – MOSBytes Admin">
        <div className="min-h-screen bg-deep-navy flex items-center justify-center py-12">
          <div className="container-narrow">
            <motion.div
              className="text-center space-y-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m4-6V9a2 2 0 00-2-2H8a2 2 0 00-2 2v2m8 0V9a2 2 0 00-2-2M6 9V7a2 2 0 012-2h8a2 2 0 012 2v2" />
                </svg>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-section-title text-cloud-white">
                  Access Temporarily Blocked
                </h1>
                <p className="text-body-large text-text-secondary max-w-2xl mx-auto">
                  Too many failed login attempts. Please wait 15 minutes before trying again.
                </p>
              </div>

              <div className="card-glass max-w-md mx-auto">
                <p className="text-body text-text-secondary">
                  For security purposes, admin access has been temporarily restricted. 
                  If you are an authorized administrator, please wait for the cooldown period to expire.
                </p>
              </div>

              <button
                onClick={() => router.push('/')}
                className="btn-secondary"
              >
                Back to Home
              </button>
            </motion.div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Secure Admin Access – MOSBytes">
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              
              <h1 className="text-section-title text-cloud-white">
                {step === 1 ? 'Secure Access Required' : 'Administrator Login'}
              </h1>
              
              <p className="text-body-large text-text-secondary max-w-2xl mx-auto">
                {step === 1 
                  ? 'Enter the secure access code to proceed to admin login.'
                  : 'Enter your administrator credentials to access the dashboard.'
                }
              </p>
            </div>

            {/* Step 1: Access Code */}
            {step === 1 && (
              <div className="card-glass max-w-md mx-auto">
                <form onSubmit={handleAccessCode} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-cloud-white mb-3">
                      Access Code
                    </label>
                    <input
                      type="password"
                      required
                      value={credentials.accessCode}
                      onChange={(e) => setCredentials({ ...credentials, accessCode: e.target.value })}
                      className="input-modern"
                      placeholder="Enter secure access code"
                      maxLength={20}
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
                    disabled={loading || blocked}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    Verify Access Code
                  </button>
                </form>

                <div className="mt-6 p-4 bg-frost-blue/10 rounded-2xl border border-frost-blue/20">
                  <p className="text-caption text-frost-blue">
                    🔒 This is a secure area. Only authorized personnel should proceed.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Login Credentials */}
            {step === 2 && (
              <div className="card-glass max-w-md mx-auto">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-cloud-white mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={credentials.email}
                      onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                      className="input-modern"
                      placeholder="admin@mosbytes.com"
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
                      placeholder="Enter your password"
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

                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={() => setStep(1)}
                    className="text-text-muted hover:text-frost-blue transition-colors text-sm"
                  >
                    ← Back to Access Code
                  </button>
                  
                  <div className="text-caption text-text-muted">
                    Demo: admin@mosbytes.com / admin123
                  </div>
                </div>
              </div>
            )}

            {/* Security Notice */}
            <div className="card-glass max-w-2xl mx-auto">
              <h3 className="text-card-title text-cloud-white mb-4">
                Security Notice
              </h3>
              <div className="text-left space-y-3 text-sm text-text-secondary">
                <p>• All login attempts are monitored and logged</p>
                <p>• Multiple failed attempts will result in temporary access blocks</p>
                <p>• Unauthorized access attempts may be reported</p>
                <p>• This system is for authorized MOSBytes administrators only</p>
              </div>
            </div>

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