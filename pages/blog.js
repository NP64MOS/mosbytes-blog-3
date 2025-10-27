import Layout from '../components/Layout'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const data = await response.json()
        setBlogPosts(data)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      // Fallback to static posts if API fails
      setBlogPosts([
        {
          id: 'getting-started-with-ai',
          title: "Getting Started with AI: A Beginner's Guide",
          description: "Learn the fundamentals of artificial intelligence and how it can transform your daily workflow.",
          date: "2024-12-15",
          readTime: "5 min read",
          category: "beginner",
          featured: true
        },
        {
          id: 'building-first-chatbot',
          title: "Building Your First Chatbot with Python",
          description: "Step-by-step tutorial on creating an intelligent chatbot using modern AI frameworks.",
          date: "2024-12-10",
          readTime: "8 min read",
          category: "tutorial",
          featured: false
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const categories = ['all', 'beginner', 'tutorial', 'advanced', 'tools']
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <Layout 
      title="AI Insights & Tutorials – MOSBytes" 
      description="Discover practical AI knowledge, tutorials, and insights to help you navigate the world of artificial intelligence."
    >
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="hero-bg section-padding-sm">
          <div className="container-clean">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-hero mb-6">
                <span className="gradient-text">AI Insights</span>
                <span className="text-gray-900"> & Tutorials</span>
              </h1>
              <p className="text-body-large text-gray-600 max-w-2xl mx-auto">
                Discover practical AI knowledge, tutorials, and insights to help you navigate the world of artificial intelligence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="paper-bg section-padding">
          <div className="container-clean">
            {/* Search and Filter */}
            <motion.div 
              className="mb-16 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-clean pl-12"
                />
                <svg className="absolute left-4 top-4 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Blog Posts */}
            <div className="space-y-8 max-w-4xl mx-auto">
              {filteredPosts.map((post, index) => (
                <motion.article 
                  key={post.id}
                  className={`card-paper hover-lift group ${
                    post.featured ? 'border-blue-200' : ''
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                      {post.featured && (
                        <>
                          <span>•</span>
                          <span className="text-blue-600 font-medium">Featured</span>
                        </>
                      )}
                    </div>
                    <span className="inline-block px-4 py-2 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  
                  <h2 className="text-card-title text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-body text-gray-600 mb-6 leading-relaxed">
                    {post.description}
                  </p>
                  
                  <Link 
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-all duration-200 group-hover:translate-x-2"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
                  <p className="text-gray-500">Try adjusting your search or category filter.</p>
                </div>
              </motion.div>
            )}

            {/* Load More Button */}
            {filteredPosts.length > 0 && (
              <motion.div 
                className="text-center mt-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button className="btn-secondary">
                  Load More Articles
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  )
}