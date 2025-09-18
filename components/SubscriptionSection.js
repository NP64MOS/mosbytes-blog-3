import { useState } from 'react'
import { motion } from 'framer-motion'
import { SUBSCRIPTION_PLANS } from '../lib/subscription'

export default function SubscriptionSection() {
  const [selectedPlan, setSelectedPlan] = useState('PRO')
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
          <span className="text-gradient">Start Your AI Journey</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Join our free community and start learning AI today - no credit card required!
        </p>
      </motion.div>

      {/* Subscription Form */}
      <motion.div
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-primary dark:text-white mb-4 text-center">
            Get Started Today
          </h3>
          
          {message && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${
              message.includes('Successfully') 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-700'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700'
            }`}>
              {message}
            </div>
          )}
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>
        </div>
      </motion.div>

      {/* Free Plan Only */}
      <div className="max-w-md mx-auto">
        {Object.values(SUBSCRIPTION_PLANS).map((plan, index) => (
          <motion.div
            key={plan.id}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 ring-2 ring-neon/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-neon to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-primary dark:text-white mb-2">
                {plan.name} Plan
              </h3>
              <div className="mb-4">
                <span className="text-5xl font-bold text-neon">
                  Free
                </span>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Forever • No credit card required
                </p>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-neon mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={loading}
              className="w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-neon to-neon-purple hover:from-neon-purple hover:to-neon text-white text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {loading ? 'Processing...' : 'Join Free Plan'}
            </button>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          All plans include a 30-day money-back guarantee. Cancel anytime.
        </p>
      </motion.div>
    </section>
  )
}