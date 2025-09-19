import { useState } from 'react'
import { motion } from 'framer-motion'
import { SUBSCRIPTION_PLANS } from '../lib/subscription'

export default function SubscriptionSection() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubscribe = async (planId) => {
    if (!email) {
      setMessage('Please enter your email address')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          plan: planId.toLowerCase()
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage('Successfully subscribed! Welcome to MOSBytes!')
        setEmail('')
        setName('')
      } else {
        setMessage(data.message || 'Subscription failed')
      }
    } catch (error) {
      setMessage('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="text-gradient-blue glow-effect-blue">Join 10,000+ Learners</span>
        </h2>
        <p className="text-xl text-gray-100 max-w-2xl mx-auto font-medium">
          Get weekly AI insights, tutorials, and exclusive resources delivered to your inbox.
        </p>
        <p className="text-sm amber-glow-text mt-2 font-semibold">
          No spam. Unsubscribe anytime.
        </p>
      </motion.div>

      {/* Subscription Box */}
      <motion.div
        className="max-w-lg mx-auto bg-navy-800/70 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-glow-blue/30 hover:border-glow-blue/50 glow-blue"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
      >
        <div className="text-center mb-6">
          <motion.div 
            className="w-20 h-20 bg-gradient-to-r from-glow-blue to-glow-blue-light rounded-full flex items-center justify-center mx-auto mb-4 glow-blue"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Join the AI Revolution
          </h3>
          <p className="blue-glow-text mb-6 font-semibold">
            Weekly insights • Practical tutorials • Expert guidance
          </p>
        </div>

        {message && (
          <motion.div 
            className={`mb-6 p-4 rounded-lg text-sm ${
              message.includes('Successfully') 
                ? 'bg-green-900/30 text-green-300 border border-green-700'
                : 'bg-red-900/30 text-red-300 border border-red-700'
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {message}
          </motion.div>
        )}

        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-glow-blue/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-glow-blue focus:border-glow-blue bg-navy-700/60 text-white placeholder-gray-300 transition-all duration-300 font-medium"
          />
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-glow-blue/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-glow-blue focus:border-glow-blue bg-navy-700/60 text-white placeholder-gray-300 transition-all duration-300 font-medium"
            required
          />
        </div>

        {/* What's Included */}
        <div className="mb-6">
          <h4 className="text-sm font-bold blue-glow-text mb-3 text-center">
            What's Included:
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {SUBSCRIPTION_PLANS.FREE.features.map((feature, index) => (
              <div key={index} className="flex items-center text-gray-100">
                <svg className="w-4 h-4 text-warm-amber mr-2 flex-shrink-0 glow-effect-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <motion.button
          onClick={() => handleSubscribe('free')}
          disabled={loading || !email}
          className="w-full py-4 px-6 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-glow-blue to-glow-blue-light hover:from-glow-blue-light hover:to-glow-blue-dark text-white text-lg shadow-lg glow-blue transform hover:-translate-y-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? 'Joining...' : 'Join Free - No Credit Card Required'}
        </motion.button>

        <p className="text-center text-xs amber-glow-text mt-4 font-medium">
          Free forever • No spam • Unsubscribe anytime
        </p>
      </motion.div>

      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <p className="text-sm text-gray-100 font-medium">
          Join 10,000+ learners worldwide mastering AI skills.
        </p>
      </motion.div>
    </section>
  )
}