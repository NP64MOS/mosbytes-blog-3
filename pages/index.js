import Layout from '../components/Layout'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import ParticleBackground from '../components/ParticleBackground'
import SubscriptionSection from '../components/SubscriptionSection'

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const features = [
    {
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      title: "Learn",
      description: "Discover AI concepts through interactive tutorials and real-world applications designed for everyone.",
      gradient: "from-blue-500 to-cyan-500",
      delay: 0.1
    },
    {
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      title: "Build",
      description: "Create powerful AI solutions with step-by-step guidance and cutting-edge tools and frameworks.",
      gradient: "from-purple-500 to-pink-500",
      delay: 0.2
    },
    {
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      title: "Grow",
      description: "Scale your expertise with advanced techniques, industry insights, and continuous learning paths.",
      gradient: "from-green-500 to-emerald-500",
      delay: 0.3
    }
  ]

  return (
    <Layout
      title="MOSBytes – AI for Everyone | Learn, Build, Grow with Artificial Intelligence"
      description="Master artificial intelligence with interactive tutorials, hands-on projects, and expert guidance. Join thousands learning AI through practical, easy-to-understand content. Start your AI journey today - completely free."
      ogTitle="MOSBytes – AI for Everyone | Learn, Build, Grow with AI"
      ogDescription="Master artificial intelligence with interactive tutorials, hands-on projects, and expert guidance. Join 10,000+ learners worldwide."
      ogImage="/og-image.jpg"
      twitterCard="summary_large_image"
      twitterTitle="MOSBytes – AI for Everyone"
      twitterDescription="Master AI with interactive tutorials and hands-on projects. Join 10,000+ learners worldwide."
    >
      <main className="bg-gradient-to-br from-gray-900 via-primary to-gray-900 text-white overflow-hidden">
        {/* Hero Section */}
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center">
          <ParticleBackground />

          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-purple/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.2, 0.4],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              aria-hidden="true"
            />
          </div>

          <motion.div
            className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 text-center"
            style={{ y, opacity }}
          >
            <motion.header
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-none">
                <motion.span
                  className="block bg-gradient-to-r from-neon via-white to-neon-purple bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: "200% 200%"
                  }}
                >
                  MOSBytes
                </motion.span>
                <motion.span
                  className="block text-2xl sm:text-3xl lg:text-4xl font-light text-gray-300 mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  AI for Everyone
                </motion.span>
              </h1>
            </motion.header>

            <motion.p
              className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Learn, Build, and Grow with AI in your daily life through practical tutorials and hands-on projects.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-6"
            >
              <div className="text-center sm:text-left">
                <Link
                  href="/blog"
                  className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-neon to-neon-purple rounded-full overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-neon/30 shadow-2xl hover:shadow-neon/25"
                  aria-label="Get started with MOSBytes AI learning platform"
                >
                  <span className="relative z-10">Get Started</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.05 }}
                  />
                </Link>
                <p className="text-xs sm:text-sm text-gray-400 mt-2">
                  Free. No sign-up required.
                </p>
              </div>

              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-4 text-base sm:text-lg font-medium text-gray-300 border-2 border-gray-600 rounded-full hover:border-neon hover:text-neon transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-neon/20"
                aria-label="Access your learning dashboard"
              >
                View Dashboard
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="flex flex-col items-center space-y-4">
                <blockquote className="text-center max-w-2xl">
                  <p className="text-sm sm:text-base text-gray-300 italic">
                    "MOSBytes made AI accessible to me. The tutorials are clear, practical, and I'm already using AI tools in my daily work."
                  </p>
                  <footer className="mt-2 text-xs sm:text-sm text-gray-400">
                    — Sarah Chen, Product Manager
                  </footer>
                </blockquote>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true"></div>
                <span>10,000+ Learners</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" aria-hidden="true"></div>
                <span>500+ Tutorials</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" aria-hidden="true"></div>
                <span>95% Success Rate</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-b from-gray-900 to-gray-800 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.header
              className="text-center mb-16 sm:mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4 sm:mb-6">
                Your AI Learning Journey
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
                Experience the future of learning with our innovative approach to AI education
              </p>
            </motion.header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
              {features.map((feature) => (
                <motion.article
                  key={feature.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: feature.delay }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 h-full overflow-hidden group-hover:border-gray-600/50 transition-all duration-300">
                    {/* Animated background gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      initial={false}
                      aria-hidden="true"
                    />

                    <motion.div
                      className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.gradient} rounded-xl mb-6 flex items-center justify-center transition-all duration-300`}
                      whileHover={{
                        scale: 1.1,
                        rotate: 5
                      }}
                    >
                      <motion.svg
                        className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        whileHover={{ rotate: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                      </motion.svg>
                    </motion.div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 mb-6">
                      {feature.description}
                    </p>

                    {/* Learn More Link */}
                    <Link
                      href="/blog"
                      className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-neon transition-colors duration-300 group-hover:text-gray-400"
                    >
                      Learn more
                      <motion.svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </Link>

                    {/* Hover effect overlay */}
                    <motion.div
                      className="absolute inset-0 border-2 border-transparent rounded-2xl pointer-events-none"
                      whileHover={{
                        borderColor: "rgba(0, 245, 255, 0.3)",
                        boxShadow: "0 0 30px rgba(0, 245, 255, 0.1)"
                      }}
                      transition={{ duration: 0.3 }}
                      aria-hidden="true"
                    />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Subscription Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-t from-gray-900 to-gray-800">
          <SubscriptionSection />
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Logo and Description */}
              <div className="md:col-span-2">
                <Link href="/" className="inline-block mb-4">
                  <span className="text-2xl font-bold bg-gradient-to-r from-neon to-neon-purple bg-clip-text text-transparent">
                    MOSBytes
                  </span>
                </Link>
                <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                  Making artificial intelligence accessible to everyone through practical tutorials, hands-on projects, and expert guidance.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-gray-400 hover:text-neon transition-colors text-sm">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-gray-400 hover:text-neon transition-colors text-sm">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="text-gray-400 hover:text-neon transition-colors text-sm">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/unsubscribe" className="text-gray-400 hover:text-neon transition-colors text-sm">
                      Unsubscribe
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Connect</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://twitter.com/mosbytes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-neon transition-colors"
                    aria-label="Follow us on Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/company/mosbytes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-neon transition-colors"
                    aria-label="Follow us on LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/mosbytes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-neon transition-colors"
                    aria-label="Follow us on GitHub"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 MOSBytes. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 sm:mt-0">
                <Link href="/privacy" className="text-gray-400 hover:text-neon transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-neon transition-colors text-sm">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </Layout>)
}