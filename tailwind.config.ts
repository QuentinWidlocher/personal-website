import defaultTheme from "tailwindcss/defaultTheme"

export default {
  content: [
    './app/**/*.{tsx,ts,jsx,js}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Manrope', ...defaultTheme.fontFamily.sans],
        'mono': ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      dropShadow: {
        outline: [
          '1px 0px 0px black',
          '-1px 0px 0px black',
          '0px 1px 0px black',
          '0px -1px 0px black',
          '1px 0px 0px white',
          '-1px 0px 0px white',
          '0px 1px 0px white',
          '0px -1px 0px white',
        ]
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
