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
        'myblue' : 'rgb(28, 34, 53)',
        'zho': '#5B68B3'
      },
      maxHeight: {
        '1/3': '10vh',
        '2/3': '30vh',
        '2/5': '20vh',
        '4/5': '80vh',
        '4/6': '66.666667%',
        '5/6': '90vh'
        
      },
      height: {
        'small': '6vh',
        'screen': '95vh'
      },
      padding: {
        'small': '2vh',
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
