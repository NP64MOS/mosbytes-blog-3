# MOSBytes - AI for Everyone

A modern, interactive web project built with Next.js, TailwindCSS, and Framer Motion featuring advanced animations and dark mode support.

## ✨ Features

### Core Features
- **Landing Page**: Clean, futuristic design with animated elements
- **Blog Page**: Interactive blog with search and filtering
- **Dark Mode**: System preference detection with manual toggle
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Meta tags, Open Graph, and semantic HTML

### Advanced Features
- **Particle Background**: Canvas-based animated particle system
- **Smooth Animations**: Framer Motion for page transitions and interactions
- **Animated Counters**: Number animations with easing effects
- **Interactive Search**: Real-time blog post filtering
- **Glassmorphism UI**: Modern backdrop blur effects
- **Error Boundaries**: Graceful error handling

### Technical Stack
- **Next.js 14.2.32**: Latest stable version with security fixes
- **React 18**: Modern React with concurrent features
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Production-ready motion library
- **React Intersection Observer**: Scroll-triggered animations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone or download the project files**

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── components/
│   ├── Layout.js              # Main layout with navigation
│   ├── ThemeToggle.js         # Dark/light mode toggle
│   ├── ParticleBackground.js  # Animated particle system
│   ├── AnimatedCounter.js     # Number animation component
│   ├── ErrorBoundary.js       # Error handling component
│   └── Loading.js             # Loading state component
├── pages/
│   ├── _app.js               # Next.js app wrapper with error boundary
│   ├── index.js              # Landing page with animations
│   └── blog.js               # Interactive blog page
├── styles/
│   └── globals.css           # Global styles and utilities
├── public/
│   └── favicon.svg           # Custom gradient favicon
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind configuration with custom animations
├── postcss.config.js         # PostCSS configuration
└── next.config.js            # Next.js configuration
```

## 🎨 Design System

### Colors
- **Primary**: `#1a1a2e` (Dark navy)
- **Accent**: `#16213e` (Darker navy)
- **Neon**: `#00f5ff` (Cyan)
- **Neon Purple**: `#bf00ff` (Magenta)
- **Light Background**: `#f8fafc`

### Animations
- **Float**: Subtle floating animation for cards
- **Glow**: Pulsing glow effect for interactive elements
- **Slide Up**: Entrance animation for content
- **Fade In**: Smooth opacity transitions

### Typography
- **Font**: System font stack (Tailwind default)
- **Gradient Text**: Neon cyan to purple gradient
- **Responsive Sizing**: Mobile-first typography scale

## 🛠 Customization Guide

### Adding New Blog Posts
Edit `pages/blog.js` and add to the `blogPosts` array:

```javascript
{
  id: 6,
  title: "Your New Post Title",
  description: "Post description...",
  date: "January 1, 2025",
  readTime: "5 min read",
  category: "tutorial", // beginner, tutorial, advanced, tools
  featured: false
}
```

### Modifying Colors
Update `tailwind.config.js`:

```javascript
colors: {
  primary: '#your-color',
  neon: '#your-neon-color',
  // ... other colors
}
```

### Customizing Animations
Add new animations in `tailwind.config.js`:

```javascript
animation: {
  'your-animation': 'yourKeyframe 2s ease-in-out infinite',
},
keyframes: {
  yourKeyframe: {
    '0%': { /* start state */ },
    '100%': { /* end state */ },
  }
}
```

### Particle System Settings
Modify `components/ParticleBackground.js`:

```javascript
const particleCount = 50 // Number of particles
const connectionDistance = 100 // Connection line distance
```

## 🔧 Performance Optimizations

- **SSR Safe**: All components handle server-side rendering
- **Lazy Loading**: Animations trigger on scroll
- **Optimized Bundle**: Tree-shaking and code splitting
- **Minimal Dependencies**: Only essential packages included
- **Error Boundaries**: Prevent crashes from component errors

## 🌙 Dark Mode Implementation

The theme system:
- Detects system preference automatically
- Persists user choice in localStorage
- Smooth transitions between themes
- Hydration-safe implementation

## 📱 Responsive Design

- **Mobile First**: Designed for mobile, enhanced for desktop
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly**: Appropriate touch targets and interactions
- **Performance**: Optimized for all device types

## 🚨 Troubleshooting

### Common Issues

1. **Hydration Errors**: Components use `mounted` state to prevent SSR mismatches
2. **Animation Performance**: Animations use `transform` and `opacity` for GPU acceleration
3. **Build Errors**: All dependencies are compatible with Next.js 14

### Development Tips

- Use `npm run build` to test production builds locally
- Check browser console for any runtime errors
- Ensure all imports are correctly spelled and exist

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!