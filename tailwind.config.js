module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Maison Neue'],
      },
      colors: {
        brand: {
          yellow: "#FFFCF1",
          blue: {
            100: "#E6F5FF",
            300: "#7EC4F6",
            DEFAULT: "#225A89",
            400: "#46A1CD",
            500: "#2C94C6",
            600: "#47a1cd"
          },
          red: "#E42727",
        }
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '17': 'repeat(17, minmax(0, 1fr))',
      }
    },
  },
  variants: {
    extend: {
      borderWidth: ["focus"]
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
