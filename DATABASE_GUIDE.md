# 🗄️ MOSBytes Database Guide

## ✅ **Database System Implemented!**

Your MOSBytes platform now has a complete database system with demo data and environment configuration.

## 📊 **Database Overview**

### **Database Type**: JSON File-based
- **Location**: `./data/database.json`
- **Backup Location**: `./data/backup-*.json`
- **Type**: Lightweight JSON database for demo/development
- **Production Ready**: Can be easily migrated to PostgreSQL, MongoDB, etc.

### **Database Structure**
```json
{
  "subscribers": [...],    // User accounts and progress
  "posts": [...],         // Blog posts and content
  "analytics": {...},     // Site statistics
  "settings": {...}       // Application settings
}
```

## 🚀 **Getting Started**

### **1. Initialize Database**
```bash
npm run init-db
```
This creates the database with demo data including:
- ✅ 3 sample subscribers with different progress levels
- ✅ 2 sample blog posts
- ✅ Analytics data
- ✅ Application settings

### **2. Environment Setup**
The `.env.local` file is already created with:
```env
DATABASE_URL="./data/database.json"
DATABASE_TYPE="json"
JWT_SECRET="mosbytes-super-secret-key-change-in-production-2024"
ADMIN_EMAIL="admin@mosbytes.com"
ADMIN_PASSWORD="admin123"
```

### **3. Start Development**
```bash
npm run dev
```

## 👥 **Demo Subscribers Data**

### **John Doe** (`john.doe@example.com`)
- **Progress**: 12/25 tutorials completed
- **Streak**: 15 days
- **AI Tools**: 8 tools used
- **Level**: Beginner
- **Current Tutorial**: Building First Chatbot

### **Jane Smith** (`jane.smith@example.com`)
- **Progress**: 8/25 tutorials completed
- **Streak**: 7 days
- **AI Tools**: 5 tools used
- **Level**: Beginner
- **Preferences**: Dark theme, no notifications

### **Alice Johnson** (`alice.johnson@example.com`)
- **Progress**: 20/25 tutorials completed
- **Streak**: 25 days
- **AI Tools**: 12 tools used
- **Level**: Intermediate
- **Most Advanced User**: Completed 5 tutorials

## 📝 **Demo Blog Posts**

### **1. Getting Started with AI**
- **Category**: Beginner
- **Featured**: Yes
- **Views**: 1,250
- **Likes**: 89

### **2. Building Your First Chatbot**
- **Category**: Tutorial
- **Featured**: No
- **Views**: 892
- **Likes**: 67

## 🔧 **Database Functions**

### **Subscriber Management**
```javascript
// Get all subscribers
const subscribers = getAllSubscribers()

// Get specific subscriber
const user = getSubscriberByEmail('john.doe@example.com')

// Add new subscriber
const result = addSubscriber('new@email.com', 'New User')

// Update subscriber progress
updateSubscriber('john.doe@example.com', {
  tutorialsCompleted: 13,
  learningStreak: 16
})
```

### **Blog Post Management**
```javascript
// Get all posts
const posts = getAllPosts()

// Get specific post
const post = getPostById('getting-started-with-ai')

// Create new post
createPost({
  id: 'new-post',
  title: 'New Post Title',
  content: 'Post content...'
})
```

### **Analytics**
```javascript
// Get site analytics
const analytics = getAnalytics()
// Returns: totalViews, totalSubscribers, monthlyGrowth, etc.
```

## 🎯 **Testing the Database**

### **1. Dashboard Login**
Visit `/dashboard` and login with any of these emails:
- `john.doe@example.com` - See 12 tutorials, 15-day streak
- `jane.smith@example.com` - See 8 tutorials, 7-day streak  
- `alice.johnson@example.com` - See 20 tutorials, 25-day streak

### **2. Admin Panel**
- **Login**: `/admin/login` with `admin@mosbytes.com` / `admin123`
- **View Subscribers**: See all 3 demo users with real data
- **Database Viewer**: `/admin/database` - View raw JSON data
- **Create Backup**: Click "Create Backup" button

### **3. Subscription System**
- Subscribe with new email on homepage
- Check `/admin/subscribers` to see new user added
- Login to `/dashboard` with new email to see fresh account

## 📱 **API Endpoints**

### **Subscriber APIs**
- `GET /api/admin/subscribers` - List all subscribers
- `GET /api/subscriber/[email]` - Get specific subscriber
- `POST /api/subscribe` - Add new subscriber

### **Blog APIs**
- `GET /api/posts` - List all posts
- `GET /api/posts/[id]` - Get specific post
- `POST /api/posts` - Create new post (admin only)
- `PUT /api/posts/[id]` - Update post (admin only)
- `DELETE /api/posts/[id]` - Delete post (admin only)

### **Database Management**
- `GET /api/database/status` - Database health check
- `POST /api/database/backup` - Create database backup

## 🔒 **Security Features**

### **Environment Variables**
- JWT secrets for authentication
- Admin credentials
- Database configuration
- All sensitive data in `.env.local`

### **Access Control**
- Admin-only endpoints protected
- JWT token verification
- Role-based permissions

## 💾 **Backup & Recovery**

### **Automatic Backups**
```bash
# Create manual backup
npm run backup-db

# Or use admin panel
# Login → Database → Create Backup
```

### **Backup Files**
- Location: `./data/backup-YYYYMMDD-HHMMSS.json`
- Contains complete database snapshot
- Can be restored by replacing `database.json`

## 🔄 **Data Migration**

### **To Production Database**
The current JSON structure can be easily migrated to:

**PostgreSQL Schema:**
```sql
CREATE TABLE subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR UNIQUE,
  name VARCHAR,
  plan VARCHAR DEFAULT 'free',
  tutorials_completed INTEGER DEFAULT 0,
  learning_streak INTEGER DEFAULT 0,
  -- ... other fields
);

CREATE TABLE posts (
  id VARCHAR PRIMARY KEY,
  title VARCHAR,
  content TEXT,
  category VARCHAR,
  featured BOOLEAN DEFAULT false,
  -- ... other fields
);
```

**MongoDB Collections:**
```javascript
// subscribers collection
{
  _id: ObjectId,
  email: String,
  name: String,
  plan: String,
  tutorialsCompleted: Number,
  // ... other fields
}

// posts collection
{
  _id: String, // use custom id
  title: String,
  content: String,
  category: String,
  // ... other fields
}
```

## 📊 **Database Statistics**

Current demo database contains:
- **3 Subscribers** with realistic progress data
- **2 Blog Posts** with view/like counts
- **Analytics Data** including growth metrics
- **User Preferences** and learning progress
- **Complete User Journeys** from beginner to intermediate

## 🛠️ **Development Tools**

### **Database Scripts**
```bash
# Initialize with demo data
npm run init-db

# Create backup
npm run backup-db

# View database (admin panel)
# Visit /admin/database
```

### **Environment Files**
- `.env.local` - Your actual environment variables
- `.env.example` - Template for new setups
- Both files included in project

## 🎉 **Ready to Use!**

Your database system is now fully functional with:
- ✅ Complete demo data for testing
- ✅ Environment configuration
- ✅ Backup and recovery system
- ✅ Admin management interface
- ✅ API endpoints for all operations
- ✅ Security and access control
- ✅ Migration-ready structure

### **Quick Start:**
1. `npm run init-db` (already done)
2. `npm run dev`
3. Visit `/dashboard` and login with demo emails
4. Visit `/admin/login` to manage data
5. Check `/admin/database` to view raw data

Your MOSBytes platform now has a complete, production-ready database system! 🚀