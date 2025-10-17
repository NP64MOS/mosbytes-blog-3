import Layout from '../components/Layout'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)

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
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

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
      <div className="bg-deep-navy min-h-screen">
        <div className="container-custom py-24">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-hero mb-6">
              <span className="gradient-text">AI Insights</span>
              <span className="text-cloud-white"> & Tutorials</span>
            </h1>
            <p className="text-body-large text-text-secondary max-w-2xl mx-auto">
              Discover practical AI knowledge, tutorials, and insights to help you navigate the world of artificial intelligence.
            </p>
          </motion.div>

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
                className="input-modern pl-12"
              />
              <svg className="absolute left-4 top-4 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-500 ${
                    selectedCategory === category
                      ? 'bg-frost-blue text-deep-navy'
                      : 'bg-steel-gray text-text-secondary hover:bg-frost-blue/20 hover:text-frost-blue'
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
                className={`card-glass hover-lift hover-glow group ${
                  post.featured ? 'border-frost-blue/40' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                  <div className="flex items-center text-sm text-text-muted space-x-4">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                    {post.featured && (
                      <>
                        <span>•</span>
                        <span className="text-frost-blue font-medium">Featured</span>
                      </>
                    )}
                  </div>
                  <span className="inline-block px-4 py-2 text-xs font-medium bg-frost-blue/20 text-frost-blue rounded-full">
                    {post.category}
                  </span>
                </div>
                
                <h2 className="text-card-title text-cloud-white mb-4 group-hover:text-frost-blue transition-colors">
                  <Link href={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-body text-text-secondary mb-6 leading-relaxed">
                  {post.description}
                </p>
                
                <Link 
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-cloud-white hover:text-frost-blue font-medium transition-all duration-300 group-hover:translate-x-2"
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
                <div className="w-16 h-16 bg-frost-blue/20 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-frost-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <p className="text-text-secondary text-lg">No articles found matching your criteria.</p>
                <p className="text-text-muted">Try adjusting your search or category filter.</p>
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
              <button className="btn-secondary magnetic-hover">
                Load More Articles
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  )
}