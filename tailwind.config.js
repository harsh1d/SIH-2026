/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          dark: '#1E4D2B',       // Deep Forest Green
          primary: '#2D7A41',    // Botanical Green
          sage: '#4E9F5B',       // Sage Green
          soft: '#83B77C',       // Soft Leaf
          light: '#EAF4E8',      // Light Sage Tint
          bg: '#F6F9F5',         // Ultra Soft Page BG
        },
        earth: {
          soil: '#3D2E21',       // Dark Soil
          walnut: '#6E4F36',     // Walnut Brown
          terracotta: '#C07A46', // Terracotta Clay
          wheat: '#DA9C4B',      // Wheat / Mustard Gold
          cream: '#F9F6F0',      // Warm Cream
          sand: '#EFE7DA',       // Soft Sand
        },
        ai: {
          plum: '#4A154B',       // Deep Plum AI Accent
          purple: '#7B2CBF',     // Royal Aubergine
          mauve: '#9D4EDD',      // Mauve Violet
          light: '#F3E8FF',      // Soft Lavender Tint
          glow: 'rgba(123, 44, 191, 0.15)',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'agri': '0 4px 20px -2px rgba(30, 77, 43, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'ai': '0 4px 25px -2px rgba(74, 21, 75, 0.15), 0 2px 8px -1px rgba(123, 44, 191, 0.08)',
        'earth': '0 4px 20px -2px rgba(110, 79, 54, 0.10)',
        'floating': '0 12px 32px -4px rgba(30, 77, 43, 0.18)',
      },
      keyframes: {
        scan: {
          '0%, 100%': { top: '0%' },
          '50%': { top: '92%' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' },
        }
      },
      animation: {
        'scan': 'scan 2.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
