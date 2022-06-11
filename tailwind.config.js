module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {}
  },
  plugins: [],
  variants: {
      extend: {},
  },
  plugins: [
      require('ps-scrollbar-tailwind'),
  ],
}
