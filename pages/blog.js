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
      title="Blog – MOSBytes" 
      description="Read the latest articles about AI, machine learning, and technology trends."
    >
      <div className="bg-gradient-to-br from-light to-gray-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gradient">AI Insights</span>
              <span className="text-primary dark:text-white"> & Tutorials</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover practical AI knowledge, tutorials, and insights to help you navigate the world of artificial intelligence.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div 
            className="mb-12 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon transition-all"
              />
              <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-neon to-neon-purple text-white'
                      : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Blog Posts */}
          <div className="space-y-8">
            {filteredPosts.map((post, index) => (
              <motion.article 
                key={post.id}
                className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all p-8 border border-gray-100 dark:border-gray-700 group hover:-translate-y-1 ${
                  post.featured ? 'ring-2 ring-neon/20' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                    {post.featured && (
                      <>
                        <span>•</span>
                        <span className="text-neon font-medium">Featured</span>
                      </>
                    )}
                  </div>
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                    {post.category}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-primary dark:text-white mb-3 group-hover:text-neon transition-colors">
                  <Link href={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {post.description}
                </p>
                
                <Link 
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-primary dark:text-white hover:text-neon font-semibold transition-colors group-hover:translate-x-2"
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
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-500 dark:text-gray-400 text-lg">No articles found matching your criteria.</p>
            </motion.div>
          )}

          {/* Load More Button */}
          {filteredPosts.length > 0 && (
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-primary dark:text-white font-semibold px-8 py-3 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 hover:-translate-y-1">
                Load More Articles
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  )
}