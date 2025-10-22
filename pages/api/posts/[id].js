import { getPostById } from '../../../lib/blog'
import { updatePost, deletePost } from '../../../lib/db-adapter'
import { verifyToken, isAdmin } from '../../../lib/auth'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'GET') {
    const post = getPostById(id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    return res.status(200).json(post)
  }

  // Verify admin authentication for PUT and DELETE
  const token = req.headers.authorization?.replace('Bearer ', '')
  const user = verifyToken(token)
  
  if (!user || !isAdmin(user)) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  if (req.method === 'PUT') {
    const { title, description, category, featured, content } = req.body
    
    if (!title || !description || !content) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const postData = {
      title,
      description,
      category: category || 'general',
      featured: featured || false,
      content
    }

    const success = await updatePost(id, postData)
    
    if (success) {
      return res.status(200).json({ message: 'Post updated successfully' })
    } else {
      return res.status(500).json({ message: 'Failed to update post' })
    }
  }

  if (req.method === 'DELETE') {
    const success = await deletePost(id)
    
    if (success) {
      return res.status(200).json({ message: 'Post deleted successfully' })
    } else {
      return res.status(500).json({ message: 'Failed to delete post' })
    }
  }

  res.status(405).json({ message: 'Method not allowed' })
}