/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'white': '#fff',
        'black': '#000',
        'blue': '#1fb6ff',
        'purple': '#7e5bef',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': '#13ce66',
        'yellow': '#ffc82c',
        'gray-dark': '#273444',
        'gray': '#8492a6',
        'gray-light': '#d3dce6',
        'black-200': 'rgba(0, 0, 0, 0.2)',
        'black-500': 'rgba(0, 0, 0, 0.5)',
        'transparent': 'transparent',
        primary: 'var(--default-btn-bg)',
      }
    }

  },
  variants: {
    extend: {},
  },
  plugins: [],
}
