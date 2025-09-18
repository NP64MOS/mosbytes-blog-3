import Layout from '../components/Layout'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ParticleBackground from '../components/ParticleBackground'
import SubscriptionSection from '../components/SubscriptionSection'

export default function Home() {

  return (
    <Layout>
      <div className="bg-gradient-to-br from-light to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        <ParticleBackground />

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
                <span className="text-gradient glow-effect">MOSBytes</span>
                <span className="text-primary dark:text-white"> – AI for Everyone</span>
              </h1>
            </motion.div>

            <motion.p
              className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Learn, Build, and Grow with AI in your daily life.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/blog"
                className="inline-block bg-gradient-to-r from-neon to-neon-purple hover:from-neon-purple hover:to-neon text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg animate-glow"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </section>



        {/* Features Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                title: "Learn",
                description: "Discover AI concepts through practical, easy-to-understand guides and tutorials.",
                delay: 0.1
              },
              {
                icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                title: "Build",
                description: "Create AI-powered projects with step-by-step instructions and real-world examples.",
                delay: 0.2
              },
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Grow",
                description: "Advance your skills and stay updated with the latest AI trends and technologies.",
                delay: 0.3
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-2"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                viewport={{ once: true }}

              >
                <div className="w-12 h-12 bg-gradient-to-r from-neon to-neon-purple rounded-lg mb-4 flex items-center justify-center group-hover:animate-glow">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary dark:text-white mb-3 group-hover:text-neon transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Subscription Section */}
        <SubscriptionSection />
      </div>
    </Layout>
  )
}