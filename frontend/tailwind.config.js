export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FEF3C7',
        secondary: '#D1FAE5',
        accent: '#DBEAFE',
        yellow: { light: '#FEF3C7', DEFAULT: '#FCD34D', dark: '#F59E0B' },
        green: { light: '#D1FAE5', DEFAULT: '#34D399', dark: '#10B981' },
        blue: { light: '#DBEAFE', DEFAULT: '#60A5FA', dark: '#3B82F6' }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    }
  },
  plugins: []
};
