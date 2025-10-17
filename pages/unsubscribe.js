import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

export default function Unsubscribe() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [unsubscribed, setUnsubscribed] = useState(false)
  const [step, setStep] = useState(1) // 1: form, 2: confirmation, 3: success

  useEffect(() => {
    // Get email from URL params if provided
    if (router.query.email) {
      setEmail(decodeURIComponent(router.query.email))
    }
  }, [router.query.email])

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
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (data.success) {
        setUnsubscribed(true)
        setStep(3)
        setMessage('You have been successfully unsubscribed from all emails.')
      } else {
        setMessage(data.message || 'Unable to process unsubscribe request. Please try again.')
      }
    } catch (error) {
      console.error('Unsubscribe error:', error)
      setMessage('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResubscribe = async () => {
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/resubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (data.success) {
        setMessage('Welcome back! You have been resubscribed to our emails.')
        setUnsubscribed(false)
        setStep(1)
      } else {
        setMessage(data.message || 'Unable to resubscribe. Please try again.')
      }
    } catch (error) {
      console.error('Resubscribe error:', error)
      setMessage('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (step === 3 && unsubscribed) {
    return (
      <Layout 
        title="Unsubscribed Successfully – MOSBytes"
        description="You have been successfully unsubscribed from MOSBytes emails."
      >
        <div className="min-h-screen bg-deep-navy flex items-center justify-center py-12">
          <div className="container-narrow">
            <motion.div
              className="text-center space-y-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Success Icon */}
              <div className="w-20 h-20 bg-frost-blue/20 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-frost-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="space-y-4">
                <h1 className="text-section-title text-cloud-white">
                  You're all set
                </h1>
                <p className="text-body-large text-text-secondary max-w-2xl mx-auto">
                  You have been successfully unsubscribed from all MOSBytes emails. 
                  We're sorry to see you go.
                </p>
              </div>

              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-frost-blue/20 text-frost-blue border border-frost-blue/30 max-w-md mx-auto"
                >
                  {message}
                </motion.div>
              )}

              <div className="space-y-6">
                <div className="card-glass max-w-md mx-auto">
                  <h3 className="text-card-title text-cloud-white mb-4">
                    Changed your mind?
                  </h3>
                  <p className="text-body text-text-secondary mb-6">
                    You can resubscribe anytime to continue receiving AI insights and tutorials.
                  </p>
                  <button
                    onClick={handleResubscribe}
                    disabled={loading}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    {loading ? 'Resubscribing...' : 'Resubscribe'}
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => router.push('/')}
                    className="btn-secondary"
                  >
                    Back to Home
                  </button>
                  <button
                    onClick={() => router.push('/blog')}
                    className="btn-ghost"
                  >
                    Browse Tutorials
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout 
      title="Unsubscribe – MOSBytes"
      description="Manage your email subscription preferences or unsubscribe from MOSBytes emails."
    >
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h1 className="text-section-title text-cloud-white">
                Manage Your Subscription
              </h1>
              
              <p className="text-body-large text-text-secondary max-w-2xl mx-auto">
                We're sorry to see you go. If you'd like to unsubscribe from our emails, 
                please enter your email address below.
              </p>
            </div>

            {/* Unsubscribe Form */}
            <div className="card-glass max-w-md mx-auto">
              <form onSubmit={handleUnsubscribe} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-cloud-white mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-modern"
                    placeholder="Enter your email address"
                  />
                </div>

                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-2xl text-sm ${
                      message.includes('successfully') || message.includes('Welcome back')
                        ? 'bg-frost-blue/20 text-frost-blue border border-frost-blue/30'
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}
                  >
                    {message}
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
                      <span>Processing...</span>
                    </div>
                  ) : (
                    'Unsubscribe'
                  )}
                </button>
              </form>
            </div>

            {/* Why are you leaving? */}
            <div className="card-glass max-w-2xl mx-auto">
              <h3 className="text-card-title text-cloud-white mb-4">
                Before you go...
              </h3>
              <p className="text-body text-text-secondary mb-6">
                We'd love to know why you're unsubscribing so we can improve our content.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 text-left">
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-frost-blue bg-steel-gray border-graphite rounded focus:ring-frost-blue focus:ring-2"
                    />
                    <span className="ml-3 text-sm text-text-secondary">Too many emails</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-frost-blue bg-steel-gray border-graphite rounded focus:ring-frost-blue focus:ring-2"
                    />
                    <span className="ml-3 text-sm text-text-secondary">Content not relevant</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-frost-blue bg-steel-gray border-graphite rounded focus:ring-frost-blue focus:ring-2"
                    />
                    <span className="ml-3 text-sm text-text-secondary">Never signed up</span>
                  </label>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-frost-blue bg-steel-gray border-graphite rounded focus:ring-frost-blue focus:ring-2"
                    />
                    <span className="ml-3 text-sm text-text-secondary">Poor email design</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-frost-blue bg-steel-gray border-graphite rounded focus:ring-frost-blue focus:ring-2"
                    />
                    <span className="ml-3 text-sm text-text-secondary">No longer interested in AI</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-frost-blue bg-steel-gray border-graphite rounded focus:ring-frost-blue focus:ring-2"
                    />
                    <span className="ml-3 text-sm text-text-secondary">Other</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Alternative Actions */}
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-body text-text-secondary mb-4">
                  Or would you prefer to:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => router.push('/')}
                    className="btn-secondary"
                  >
                    Back to Home
                  </button>
                  <button
                    onClick={() => router.push('/blog')}
                    className="btn-ghost"
                  >
                    Browse Tutorials
                  </button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-caption">
                  You can always resubscribe by visiting our homepage
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}