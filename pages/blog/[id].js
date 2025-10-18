import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

export default function BlogPost() {
  const router = useRouter()
  const { id } = router.query
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      fetchPost()
    }
  }, [id])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`)
      if (response.ok) {
        const data = await response.json()
        setPost(data)
      } else {
        setError('Post not found')
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      setError('Failed to load post')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout title="Loading... – MOSBytes">
        <div className="min-h-screen bg-deep-navy flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 loading-spinner mx-auto"></div>
            <p className="text-text-secondary">Loading article...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (error || !post) {
    return (
      <Layout title="Post Not Found – MOSBytes">
        <div className="min-h-screen bg-deep-navy flex items-center justify-center">
          <div className="container-narrow">
            <motion.div
              className="text-center space-y-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-20 h-20 bg-frost-blue/20 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-frost-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-section-title text-cloud-white">
                  Article Not Found
                </h1>
                <p className="text-body-large text-text-secondary max-w-2xl mx-auto">
                  The article you&apos;re looking for doesn&apos;t exist or may have been moved.
                </p>
              </div>

              <button
                onClick={() => router.push('/blog')}
                className="btn-primary magnetic-hover"
              >
                Back to Tutorials
              </button>
            </motion.div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={`${post.title} – MOSBytes`} description={post.description}>
      <div className="min-h-screen bg-deep-navy">
        <article className="container-custom py-24">
          {/* Header */}
          <motion.div
            className="text-center mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center items-center space-x-4 mb-8">
              <span className="inline-block px-4 py-2 text-sm font-medium bg-steel-gray text-text-secondary rounded-full">
                {post.category}
              </span>
              {post.featured && (
                <span className="inline-block px-4 py-2 text-sm font-medium bg-frost-blue text-deep-navy rounded-full">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-hero text-cloud-white mb-8 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-body-large text-text-secondary mb-8 max-w-3xl mx-auto">
              {post.description}
            </p>
            
            <div className="flex justify-center items-center space-x-6 text-text-muted">
              <span>{new Date(post.date).toLocaleDateString()}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="card-glass max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-section-title text-cloud-white mb-8 mt-12 first:mt-0">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-card-title text-cloud-white mb-6 mt-10">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-cloud-white mb-4 mt-8">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-body text-text-secondary mb-6 leading-relaxed">
                      {children}
                    </p>
                  ),
                  code: ({ children, className }) => {
                    const isInline = !className
                    return isInline ? (
                      <code className="bg-steel-gray px-3 py-1 rounded-lg text-sm font-mono text-frost-blue">
                        {children}
                      </code>
                    ) : (
                      <pre className="bg-steel-gray p-6 rounded-2xl overflow-x-auto mb-6 border border-graphite/20">
                        <code className="text-sm font-mono text-cloud-white">
                          {children}
                        </code>
                      </pre>
                    )
                  },
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-6 space-y-3 text-text-secondary">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-6 space-y-3 text-text-secondary">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-text-secondary leading-relaxed">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-frost-blue pl-6 py-4 bg-frost-blue/5 rounded-r-2xl italic text-text-secondary mb-6 my-8">
                      {children}
                    </blockquote>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-cloud-white font-semibold">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="text-frost-blue">
                      {children}
                    </em>
                  ),
                  a: ({ children, href }) => (
                    <a 
                      href={href} 
                      className="text-frost-blue hover:text-frost-light underline decoration-frost-blue/50 hover:decoration-frost-light transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-center mt-16 space-y-6 sm:space-y-0 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={() => router.push('/blog')}
              className="flex items-center text-cloud-white hover:text-frost-blue transition-colors group"
            >
              <svg className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Tutorials
            </button>
            
            <div className="flex space-x-4">
              <motion.button 
                className="p-3 text-text-secondary hover:text-frost-blue hover:bg-frost-blue/10 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Share Article"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </motion.button>
              
              <motion.button 
                className="p-3 text-text-secondary hover:text-frost-blue hover:bg-frost-blue/10 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Bookmark Article"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </motion.button>
            </div>
          </motion.div>

          {/* Related Articles CTA */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="card-glass max-w-2xl mx-auto">
              <h3 className="text-card-title text-cloud-white mb-4">
                Continue Learning
              </h3>
              <p className="text-body text-text-secondary mb-6">
                Explore more AI insights and tutorials to expand your knowledge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push('/blog')}
                  className="btn-primary"
                >
                  More Tutorials
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="btn-secondary"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </motion.div>
        </article>
      </div>
    </Layout>
  )
}