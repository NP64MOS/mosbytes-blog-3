import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { motion } from 'framer-motion'

export default function AdminPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'beginner',
    featured: false,
    content: ''
  })
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }
    fetchPosts()
  }, [router])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('adminToken')
    
    try {
      const url = editingPost ? `/api/posts/${editingPost.id}` : '/api/posts'
      const method = editingPost ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setShowForm(false)
        setEditingPost(null)
        setFormData({ title: '', description: '', category: 'beginner', featured: false, content: '' })
        fetchPosts()
      } else {
        alert('Error saving post')
      }
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Error saving post')
    }
  }

  const handleEdit = (post) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      description: post.description,
      category: post.category,
      featured: post.featured,
      content: post.content
    })
    setShowForm(true)
  }

  const handleDelete = async (postId) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    
    const token = localStorage.getItem('adminToken')
    
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        fetchPosts()
      } else {
        alert('Error deleting post')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Error deleting post')
    }
  }

  if (loading) {
    return (
      <Layout title="Manage Posts – MOSBytes">
        <div className="min-h-screen bg-deep-navy flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 loading-spinner mx-auto"></div>
            <p className="text-text-secondary">Loading posts...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Manage Posts – MOSBytes">
      <div className="min-h-screen bg-deep-navy">
        <div className="container-custom py-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-12 space-y-6 lg:space-y-0">
            <div className="space-y-2">
              <h1 className="text-section-title text-cloud-white">Manage Posts</h1>
              <p className="text-body text-text-secondary">Create, edit, and delete blog posts</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="btn-secondary text-sm px-4 py-2"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => {
                  setShowForm(true)
                  setEditingPost(null)
                  setFormData({ title: '', description: '', category: 'beginner', featured: false, content: '' })
                }}
                className="btn-primary text-sm px-4 py-2"
              >
                New Post
              </button>
            </div>
          </div>

          {/* Post Form Modal */}
          {showForm && (
            <motion.div
              className="fixed inset-0 bg-deep-navy/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="card-glass w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <h2 className="text-card-title text-cloud-white mb-6">
                  {editingPost ? 'Edit Post' : 'Create New Post'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-cloud-white mb-3">
                      Title
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="input-modern"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-cloud-white mb-3">
                      Description
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="input-modern resize-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-cloud-white mb-3">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="input-modern"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="tutorial">Tutorial</option>
                        <option value="advanced">Advanced</option>
                        <option value="tools">Tools</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                          className="w-4 h-4 text-frost-blue bg-steel-gray border-graphite rounded focus:ring-frost-blue focus:ring-2 mr-3"
                        />
                        <span className="text-sm font-medium text-cloud-white">
                          Featured Post
                        </span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-cloud-white mb-3">
                      Content (MDX)
                    </label>
                    <textarea
                      required
                      rows={15}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="input-modern font-mono text-sm resize-none"
                      placeholder="Write your post content in MDX format..."
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      {editingPost ? 'Update Post' : 'Create Post'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}

          {/* Posts List */}
          <div className="card-glass overflow-hidden">
            <div className="px-8 py-6 border-b border-graphite/20">
              <h3 className="text-card-title text-cloud-white">
                All Posts ({posts.length})
              </h3>
            </div>
            
            <div className="divide-y divide-graphite/20">
              {posts.map((post) => (
                <div key={post.id} className="p-8 hover:bg-frost-blue/5 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h4 className="text-lg font-semibold text-cloud-white">
                          {post.title}
                        </h4>
                        {post.featured && (
                          <span className="bg-frost-blue text-deep-navy text-xs px-3 py-1 rounded-full font-medium">
                            Featured
                          </span>
                        )}
                        <span className="bg-steel-gray text-text-secondary text-xs px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <p className="text-text-secondary mb-3">{post.description}</p>
                      <p className="text-sm text-text-muted">
                        {post.date} • {post.readTime}
                      </p>
                    </div>
                    
                    <div className="flex space-x-3 ml-6">
                      <button
                        onClick={() => handleEdit(post)}
                        className="bg-frost-blue/20 hover:bg-frost-blue/30 text-frost-blue px-4 py-2 rounded-xl text-sm transition-colors border border-frost-blue/30"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-xl text-sm transition-colors border border-red-500/30"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {posts.length === 0 && (
                <div className="p-16 text-center">
                  <div className="w-16 h-16 bg-frost-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-frost-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-text-secondary">No posts found. Create your first post!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}