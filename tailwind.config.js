/**
 * LEGACY — superseded by Tailwind CSS v4.
 * All theme tokens (colors, fonts, animations, keyframes) have been moved to
 * the @theme block in index.css.  Content scanning is now automatic in v4.
 * This file is kept for reference only and is NOT loaded by the build.
 */
export default {
  content: [
    './index.html',
    './*.tsx',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './admin/**/*.{ts,tsx}',
    './ui/**/*.{ts,tsx}',
    './context/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        'brand-blue':       '#1a4b7c',
        'brand-sky':        '#3a6fa8',
        'brand-dark':       '#1C2B3A',
        'brand-light':      '#e8eef6',
        'brand-gold':       '#fdb813',
        'brand-gold-light': '#fec740',
        'brand-navy':       '#1a4b7c',
        'nova-white':       '#F8FAFC',
        'brand-navylight':  '#dce6f4',
        'brand-goldlight':  '#fffbee',
      },
      animation: {
        'scroll-up':      'scroll-up 10s linear infinite',
        'fade-in-up':     'fadeInUp 0.6s ease-out forwards',
        'fade-in':        'fadeIn 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'counter-up':     'counterUp 0.4s ease-out forwards',
        'marquee':        'marquee 30s linear infinite',
      },
      keyframes: {
        'scroll-up': {
          '0%':   { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        counterUp: {
          '0%':   { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

