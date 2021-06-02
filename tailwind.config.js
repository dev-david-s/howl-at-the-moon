module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background_mood: {
          dark: "#2b1055",
          light: "#7597de"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
