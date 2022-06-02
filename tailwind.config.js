module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'pong': "url('src/assets/bg1.jpg')"
      }
    }
  },
  plugins: [],
}
