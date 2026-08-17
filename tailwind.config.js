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
          dark: '#143D20',       // Deep Forest Green (Gov Portal Style)
          primary: '#2D7A41',    // Botanical Green
          sage: '#4E9F5B',       // Sage Green
          soft: '#83B77C',       // Soft Leaf
          light: '#EAF4E8',      // Light Sage Tint
          bg: '#F4F7F3',         // Ultra Soft Warm Page BG
        },
        earth: {
          soil: '#3D2E21',       // Dark Soil Brown
          walnut: '#5C4033',     // Walnut Brown
          terracotta: '#C07A46', // Terracotta Clay / Accent
          wheat: '#DA9C4B',      // Wheat / Mustard Gold
          cream: '#FAF6F0',      // Warm Cream
          sand: '#EFE7DA',       // Soft Sand
        },
        ai: {
          plum: '#3B123D',       // Deep Plum AI Accent
          purple: '#6B2D5C',     // Muted Royal Purple
          mauve: '#8B5CF6',      // Soft Violet
          light: '#F3E8FF',      // Soft Lavender Tint
          glow: 'rgba(107, 45, 92, 0.18)',
        },
        gov: {
          gold: '#D4AF37',       // Wheat Gold Emblem Accent
          blue: '#1E3A8A',       // Subtle Institutional Accent
          green: '#0F391B',      // Official Gov Forest
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
        'agri': '0 4px 20px -2px rgba(20, 61, 32, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'ai': '0 4px 25px -2px rgba(59, 18, 61, 0.15), 0 2px 8px -1px rgba(107, 45, 92, 0.08)',
        'earth': '0 4px 20px -2px rgba(92, 64, 51, 0.10)',
        'floating': '0 12px 32px -4px rgba(20, 61, 32, 0.18)',
        'gov': '0 2px 10px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.03)',
      },
      keyframes: {
        scan: {
          '0%, 100%': { top: '0%' },
          '50%': { top: '92%' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' },
        },
        floatSubtle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      },
      animation: {
        'scan': 'scan 2.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float-subtle': 'floatSubtle 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
