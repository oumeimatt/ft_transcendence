module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'screen-4' : '40vh'
      },
      colors: {
        'myblue' : '#0A1544',
        'zho': '#5B68B3'
      },
      maxHeight: {
        '1/3': '10vh',
        '2/3': '30vh',
        '2/5': '20vh',
        '4/5': '80vh'
      },
      height: {
        'small': '5vh',
        'screen': '95vh'
      }
    }
  },
  plugins: [],
  variants: {
      extend: {},
  },
  plugins: [
      require('ps-scrollbar-tailwind'),
  ],
}
