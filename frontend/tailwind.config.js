/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: '1.5rem',
          lg: '2.5rem',
        },
      },
      colors: {
        primary: {
          DEFAULT: '#003B7A',
          light: '#0052A3',
          dark: '#002952',
        },
        secondary: {
          DEFAULT: '#FDB913',
          light: '#FFCA3A',
          dark: '#E5A000',
        },
        accent: {
          DEFAULT: '#82bb08',
          light: '#9ed321',
          dark: '#6a9906',
        },
        background: '#FFFFFF',
        surface: '#F5F5F5',
        error: '#FF3B30',
        success: '#34C759',
        warning: '#FF9500',
      },
      fontFamily: {
        sans: ['Montserrat', 'Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};