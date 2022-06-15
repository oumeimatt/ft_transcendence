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
        'myblue' : '#0A1544'
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
