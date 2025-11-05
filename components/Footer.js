import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  
  const emailAddress = 'natpant64@gmail.com'

  const handleEmailClick = (e) => {
    e.preventDefault()
    setShowEmailDialog(true)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress)
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = emailAddress
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    }
  }

  const openEmailClient = () => {
    window.location.href = `mailto:${emailAddress}`
    setShowEmailDialog(false)
  }

  const footerLinks = {
    'Connect': [
      { href: '#', label: 'Email Us', onClick: handleEmailClick },
      { href: 'https://tiktok.com/@mosbytes64', label: 'TikTok' },
      { href: 'https://facebook.com/mosbytes64', label: 'Facebook' },
      { href: 'https://youtube.com/@mosbytes64', label: 'YouTube' },
    ]
  }

  return (
    <footer className="footer-bg border-t border-gray-200">
      <div className="container-clean">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href="/" className="text-2xl font-bold gradient-text mb-4 block">
                  MOSBytes
                </Link>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Making AI simple enough for everyone to use, and powerful enough for anyone to grow.
                </p>
                <div className="flex space-x-4">
                  {/* Social Icons */}
                  <a href="https://tiktok.com/@mosbytes64" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors group">
                    <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                    </svg>
                  </a>
                  <a href="https://facebook.com/mosbytes64" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors group">
                    <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://youtube.com/@mosbytes64" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors group">
                    <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-1 gap-8 md:justify-end">
                {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="md:text-right"
                  >
                    <h4 className="font-semibold text-gray-900 mb-4">{category}</h4>
                    <ul className="space-y-3">
                      {links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          {link.onClick ? (
                            <button 
                              onClick={link.onClick}
                              className="footer-link text-left"
                            >
                              {link.label}
                            </button>
                          ) : (
                            <Link 
                              href={link.href} 
                              className="footer-link" 
                              target={link.href.startsWith('http') ? '_blank' : '_self'} 
                              rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                            >
                              {link.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-8">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center text-sm text-gray-500">
              <span>© {currentYear} MOSBytes. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Made with</span>
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>for AI learners</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Email Dialog */}
      <AnimatePresence>
        {showEmailDialog && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowEmailDialog(false)}
            >
              {/* Dialog */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center space-y-6">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Get in Touch
                    </h3>
                    <p className="text-gray-600">
                      Choose how you&apos;d like to contact us
                    </p>
                  </div>

                  {/* Email Address */}
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-medium">{emailAddress}</span>
                      <button
                        onClick={copyEmail}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Copy email address"
                      >
                        {emailCopied ? (
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {emailCopied && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-green-600 mt-2"
                      >
                        Email copied to clipboard!
                      </motion.p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={copyEmail}
                      className="flex-1 btn-secondary flex items-center justify-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copy Email</span>
                    </button>
                    <button
                      onClick={openEmailClient}
                      className="flex-1 btn-primary flex items-center justify-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Open Email App</span>
                    </button>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setShowEmailDialog(false)}
                    className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </footer>
  )
}