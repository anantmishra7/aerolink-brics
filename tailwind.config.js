/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brics: {
          bg: '#070D1E',
          card: '#0D1730',
          cardHover: '#132145',
          border: '#1E2F56',
          borderLight: '#2C4378',
          accent: '#06B6D4', // cyan
          teal: '#14B8A6',
          emerald: '#10B981',
          gold: '#F59E0B',
          alert: '#EF4444',
          subtext: '#94A3B8',
          heading: '#F1F5F9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'flow': 'flow 20s linear infinite',
      },
      keyframes: {
        flow: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
