/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#df5475',
        'brand-hover': '#c63f62',
        'brand-dark': '#a83e5b',
        'pink-50': '#fff8fa',
        'pink-100': '#fdeff3',
        'pink-200': '#f7dce4',
        'pink-300': '#efbccb',
        'pink-400': '#e58ca5',
        'rose-muted': '#b9637c',
        footer: '#b75f79',
        'footer-dark': '#9e4b66',
        heading: '#35232a',
        text: '#6b5860',
        'text-muted': '#907e85',
        surface: '#fffafc',
        border: '#f1dfe5',
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Inter', 'Arial', 'sans-serif'],
      },
      container: {
        center: true,
        padding: 'clamp(16px, 4vw, 48px)',
        screens: {
          DEFAULT: '1240px',
        },
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '18px',
        'pill': '999px',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
      },
      zIndex: {
        'base': '0',
        'content': '10',
        'sticky': '100',
        'dropdown': '200',
        'overlay': '300',
        'modal': '400',
        'toast': '500',
      },
      keyframes: {
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'slide-down': 'slide-down 0.3s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.7s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'marquee': 'marquee 20s linear infinite',
      },
    },
  },
  plugins: [],
}