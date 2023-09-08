/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'tablet-max': {'max': '670px'},
      // => @media (min-width: 640px) { ... }
      
      'tablet-min': '670px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }

    },
  },
  plugins: [],
}

