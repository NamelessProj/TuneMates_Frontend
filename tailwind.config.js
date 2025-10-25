const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        'app': '0 minmax(60px, auto) 1fr 22px',
      },
      colors: {
        primary: {
          green: '#1ED760',
          white: '#FFFFFF',
          black: '#121212',
        },
      },
    },
  },
  plugins: [],
});