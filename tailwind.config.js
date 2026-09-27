/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          void: '#03050c',
          dark: '#060a17',
          surface: '#0b1127',
          card: 'rgba(15, 23, 42, 0.75)',
          border: 'rgba(56, 189, 248, 0.2)',
          'border-active': 'rgba(56, 189, 248, 0.5)',
          glow: '#38bdf8',
          nebula: '#818cf8',
          starlight: '#f8fafc',
          pulsar: '#f43f5e',
          solar: '#f59e0b',
          aurora: '#10b981',
          warp: '#8b5cf6',
          cyan: '#06b6d4'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'cosmic-glow': '0 0 25px -5px rgba(56, 189, 248, 0.4)',
        'pulsar-glow': '0 0 25px -5px rgba(244, 63, 94, 0.5)',
        'solar-glow': '0 0 25px -5px rgba(245, 158, 11, 0.5)',
        'warp-glow': '0 0 30px -5px rgba(139, 92, 246, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 30s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
}
