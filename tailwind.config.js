/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ethereum': '#627EEA',
        'binance': '#F3BA2F',
        'avalanche': '#E84142',
        'polygon': '#8247E5',
        'layerzero': '#6C5CE7',
        'void': '#111111',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'title-to-top': 'moveToTop 1s ease-out forwards',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.03)' },
        },
        'head-tilt': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(15deg)' },
        },
        'arm-wave': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        'explain-arms': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(15deg)' },
        },
        'leg-walk': {
          '0%, 100%': { transform: 'rotate(12deg)' },
          '50%': { transform: 'rotate(25deg)' },
        },
        jump: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glasses-glint': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        think: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(8deg)' },
        },
        scaleIn: {
          from: { transform: 'scale(0)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          from: { transform: 'scale(1)', opacity: '1' },
          to: { transform: 'scale(0.8)', opacity: '0' },
        },
        moveToTop: {
          from: { 
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          },
          to: { 
            top: '4rem',
            left: '50%',
            transform: 'translateX(-50%)'
          }
        },
      }
    },
  },
  plugins: [],
}
