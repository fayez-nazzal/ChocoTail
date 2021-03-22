module.exports = {
  purge: [`./src/**/*.{js, jsx, ts, tsx}`],
  darkMode: "media",
  theme: {
    fontFamily: {
      somar: ["Somar", "serif"],
      markazi: ["Markazi Text", "serif"],
    },
    colors: {
      "orange-bright": "#fadfba",
      orange: "#e98f0f",
      "red-dark": "#cc3e3a",
      swamp: `#afb881`,
      tussock: `#c1883f`,
      pink: `#a84064`,
      indian: `#c1b996`,
      black: `#000`,
      white: `#fff`,
    },
    extend: {
      height: theme => ({
        "18": "4.5rem"
      })
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
