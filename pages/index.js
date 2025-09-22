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
      gradient: "from-glow-blue to-glow-blue-light",
      glowColor: "rgba(37, 99, 235, 0.4)",
      delay: 0.1
    },
    {
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      title: "Build",
      description: "Create powerful AI solutions with step-by-step guidance and cutting-edge tools and frameworks.",
      gradient: "from-warm-amber to-amber-glow",
      glowColor: "rgba(245, 158, 11, 0.4)",
      delay: 0.2
    },
    {
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      title: "Grow",
      description: "Scale your expertise with advanced techniques, industry insights, and continuous learning paths.",
      gradient: "from-glow-blue-dark to-blue-glow",
      glowColor: "rgba(29, 78, 216, 0.4)",
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
      <main className="dark-blue-gradient text-white overflow-hidden">
        {/* Hero Section */}
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center">
          <ParticleBackground />

          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-glow-blue/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
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
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-warm-amber/15 rounded-full blur-3xl"
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
            <motion.div
              className="absolute top-1/2 right-1/3 w-64 h-64 bg-glow-blue-light/12 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute top-3/4 left-1/3 w-48 h-48 bg-warm-amber/8 rounded-full blur-xl"
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{
                duration: 12,
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
                  className="block bg-gradient-to-r from-glow-blue via-glow-blue-light to-blue-glow bg-clip-text text-transparent font-bold"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                    filter: "drop-shadow(0 0 20px rgba(37, 99, 235, 0.3))"
                  }}
                >
                  MOSBytes
                </motion.span>
                <motion.span
                  className="block text-2xl sm:text-3xl lg:text-4xl font-medium blue-glow-text mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  AI for Everyone
                </motion.span>
              </h1>
            </motion.header>

            <motion.p
              className="text-lg sm:text-xl lg:text-2xl text-gray-100 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Practical AI Tutorials. Hands-on. For Everyone.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-center mb-12"
            >
              {/* CTA Section */}
              <div className="text-center lg:text-left">
                <div className="mb-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/blog"
                      className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-glow-blue to-blue-glow rounded-full overflow-hidden transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-glow-blue/40 shadow-2xl glow-blue"
                      aria-label="Get started with MOSBytes AI learning platform"
                    >
                      <span className="relative z-10 font-bold">Get Started Free</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-glow-blue-light to-glow-blue-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.02 }}
                      />
                    </Link>
                  </motion.div>
                  <p className="text-sm amber-glow-text mt-3 font-semibold">
                    Start learning AI today – free.
                  </p>
                </div>
              </div>

              {/* Interactive Dashboard Preview with CTA */}
              <div className="flex-shrink-0">
                <motion.div
                  className="relative w-80 h-48 bg-navy-800/60 backdrop-blur-sm rounded-xl border border-glow-blue/30 overflow-hidden glow-blue cursor-pointer group"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => window.location.href = '/dashboard'}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-glow-blue/10 to-warm-amber/5 group-hover:from-glow-blue/15 group-hover:to-warm-amber/8 transition-all duration-300"></div>
                  
                  {/* Dashboard Content */}
                  <div className="p-6 h-full flex flex-col justify-center items-center text-center relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-glow-blue to-glow-blue-light rounded-lg mb-4 flex items-center justify-center glow-blue group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-glow-blue transition-colors duration-300">Interactive Dashboard</h4>
                    <p className="text-sm text-gray-300 font-medium mb-4">Track your progress through AI tutorials</p>
                    
                    {/* Integrated CTA Button */}
                    <motion.div
                      className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-warm-amber border-2 border-warm-amber/50 rounded-full hover:border-warm-amber hover:text-amber-glow hover:bg-warm-amber/10 transition-all duration-300 backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>View Dashboard</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-glow-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </motion.div>
              </div>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {[
                  {
                    quote: "MOSBytes made AI accessible to me. The tutorials are clear, practical, and I'm already using AI tools in my daily work.",
                    name: "Sarah Chen",
                    role: "Product Manager",
                    avatar: "SC"
                  },
                  {
                    quote: "Finally, AI tutorials that don't assume you have a PhD. Perfect for beginners who want real results.",
                    name: "Marcus Rodriguez", 
                    role: "Marketing Director",
                    avatar: "MR"
                  },
                  {
                    quote: "The hands-on approach is brilliant. I built my first AI project in just two weeks!",
                    name: "Emily Watson",
                    role: "Small Business Owner", 
                    avatar: "EW"
                  }
                ].map((testimonial, index) => (
                  <motion.blockquote
                    key={index}
                    className="bg-navy-800/40 backdrop-blur-sm rounded-xl p-6 border border-glow-blue/30 glow-blue"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <p className="text-sm text-gray-100 italic font-medium mb-4 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <footer className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-glow-blue to-glow-blue-light rounded-full flex items-center justify-center glow-blue">
                        <span className="text-xs font-bold text-white">{testimonial.avatar}</span>
                      </div>
                      <div>
                        <div className="text-sm blue-glow-text font-semibold">{testimonial.name}</div>
                        <div className="text-xs text-gray-300">{testimonial.role}</div>
                      </div>
                    </footer>
                  </motion.blockquote>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-200 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-glow-blue rounded-full animate-pulse glow-effect-blue" aria-hidden="true"></div>
                <span>10,000+ Learners</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warm-amber rounded-full animate-pulse glow-effect-amber" aria-hidden="true"></div>
                <span>500+ Tutorials</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-glow-blue-light rounded-full animate-pulse glow-effect-blue" aria-hidden="true"></div>
                <span>95% Success Rate</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-b from-navy-black to-navy-900 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.header
              className="text-center mb-16 sm:mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient-blue mb-4 sm:mb-6 glow-effect-blue">
                How It Works
              </h2>
              <p className="text-lg sm:text-xl text-gray-100 max-w-2xl mx-auto font-medium">
                Start your AI journey in three simple steps
              </p>
            </motion.header>

            <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
              {[
                {
                  step: "01",
                  title: "Learn",
                  description: "Start with interactive tutorials designed for beginners and experts alike.",
                  icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                  delay: 0.1
                },
                {
                  step: "02", 
                  title: "Build",
                  description: "Apply your knowledge with hands-on projects and real-world applications.",
                  icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                  delay: 0.2
                },
                {
                  step: "03",
                  title: "Grow", 
                  description: "Advance your skills and become an AI expert with our comprehensive resources.",
                  icon: "M13 10V3L4 14h7v7l9-11h-7z",
                  delay: 0.3
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: item.delay }}
                  viewport={{ once: true }}
                >
                  <div className="relative mb-8">
                    <motion.div
                      className="w-20 h-20 bg-gradient-to-r from-glow-blue to-glow-blue-light rounded-full flex items-center justify-center mx-auto mb-4 glow-blue"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={item.icon} />
                      </svg>
                    </motion.div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-warm-amber rounded-full flex items-center justify-center glow-amber">
                      <span className="text-xs font-bold text-navy-black">{item.step}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-200 leading-relaxed font-medium max-w-sm mx-auto">
                    {item.description}
                  </p>

                  {/* Arrow connector (except for last item) */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-full w-12 h-0.5 bg-gradient-to-r from-glow-blue/50 to-transparent transform -translate-x-6"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-b from-navy-900 to-navy-800 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.header
              className="text-center mb-16 sm:mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient-blue mb-4 sm:mb-6 glow-effect-blue">
                Your AI Learning Journey
              </h2>
              <p className="text-lg sm:text-xl text-gray-100 max-w-3xl mx-auto font-medium">
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
                  <div className="relative bg-gradient-to-br from-navy-800/70 to-navy-700/50 backdrop-blur-sm border border-glow-blue/30 rounded-2xl p-6 sm:p-8 h-full overflow-hidden group-hover:border-glow-blue/50 transition-all duration-300">
                    {/* Animated background gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-12 transition-opacity duration-500`}
                      initial={false}
                      aria-hidden="true"
                    />

                    <div className="flex items-start space-x-4 mb-6">
                      <motion.div
                        className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-lg flex-shrink-0`}
                        whileHover={{
                          scale: 1.15,
                          rotate: 8,
                          boxShadow: `0 0 30px ${feature.glowColor}`
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <motion.svg
                          className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          whileHover={{ rotate: -8, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={feature.icon} />
                        </motion.svg>
                      </motion.div>
                      
                      {/* Visual Enhancement */}
                      <div className="flex-1 min-h-16 bg-navy-700/30 rounded-lg border border-glow-blue/20 p-3 group-hover:border-glow-blue/40 transition-colors duration-300">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-2 h-2 bg-glow-blue rounded-full animate-pulse"></div>
                          <div className="w-16 h-1 bg-glow-blue/30 rounded"></div>
                        </div>
                        <div className="space-y-1">
                          <div className="w-full h-1 bg-gray-600 rounded"></div>
                          <div className="w-3/4 h-1 bg-gray-600 rounded"></div>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:text-gradient-blue transition-all duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-gray-200 leading-relaxed group-hover:text-gray-100 transition-colors duration-300 mb-6 font-medium">
                      {feature.description}
                    </p>

                    {/* Learn More Link */}
                    <Link
                      href="/blog"
                      className="inline-flex items-center text-sm font-semibold text-warm-amber/80 hover:text-warm-amber transition-colors duration-300 group-hover:text-amber-glow"
                    >
                      Learn more
                      <motion.svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </Link>

                    {/* Hover effect overlay */}
                    <motion.div
                      className="absolute inset-0 border-2 border-transparent rounded-2xl pointer-events-none"
                      whileHover={{
                        borderColor: "rgba(37, 99, 235, 0.4)",
                        boxShadow: `0 0 35px ${feature.glowColor}`
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
        <section className="py-20 sm:py-32 bg-gradient-to-t from-navy-black to-navy-800">
          <SubscriptionSection />
        </section>

        {/* Footer */}
        <footer className="bg-navy-black border-t border-glow-blue/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Logo and Description */}
              <div className="md:col-span-2">
                <Link href="/" className="inline-block mb-4">
                  <span className="text-2xl font-bold text-gradient">
                    MOSBytes
                  </span>
                </Link>
                <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                  Making artificial intelligence accessible to everyone through practical tutorials, hands-on projects, and expert guidance.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="blue-glow-text font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-gray-200 hover:text-glow-blue transition-colors text-sm font-medium">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-gray-200 hover:text-glow-blue transition-colors text-sm font-medium">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="text-gray-200 hover:text-glow-blue transition-colors text-sm font-medium">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/unsubscribe" className="text-gray-200 hover:text-glow-blue transition-colors text-sm font-medium">
                      Unsubscribe
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="blue-glow-text font-bold mb-4">Connect</h3>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://tiktok.com/@mosbytes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:text-glow-blue transition-colors p-2 rounded-lg hover:bg-glow-blue/10 glow-blue"
                    aria-label="Follow us on TikTok"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://facebook.com/mosbytes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:text-glow-blue transition-colors p-2 rounded-lg hover:bg-glow-blue/10 glow-blue"
                    aria-label="Follow us on Facebook"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://youtube.com/@mosbytes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:text-glow-blue transition-colors p-2 rounded-lg hover:bg-glow-blue/10 glow-blue"
                    aria-label="Subscribe to our YouTube channel"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="text-center mb-8 p-6 bg-navy-800/40 backdrop-blur-sm rounded-xl border border-glow-blue/30">
              <p className="text-lg font-semibold text-white mb-4">
                🚀 Ready to start learning AI?
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white bg-gradient-to-r from-glow-blue to-blue-glow rounded-full hover:scale-105 transition-all duration-300 glow-blue"
              >
                Get Started Free
              </Link>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-glow-blue/30 pt-8 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-200 text-sm font-medium">
                © 2025 MOSBytes. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 sm:mt-0">
                <Link href="/privacy" className="text-gray-200 hover:text-glow-blue transition-colors text-sm font-medium">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-200 hover:text-glow-blue transition-colors text-sm font-medium">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </Layout>)
}