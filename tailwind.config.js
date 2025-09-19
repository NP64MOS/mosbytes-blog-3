/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Deep navy black backgrounds with dark blue gradients
        'navy-black': '#0a0e1a',
        'navy-900': '#0f1419',
        'navy-800': '#1a1f2e',
        'navy-700': '#1e2532',
        'navy-600': '#252b3a',
        'deep-navy': '#0c1220',
        'dark-blue': '#1e293b',
        
        // Glowing blue accent (#2563EB)
        'glow-blue': '#2563eb',
        'glow-blue-light': '#3b82f6',
        'glow-blue-dark': '#1d4ed8',
        'blue-glow': '#2563eb',
        
        // Warm amber accent (#F59E0B)
        'warm-amber': '#f59e0b',
        'amber-glow': '#fbbf24',
        'amber-subtle': '#f3a847',
        
        // Legacy colors (updated for new theme)
        primary: '#2563eb',
        accent: '#f59e0b',
        light: '#f8fafc',
        neon: '#2563eb',
        'neon-purple': '#f59e0b',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-blue': 'glow-blue 3s ease-in-out infinite alternate',
        'glow-amber': 'glow-amber 2.5s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(37, 99, 235, 0.4)' },
          '100%': { boxShadow: '0 0 30px rgba(37, 99, 235, 0.7)' },
        },
        'glow-blue': {
          '0%': { boxShadow: '0 0 20px rgba(37, 99, 235, 0.4)' },
          '100%': { boxShadow: '0 0 40px rgba(37, 99, 235, 0.8)' },
        },
        'glow-amber': {
          '0%': { boxShadow: '0 0 15px rgba(245, 158, 11, 0.3)' },
          '100%': { boxShadow: '0 0 25px rgba(245, 158, 11, 0.6)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}