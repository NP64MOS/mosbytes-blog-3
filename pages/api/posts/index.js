import { getAllPosts, addPost } from '../../../lib/db-adapter'
import { verifyToken, isAdmin } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const posts = await getAllPosts()
      return res.status(200).json(posts)
    } catch (error) {
      console.error('Posts API error:', error)
      return res.status(500).json({ message: 'Failed to fetch posts', error: error.message })
    }
  }

  if (req.method === 'POST') {
    // Verify admin authentication
    const token = req.headers.authorization?.replace('Bearer ', '')
    const user = verifyToken(token)
    
    if (!user || !isAdmin(user)) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { title, description, category, featured, content } = req.body
    
    if (!title || !description || !content) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Generate ID from title
    const id = title.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50)

    const postData = {
      id,
      title,
      description,
      category: category || 'general',
      featured: featured || false,
      content
    }

    try {
      const result = await addPost(postData)
      
      if (result) {
        return res.status(201).json({ message: 'Post created successfully', id, post: result })
      } else {
        return res.status(500).json({ message: 'Failed to create post' })
      }
    } catch (error) {
      console.error('Create post error:', error)
      return res.status(500).json({ message: 'Failed to create post', error: error.message })
    }
  }

  res.status(405).json({ message: 'Method not allowed' })
}