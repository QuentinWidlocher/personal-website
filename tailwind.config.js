const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './app/**/*.{tsx,ts,jsx,js}',
  ],
  theme: {
    extend: {
      fontFamily: { 'sans': ['Manrope', ...defaultTheme.fontFamily.sans], },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
