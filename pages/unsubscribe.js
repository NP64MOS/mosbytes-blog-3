import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'

export default function Unsubscribe() {
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  // Pre-fill email if provided in URL and check if user is admin
  useEffect(() => {
    if (router.query.email) {
      setEmail(router.query.email)
    }
    // Check if user has admin token
    const adminToken = localStorage.getItem('adminToken')
    setIsAdmin(!!adminToken)
  }, [router.query.email])

  const reasons = [
    'Too many emails',
    'Content not relevant',
    'Found better alternatives',
    'No longer interested in AI',
    'Technical issues',
    'Privacy concerns',
    'Other'
  ]

  const handleUnsubscribe = async (e) => {
    e.preventDefault()
    
    if (!email) {
      setMessage('Please enter your email address')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, reason }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        setMessage(data.message)
      } else {
        setMessage(data.message || 'Failed to unsubscribe. Please try again.')
      }
    } catch (error) {
      console.error('Unsubscribe error:', error)
      setMessage('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Layout title="Unsubscribed - MOSBytes" description="You have been successfully unsubscribed">
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
          <motion.div
            className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-4">
              Successfully Unsubscribed
            </h1>
            
            <p className="text-gray-300 mb-6">
              We're sorry to see you go! You have been removed from our mailing list and will no longer receive emails from MOSBytes.
            </p>
            
            <div className="space-y-4">
              {isAdmin ? (
                <button
                  onClick={() => router.push('/admin/unsubscribed')}
                  className="w-full bg-gradient-to-r from-neon to-neon-purple text-white py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Back to Admin Panel
                </button>
              ) : (
                <button
                  onClick={() => router.push('/')}
                  className="w-full bg-gradient-to-r from-neon to-neon-purple text-white py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Return to Homepage
                </button>
              )}
              
              <p className="text-sm text-gray-400">
                Changed your mind? You can always{' '}
                <button
                  onClick={() => router.push('/#subscribe')}
                  className="text-neon hover:underline"
                >
                  subscribe again
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Unsubscribe - MOSBytes" description="Unsubscribe from MOSBytes newsletter">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
        <motion.div
          className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">
              Unsubscribe from MOSBytes
            </h1>
            
            <p className="text-gray-300">
              We're sorry to see you go. Please confirm your email to unsubscribe.
            </p>
          </div>

          <form onSubmit={handleUnsubscribe} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon text-white placeholder-gray-400"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-2">
                Why are you unsubscribing? (Optional)
              </label>
              <select
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon text-white"
              >
                <option value="">Select a reason...</option>
                {reasons.map((reasonOption) => (
                  <option key={reasonOption} value={reasonOption} className="bg-gray-800">
                    {reasonOption}
                  </option>
                ))}
              </select>
            </div>

            {message && (
              <div className={`p-4 rounded-lg ${success ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg transition-colors"
            >
              {loading ? 'Processing...' : 'Unsubscribe'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => isAdmin ? router.push('/admin/unsubscribed') : router.push('/')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {isAdmin ? 'Cancel and return to admin panel' : 'Cancel and return to homepage'}
              </button>
            </div>
          </form>

          <div className="mt-8 p-4 bg-blue-500/20 rounded-lg">
            <h3 className="text-sm font-medium text-blue-300 mb-2">
              Before you go...
            </h3>
            <p className="text-xs text-blue-200">
              You can also update your email preferences instead of unsubscribing completely. 
              Visit your{' '}
              <button
                onClick={() => router.push('/dashboard')}
                className="underline hover:no-underline"
              >
                dashboard
              </button>
              {' '}to customize what emails you receive.
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}