module.exports = {
  purge: [
    './src/**/*.vue',
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blank: {
          DEFAULT: 'transparent',
        },
        positive: {
          900: 'var(--positive-900)',
          700: 'var(--positive-700)',
          600: 'var(--positive-600)',
          500: 'var(--positive-500)',
          400: 'var(--positive-400)',

          DEFAULT: 'var(--positive-600)',
        },
        negative: {
          900: 'var(--negative-900)',
          800: 'var(--negative-800)',
          600: 'var(--negative-600)',
          500: 'var(--negative-500)',

          DEFAULT: 'var(--negative-600)',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
