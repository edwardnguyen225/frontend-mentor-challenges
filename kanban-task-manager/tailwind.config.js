const headerHeights = {
  mobile: '64px',
  tablet: '80px',
  desktop: '96px',
};

const footerHeights = {
  mobile: '50px',
  tablet: '50px',
  desktop: '50px',
};

const marginHeights = {
  mobile: '24px',
  tablet: '24px',
  desktop: '24px',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    fontFamily: {
      sans: ['"Plus Jakarta Sans"'],
    },
    extend: {
      colors: {
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        'main-purple': '#635fc7',
        'main-purple-light': '#a8a4ff',
        black: '#000112',
        'very-dark-grey-black': '#20212c',
        'dark-grey': '#2b2c37',
        'lines-dark': '#3e3f4e',
        'medium-grey': '#828fa3',
        'lines-light': '#e4ebfa',
        'light-grey': '#f4f7fd',
        white: '#ffffff',
        red: '#ea5555',
        'red-hover': '#ff9898',
      },
      backgroundImage: {
        'new-column':
          'linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.50) 100%)',
        'new-column-hover':
          'linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.50) 100%)',

        'new-column-dark':
          'linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.13) 100%)',
        'new-column-dark-hover':
          'linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.13) 100%)',
      },

      /**
       * Screen width
       * - mobile: 320px
       * - tablet: 768px ~ 'md:'
       * - desktop: 1280px ~ 'xl:'
       */
      width: {
        'main-on-tablet': 'calc(100% - 260px)',
        'main-on-desktop': 'calc(100% - 300px)',
      },
      height: {
        'board-on-mobile': `calc(100vh - ${headerHeights.mobile} - ${marginHeights.mobile})`,
        'board-on-tablet': `calc(100vh - ${headerHeights.tablet} - ${marginHeights.tablet})`,
        'board-on-desktop': `calc(100vh - ${headerHeights.desktop} - ${marginHeights.desktop})`,

        'new-column-mobile': `calc(100vh - ${headerHeights.mobile} - ${marginHeights.mobile} - ${footerHeights.mobile})`,
        'new-column-tablet': `calc(100vh - ${headerHeights.tablet} - ${marginHeights.tablet} - ${footerHeights.tablet})`,
        'new-column-desktop': `calc(100vh - ${headerHeights.desktop} - ${marginHeights.desktop} - ${footerHeights.desktop})`,
      },
    },
  },
  plugins: [],
};
