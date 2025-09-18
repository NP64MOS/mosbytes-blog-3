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
      <Layout title="Loading... - MOSBytes">
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon"></div>
        </div>
      </Layout>
    )
  }

  if (error || !post) {
    return (
      <Layout title="Post Not Found - MOSBytes">
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary dark:text-white mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <button
              onClick={() => router.push('/blog')}
              className="bg-gradient-to-r from-neon to-neon-purple text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Back to Blog
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={`${post.title} - MOSBytes`} description={post.description}>
      <div className="min-h-screen bg-gradient-to-br from-light to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center items-center space-x-4 mb-6">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                {post.category}
              </span>
              {post.featured && (
                <span className="inline-block px-3 py-1 text-sm font-medium bg-neon text-white rounded-full">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-primary dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              {post.description}
            </p>
            
            <div className="flex justify-center items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <span>{new Date(post.date).toLocaleDateString()}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-primary dark:text-white mb-6 mt-8">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 mt-8">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold text-primary dark:text-white mb-3 mt-6">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      {children}
                    </p>
                  ),
                  code: ({ children, className }) => {
                    const isInline = !className
                    return isInline ? (
                      <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono text-neon">
                        {children}
                      </code>
                    ) : (
                      <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto mb-4">
                        <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                          {children}
                        </code>
                      </pre>
                    )
                  },
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                      {children}
                    </ol>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-neon pl-4 italic text-gray-600 dark:text-gray-400 mb-4">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="flex justify-between items-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={() => router.push('/blog')}
              className="flex items-center text-primary dark:text-white hover:text-neon transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </button>
            
            <div className="flex space-x-4">
              <button className="text-gray-500 hover:text-neon transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
              <button className="text-gray-500 hover:text-neon transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </motion.div>
        </article>
      </div>
    </Layout>
  )
}