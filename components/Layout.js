import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Layout({ 
  children, 
  title = 'MOSBytes – Simplify to Solve', 
  description = 'Because clarity is power. Making AI easy enough for everyone to use, and powerful enough for anyone to grow.',
  ogTitle,
  ogDescription,
  ogImage,
  twitterCard,
  twitterTitle,
  twitterDescription
}) {
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
    { href: '/blog', label: 'Tutorials' },
    // { href: '/unsubscribe', label: 'Manage Subscription' }, // TEMPORARILY DISABLED
    { href: '/admin/secure-access', label: 'Admin', className: 'text-sm opacity-60' }
  ]
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Theme Colors - Match new design palette */}
        <meta name="theme-color" content="#5BC0BE" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0B132B" />
        <meta name="msapplication-navbutton-color" content="#5BC0BE" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* PWA Colors */}
        <meta name="msapplication-TileColor" content="#0B132B" />
        <meta name="mask-icon" color="#5BC0BE" />
        
        {/* Open Graph */}
        <meta property="og:title" content={ogTitle || title} />
        <meta property="og:description" content={ogDescription || description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MOSBytes" />
        <meta property="og:locale" content="en_US" />
        {ogImage && <meta property="og:image" content={ogImage} />}
        {ogImage && <meta property="og:image:alt" content="MOSBytes - Simplify to Solve" />}
        
        {/* Twitter */}
        <meta name="twitter:card" content={twitterCard || "summary_large_image"} />
        <meta name="twitter:title" content={twitterTitle || title} />
        <meta name="twitter:description" content={twitterDescription || description} />
        <meta name="twitter:site" content="@mosbytes" />
        <meta name="twitter:creator" content="@mosbytes" />
        
        {/* Additional SEO & Branding */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="MOSBytes" />
        <meta name="application-name" content="MOSBytes" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href="https://mosbytes.com" />
        
        {/* Favicon & App Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <header className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-deep-navy/90 backdrop-blur-md shadow-gentle border-b border-graphite/20' 
            : 'bg-transparent'
        }`}>
          <nav className="container-custom">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <Link href="/" className="text-2xl font-bold font-heading hover:text-frost-blue transition-colors z-50 relative">
                <span className="gradient-text">
                  MOSBytes
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navigationItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className={`text-text-secondary hover:text-frost-blue transition-colors font-medium ${item.className || ''}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setMobileMenuOpen(!mobileMenuOpen)
                  }}
                  className="text-text-secondary hover:text-frost-blue transition-colors p-2 rounded-xl hover:bg-frost-blue/10"
                  aria-label="Toggle mobile menu"
                >
                  <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
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
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-deep-navy/80 backdrop-blur-sm md:hidden"
                    style={{ top: '80px' }}
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  
                  {/* Menu Content */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="absolute top-full left-0 right-0 md:hidden z-40"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="bg-steel-gray/95 backdrop-blur-md border-t border-graphite/20 shadow-gentle mx-6 rounded-b-3xl">
                      <div className="py-8">
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
                              className={`flex items-center px-8 py-4 text-text-secondary hover:text-frost-blue hover:bg-frost-blue/10 transition-all duration-300 font-medium rounded-2xl mx-4 ${item.className || ''}`}
                            >
                              <span className="text-base font-medium">{item.label}</span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </nav>
        </header>

        <main className="flex-1 pt-20">
          {children}
        </main>
      </div>
    </>
  )
}