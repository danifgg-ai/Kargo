import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        kargo: {
          yellow: '#FFD100',
          black: '#0A0A0A',
          dark: '#111111',
          surface: '#1A1A1A',
          border: '#2A2A2A',
          steel: '#3A3A3A',
          text: '#F5F5F5',
          muted: '#888888',
          green: '#22C55E',
          red: '#EF4444',
          blue: '#3B82F6',
          orange: '#F97316',
        },
      },
      fontFamily: {
        display: ['Barlow Condensed', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        'kargo': '0 20px 60px rgba(255, 209, 0, 0.15)',
        'kargo-sm': '0 4px 20px rgba(255, 209, 0, 0.1)',
        'kargo-lg': '0 30px 80px rgba(255, 209, 0, 0.2)',
      },
      animation: {
        'pulse-green': 'pulse-green 2s ease-in-out infinite',
        'pulse-red': 'pulse-red 2s ease-in-out infinite',
        'pulse-yellow': 'pulse-yellow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-green': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(34, 197, 94, 0)' },
        },
        'pulse-red': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(239, 68, 68, 0)' },
        },
        'pulse-yellow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 209, 0, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(255, 209, 0, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
