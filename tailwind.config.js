module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'screen-4' : '33vh'
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
