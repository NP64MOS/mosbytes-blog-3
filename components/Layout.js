import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

export default function Layout({ children, title = 'MOSBytes – AI for Everyone', description = 'Learn, Build, and Grow with AI in your daily life.' }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = () => setMobileMenuOpen(false)
    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [mobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const navigationItems = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/admin/login', label: 'Admin', className: 'text-sm' }
  ]
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#00f5ff" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}>
          <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link href="/" className="text-2xl font-bold text-primary dark:text-white hover:text-neon transition-colors z-50 relative">
                <span className="bg-gradient-to-r from-neon to-neon-purple bg-clip-text text-transparent">
                  MOSBytes
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                {navigationItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className={`text-gray-600 dark:text-gray-300 hover:text-neon transition-colors ${item.className || ''}`}
                  >
                    {item.label}
                  </Link>
                ))}
                <ThemeToggle />
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-4">
                <ThemeToggle />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setMobileMenuOpen(!mobileMenuOpen)
                  }}
                  className="text-gray-600 dark:text-gray-300 hover:text-neon transition-colors p-2"
                  aria-label="Toggle mobile menu"
                >
                  <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden"
                    style={{ top: '64px' }}
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  
                  {/* Menu Content */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="absolute top-full left-0 right-0 md:hidden z-40"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-xl mx-4 rounded-b-xl">
                      <div className="py-6">
                        {navigationItems.map((item, index) => (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <Link
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-neon hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 ${item.className || ''}`}
                            >
                              <span className="text-base font-medium">{item.label}</span>
                            </Link>
                          </motion.div>
                        ))}
                        
                        {/* Mobile-specific section */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                          className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4"
                        >
                          <div className="px-6 py-2">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Quick Access
                            </span>
                          </div>
                          <Link
                            href="/test-admin"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-neon hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
                          >
                            <span className="text-sm">Test Admin System</span>
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </nav>
        </header>

        <main className="flex-1 pt-16">
          {children}
        </main>

        <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600 dark:text-gray-400">
              <p>&copy; 2024 MOSBytes. AI for Everyone.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}