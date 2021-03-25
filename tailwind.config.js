module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Maison Neue'],
        'navbar': ['Arial', 'Helvetica', 'sans-serif'],
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
        },
        cal: {
          box: "#F8F8F8",
          avail: "#2C94C6",
          "non-avail": "#BDBDBD",
        }
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '17': 'repeat(17, minmax(0, 1fr))',
        '27': 'repeat(27, minmax(0, 1fr))',
        '28': 'repeat(28, minmax(0, 1fr))',
        '29': 'repeat(29, minmax(0, 1fr))',
        '30': 'repeat(30, minmax(0, 1fr))',
        '31': 'repeat(31, minmax(0, 1fr))',
        '32': 'repeat(32, minmax(0, 1fr))',
      },
      height: {
        640: '640px'
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
