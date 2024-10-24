/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      boxShadow: {
        'neumorphism': '8px 8px 16px #bebebe, -8px -8px 16px #ffffff',
      },
    },
  },
  plugins: [],
}

