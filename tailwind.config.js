module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#FFFCF1",
          blue: {
            100: "#E6F5FF",
            300: "#7EC4F6",
            DEFAULT: "#225A89",
            500: "#2C94C6",
          },
          red: "#E42727",
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
