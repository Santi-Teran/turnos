/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#001022',
        'bluee': '#002848',
        'arena': '#F5F0DB',
        'light-gray': '#E6EFF5',
        'grayy': '#F5F7FA',
        'dark-gray': '#0e0e0e'
      },
    },
  },
  plugins: [],
};
