import Layout from '../components/Layout'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = async (e) => {
    e.preventDefault()

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
          plan: 'free'
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSubscribed(true)
        setMessage('Welcome to MOSBytes! Check your email for next steps.')
        setEmail('')
        setName('')
      } else {
        setMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setMessage('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const tools = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "AI Tutorials",
      benefit: "Learn AI concepts in minutes, not months"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: "Smart Tools",
      benefit: "AI-powered solutions that work instantly"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: "Clear Guidance",
      benefit: "Step-by-step paths to AI mastery"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Future Ready",
      benefit: "Stay ahead with emerging AI trends"
    }
  ]

  return (
    <Layout
      title="MOSBytes – Simplify to Solve | Making AI Easy for Everyone"
      description="Because clarity is power. Making AI easy enough for everyone to use, and powerful enough for anyone to grow. Join thousands learning AI through clear, practical guidance."
      ogTitle="MOSBytes – Simplify to Solve | AI Made Simple"
      ogDescription="Where complexity meets clarity. Making artificial intelligence accessible to everyone through elegant solutions and clear thinking."
      ogImage="/og-mosbytes-hero.jpg"
      twitterCard="summary_large_image"
      twitterTitle="MOSBytes – Simplify to Solve"
      twitterDescription="Where complexity meets clarity. Making AI simple enough that anyone can use it."
    >
      <main className="bg-deep-navy text-cloud-white overflow-hidden">

        {/* 1️⃣ Hero Section */}
        <section className="hero-section relative min-h-screen flex items-center justify-center gradient-hero">
          {/* Floating Dots */}
          <div className="floating-dots">
            <div className="float-dot"></div>
            <div className="float-dot"></div>
            <div className="float-dot"></div>
          </div>

          {/* Soft Motion Lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="motion-line absolute top-1/3 w-full h-px opacity-60"></div>
            <div className="motion-line absolute top-2/3 w-full h-px opacity-40" style={{ animationDelay: '4s' }}></div>
          </div>

          <div className="container-narrow text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Big, confident headline */}
              <h1 className="text-hero">
                <span className="gradient-text">Simplify to Solve.</span>
              </h1>

              {/* Subline */}
              <p className="text-body-large text-text-secondary max-w-3xl mx-auto">
                Because clarity is power. Making AI easy enough for everyone to use,
                and powerful enough for anyone to grow.
              </p>

              {/* Single CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="pt-8"
              >
                <Link href="/blog" className="btn-primary text-lg px-12 py-5 focus-calm magnetic-hover">
                  Start Exploring
                </Link>
              </motion.div>

              {/* Subtle trust indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="pt-12"
              >
                <p className="text-caption">
                  Where complexity meets clarity
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 2️⃣ About Section */}
        <section className="section-padding gradient-section">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-section-title">
                  At MOSBytes, we believe the smartest tools are the
                  <span className="gradient-text"> simplest to use</span>.
                </h2>
                <div className="space-y-6">
                  <p className="text-body text-text-secondary">
                    AI shouldn't overwhelm you. It should free you.
                  </p>
                  <p className="text-body text-text-secondary">
                    We build tools that think, so you can focus on what matters.
                    Every tutorial, every resource, every interaction is designed
                    with one principle: clarity over complexity.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="card-glass hover-glow">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-frost-blue rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-deep-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-card-title text-cloud-white">Our Promise</h3>
                      <p className="text-accent text-sm">Simplicity without sacrifice</p>
                    </div>
                  </div>
                  <p className="text-body text-text-secondary">
                    Technology finally slowed down for you to understand it.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3️⃣ Content / Tool Section */}
        <section className="section-padding bg-deep-navy">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-element"
            >
              <h2 className="text-section-title mb-6">
                Explore how AI can <span className="gradient-text">simplify your day</span>
              </h2>
              <p className="text-body-large text-text-secondary max-w-2xl mx-auto">
                Four pillars of intelligent simplicity
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group h-full"
                >
                  <div className="card hover-lift hover-glow h-64 flex flex-col">
                    <div className="text-frost-blue mb-6 group-hover:text-frost-light transition-colors duration-500 flex-shrink-0">
                      {tool.icon}
                    </div>
                    <h3 className="text-card-title mb-4 text-deep-navy flex-shrink-0">
                      {tool.title}
                    </h3>
                    <p className="text-body text-graphite flex-grow">
                      {tool.benefit}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4️⃣ Featured Project / Insight Section */}
        <section className="section-padding gradient-section">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-accent text-sm uppercase tracking-wider">Featured Insight</p>
                  <h2 className="text-section-title">
                    The Art of <span className="gradient-text">AI Simplicity</span>
                  </h2>
                </div>
                <p className="text-body-large text-text-secondary">
                  Discover how the most powerful AI applications are built on the
                  simplest principles. Learn the framework that transforms complex
                  problems into elegant solutions.
                </p>
                <Link href="/blog" className="btn-secondary focus-calm magnetic-hover">
                  Learn More
                </Link>
              </div>

              <div className="relative">
                <div className="gradient-border">
                  <div className="bg-steel-gray rounded-3xl p-8 h-80 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-frost-blue/20 rounded-full flex items-center justify-center mx-auto pulse-soft">
                        <svg className="w-8 h-8 text-frost-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <p className="text-accent text-sm">Interactive Learning</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 5️⃣ Simple CTA Section */}
        <section className="section-padding bg-deep-navy">
          <div className="container-narrow text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-section-title">
                Ready to <span className="gradient-text">simplify AI</span>?
              </h2>
              <p className="text-body-large text-text-secondary max-w-2xl mx-auto">
                Join thousands who've discovered that the smartest approach to AI
                is also the simplest.
              </p>
              <Link href="/blog" className="btn-primary text-lg px-12 py-5 focus-calm magnetic-hover">
                Start Your Journey
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 6️⃣ Footer */}
        <footer className="bg-steel-gray border-t border-graphite/20">
          <div className="container-custom py-20">
            {/* Email Subscription CTA - TEMPORARILY DISABLED */}
            {false && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="card-glass max-w-2xl mx-auto text-center">
                  {!subscribed ? (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-frost-blue/20 rounded-full flex items-center justify-center mx-auto">
                          <svg className="w-6 h-6 text-frost-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="text-card-title text-cloud-white">
                          Get AI insights that <span className="gradient-text">actually matter</span>
                        </h3>
                        <p className="text-body text-text-secondary">
                          Weekly wisdom on making AI work for you, not against you.
                        </p>
                      </div>

                      <form onSubmit={handleSubscribe} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Your name (optional)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input-modern"
                          />
                          <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input-modern"
                          />
                        </div>

                        <motion.button
                          type="submit"
                          disabled={loading || !email}
                          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                          whileHover={{ scale: loading ? 1 : 1.02 }}
                          whileTap={{ scale: loading ? 1 : 0.98 }}
                        >
                          {loading ? (
                            <div className="flex items-center justify-center space-x-2">
                              <div className="w-4 h-4 loading-spinner"></div>
                              <span>Joining...</span>
                            </div>
                          ) : (
                            'Start Learning Free'
                          )}
                        </motion.button>
                      </form>

                      {message && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 rounded-2xl text-sm ${message.includes('Welcome') || message.includes('success')
                            ? 'bg-frost-blue/20 text-frost-blue border border-frost-blue/30'
                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                            }`}
                        >
                          {message}
                        </motion.div>
                      )}

                      <p className="text-caption">
                        Free forever • No spam • Unsubscribe anytime
                      </p>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center space-y-6"
                    >
                      <div className="w-12 h-12 bg-frost-blue rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-6 h-6 text-deep-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-card-title text-cloud-white">Welcome to MOSBytes!</h3>
                        <p className="text-body text-text-secondary">
                          Check your email for your first dose of AI clarity.
                        </p>
                      </div>
                      <Link href="/blog" className="btn-secondary focus-calm">
                        Explore Tutorials
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Footer Navigation */}
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              {/* Logo and Tagline */}
              <div className="md:col-span-2 space-y-4">
                <Link href="/" className="inline-block">
                  <span className="text-2xl font-heading font-bold gradient-text">
                    MOSBytes
                  </span>
                </Link>
                <p className="text-accent text-sm">
                  Simplify to Solve.
                </p>
                <p className="text-body text-text-secondary max-w-md">
                  Making artificial intelligence accessible to everyone through
                  clear thinking and elegant solutions.
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-cloud-white">Learn</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/" className="text-text-secondary hover:text-frost-blue transition-colors text-sm">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-text-secondary hover:text-frost-blue transition-colors text-sm">
                      Tutorials
                    </Link>
                  </li>
                  {/* <li>
                    <Link href="/unsubscribe" className="text-text-secondary hover:text-frost-blue transition-colors text-sm">
                      Manage Subscription
                    </Link>
                  </li> */}
                  {/* Manage Subscription link temporarily disabled */}
                </ul>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-cloud-white">Connect</h3>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://tiktok.com/@mosbytes64"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-frost-blue transition-colors p-2 rounded-xl hover:bg-frost-blue/10"
                    aria-label="Follow us on TikTok"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://facebook.com/mosbytes64"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-frost-blue transition-colors p-2 rounded-xl hover:bg-frost-blue/10"
                    aria-label="Follow us on Facebook"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://youtube.com/@mosbytes64"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-frost-blue transition-colors p-2 rounded-xl hover:bg-frost-blue/10"
                    aria-label="Subscribe to our YouTube channel"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-graphite/20 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-caption">
                © 2025 MOSBytes. All rights reserved.
              </p>
              <div className="flex space-x-8">
                <Link href="/privacy" className="text-caption hover:text-frost-blue transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-caption hover:text-frost-blue transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </Layout>
  )
}