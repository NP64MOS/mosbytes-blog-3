import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Database functions - only available on server side
let dbFunctions = null

if (typeof window === 'undefined') {
  try {
    dbFunctions = require('./database.js')
  } catch (error) {
    console.error('Database not available:', error)
  }
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

// Ensure posts directory exists
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true })
}

export function getAllPosts() {
  try {
    // First try to get posts from database
    if (dbFunctions) {
      const dbPosts = dbFunctions.getAllPosts()
      if (dbPosts && dbPosts.length > 0) {
        return dbPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
      }
    }

    // Fallback to file system
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter(name => name.endsWith('.mdx'))
      .map((fileName) => {
        const id = fileName.replace(/\.mdx$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)

        return {
          id,
          ...matterResult.data,
          content: matterResult.content
        }
      })

    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export function getPostById(id) {
  try {
    // First try database
    if (dbFunctions) {
      const dbPost = dbFunctions.getPostById(id)
      if (dbPost) {
        return dbPost
      }
    }

    // Fallback to file system
    const fullPath = path.join(postsDirectory, `${id}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      id,
      ...matterResult.data,
      content: matterResult.content
    }
  } catch (error) {
    console.error('Error reading post:', error)
    return null
  }
}

export function createPost(postData) {
  try {
    const { id, title, description, category, featured, content } = postData
    
    // Save to database
    let dbSuccess = false
    if (dbFunctions) {
      dbSuccess = dbFunctions.addPost({
        id,
        title,
        description,
        category,
        featured,
        content,
        readTime: '5 min read'
      })
    }

    // Also save to file system for backup
    const date = new Date().toISOString().split('T')[0]
    const frontMatter = `---
title: "${title}"
description: "${description}"
date: "${date}"
category: "${category}"
featured: ${featured}
readTime: "5 min read"
---

${content}`

    const filePath = path.join(postsDirectory, `${id}.mdx`)
    fs.writeFileSync(filePath, frontMatter)
    
    return dbSuccess
  } catch (error) {
    console.error('Error creating post:', error)
    return false
  }
}

export function updatePost(id, postData) {
  try {
    const { title, description, category, featured, content } = postData
    
    // Update in database
    let dbSuccess = false
    if (dbFunctions) {
      dbSuccess = dbFunctions.updatePost(id, {
        title,
        description,
        category,
        featured,
        content
      })
    }

    // Also update file system
    const existingPost = getPostById(id)
    if (existingPost) {
      const frontMatter = `---
title: "${title}"
description: "${description}"
date: "${existingPost.date}"
category: "${category}"
featured: ${featured}
readTime: "${existingPost.readTime || '5 min read'}"
---

${content}`

      const filePath = path.join(postsDirectory, `${id}.mdx`)
      fs.writeFileSync(filePath, frontMatter)
    }
    
    return dbSuccess
  } catch (error) {
    console.error('Error updating post:', error)
    return false
  }
}

export function deletePost(id) {
  try {
    // Delete from database
    let dbSuccess = false
    if (dbFunctions) {
      dbSuccess = dbFunctions.deletePost(id)
    }
    
    // Also delete from file system
    const filePath = path.join(postsDirectory, `${id}.mdx`)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
    
    return dbSuccess
  } catch (error) {
    console.error('Error deleting post:', error)
    return false
  }
}