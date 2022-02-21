const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './app/**/*.{tsx,ts,jsx,js}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Manrope', ...defaultTheme.fontFamily.sans],
        'mono': ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
