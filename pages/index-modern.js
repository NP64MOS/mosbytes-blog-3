import Layout from '../components/Layout'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import ParticleBackground from '../components/ParticleBackground'
import SubscriptionSection from '../components/SubscriptionSection'

export default function HomeModern() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const features = [
    {
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      title: "Learn",
      description: "Discover AI concepts through interactive tutorials and real-world applications.",
      gradient: "from-blue-500 to-cyan-500",
      delay: 0.1
    },
    {
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      title: "Build",
      description: "Create powerful AI solutions with cutting-edge tools and frameworks.",
      gradient: "from-purple-500 to-pink-500",
      delay: 0.2
    },
    {
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      title: "Grow",
      description: "Scale your expertise with advanced techniques and industry insights.",
      gradient: "from-green-500 to-emerald-500",
      delay: 0.3
    }
  ]

  return (
    <Layout 
      title="MOSBytes – AI for Everyone | Advanced AI Learning Platform"
      description="Master artificial intelligence with interactive tutorials, hands-on projects, and cutting-edge insights. Join the future of AI education with MOSBytes."
    >
      <main className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Hero Section */}
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center">
          <ParticleBackground />
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
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
            />
          </div>

          <motion.div 
            className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 text-center"
            style={{ y, opacity }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold mb-8 leading-none">
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
                  className="block text-2xl sm:text-4xl lg:text-5xl font-light text-gray-300 mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  AI for Everyone
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Unlock the power of artificial intelligence and transform your future with cutting-edge learning experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link
                href="/blog"
                className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-neon to-neon-purple rounded-full overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-neon/30 shadow-2xl hover:shadow-neon/25"
              >
                <span className="relative z-10">Get Started</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                />
              </Link>
              
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-300 border-2 border-gray-600 rounded-full hover:border-neon hover:text-neon transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-neon/20"
              >
                View Dashboard
              </Link>
            </motion.div>

            <motion.div
              className="mt-16 flex justify-center space-x-8 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>10,000+ Learners</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>500+ Tutorials</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>95% Success Rate</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating elements */}
          <motion.div
            className="absolute top-20 left-20 w-4 h-4 bg-neon rounded-full opacity-60"
            animate={{
              y: [0, -20, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-32 right-32 w-6 h-6 bg-neon-purple rounded-full opacity-40"
            animate={{
              y: [0, 15, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </section>

        {/* Features Section */}
        <section className="py-32 bg-gradient-to-b from-gray-900 to-gray-800 relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
                Your AI Journey
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Experience the future of learning with our innovative approach to AI education
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <motion.article
                  key={feature.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: feature.delay }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 h-full overflow-hidden group-hover:border-gray-600/50 transition-all duration-300">
                    {/* Animated background gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      initial={false}
                    />
                    
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <svg 
                        className="w-8 h-8 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                      </svg>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Hover effect overlay */}
                    <motion.div
                      className="absolute inset-0 border-2 border-transparent rounded-2xl"
                      whileHover={{
                        borderColor: "rgba(0, 245, 255, 0.3)",
                        boxShadow: "0 0 30px rgba(0, 245, 255, 0.1)"
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Subscription Section */}
        <section className="py-32 bg-gradient-to-t from-gray-900 to-gray-800">
          <SubscriptionSection />
        </section>
      </main>
    </Layout>
  )
}