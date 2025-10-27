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
        // New "Simplify to Solve" Color Palette
        'deep-navy': '#0B132B',      // Foundation / background tone
        'steel-gray': '#1C2541',     // Content background
        'frost-blue': '#5BC0BE',     // Highlight / accent tone
        'cloud-white': '#F8FAFC',    // Text area / spacing balance
        'graphite': '#2E3440',       // Secondary text / subtle lines
        
        // Extended palette for depth and variations
        'deep-navy-light': '#1A2332', // Lighter navy for sections
        'steel-light': '#2A3441',     // Lighter steel for borders
        'frost-light': '#7DCDCB',     // Lighter frost blue for hover states
        'frost-dark': '#4A9B99',      // Darker frost blue for active states
        'cloud-soft': '#F1F5F9',     // Softer cloud white
        'graphite-light': '#9CA3AF',  // Much lighter graphite for better readability
        'text-secondary': '#D1D5DB',  // Light gray for secondary text
        'text-muted': '#6B7280',      // Muted text for less important content
        
        // Legacy support (mapped to new colors)
        primary: '#0B132B',
        accent: '#5BC0BE',
        light: '#F8FAFC',
        dark: '#1C2541',
      },
      fontFamily: {
        'heading': ['Manrope', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'Menlo', 'Monaco', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.6' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.7' }],
        'lg': ['1.125rem', { lineHeight: '1.7' }],
        'xl': ['1.25rem', { lineHeight: '1.6' }],
        '2xl': ['1.5rem', { lineHeight: '1.5' }],
        '3xl': ['1.875rem', { lineHeight: '1.4' }],
        '4xl': ['2.25rem', { lineHeight: '1.3' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'gentle-float': 'gentleFloat 8s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gentleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      boxShadow: {
        'paper': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'gentle': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'sky-glow': '0 0 20px rgba(0, 174, 239, 0.3)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
      },
    },
  },
  plugins: [],
}