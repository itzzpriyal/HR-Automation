/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#0f1117',
        panel: '#1a1d27',
        card: '#1e2130',
        border: '#2d3150',
        'text-primary': '#f1f5f9',
        'text-secondary': '#94a3b8',
        'accent-blue': '#3b82f6',
        'node-start': '#22c55e',
        'node-task': '#3b82f6',
        'node-approval': '#f59e0b',
        'node-automated': '#a855f7',
        'node-end': '#f43f5e',
      },
      animation: {
        'slide-in-right': 'slideInRight 0.25s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'stagger-in': 'staggerIn 0.3s ease-out forwards',
      },
      keyframes: {
        slideInRight: {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(-4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        staggerIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
