import Layout from '../components/Layout'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SubscriptionSection from '../components/SubscriptionSection'

export default function HomeMinimal() {
  const features = [
    {
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      title: "Learn",
      description: "Master AI fundamentals through carefully crafted, intuitive learning experiences.",
      delay: 0.1
    },
    {
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      title: "Build",
      description: "Transform ideas into reality with guided, hands-on AI project development.",
      delay: 0.2
    },
    {
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      title: "Grow",
      description: "Evolve your expertise with cutting-edge insights and continuous learning.",
      delay: 0.3
    }
  ]

  return (
    <Layout 
      title="MOSBytes – AI for Everyone | Learn, Build, Grow with Artificial Intelligence"
      description="Join thousands learning AI through practical tutorials, hands-on projects, and expert guidance. Start your AI journey today with MOSBytes - completely free."
    >
      <main className="bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight mb-8">
                <span className="block text-primary dark:text-white font-extralight">MOSBytes</span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-light text-gray-600 dark:text-gray-400 mt-4">
                  AI for Everyone
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="text-xl sm:text-2xl font-light text-gray-700 dark:text-gray-300 mb-16 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Learn, Build, and Grow with AI in your daily life.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="space-y-6"
            >
              <Link
                href="/blog"
                className="inline-flex items-center justify-center px-12 py-4 text-lg font-medium text-white bg-primary dark:bg-white dark:text-primary rounded-full hover:bg-primary/90 dark:hover:bg-gray-100 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/20 shadow-lg hover:shadow-xl"
                aria-label="Get started with MOSBytes AI learning platform"
              >
                Get Started
              </Link>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 font-light">
                Free forever • No credit card required
              </p>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-32 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-6xl mx-auto px-6 sm:px-8">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-light text-primary dark:text-white mb-6">
                Three Simple Steps
              </h2>
              <p className="text-xl font-light text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Your journey to AI mastery, simplified
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-16">
              {features.map((feature, index) => (
                <motion.article
                  key={feature.title}
                  className="text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: feature.delay }}
                  viewport={{ once: true }}
                >
                  <div className="w-20 h-20 mx-auto mb-8 bg-primary/10 dark:bg-white/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-white/20 transition-colors duration-300">
                    <svg 
                      className="w-10 h-10 text-primary dark:text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-light text-primary dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-lg font-light text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Subscription Section */}
        <section className="py-32 bg-white dark:bg-gray-900">
          <SubscriptionSection />
        </section>
      </main>
    </Layout>
  )
}