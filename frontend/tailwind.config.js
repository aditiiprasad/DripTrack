/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'shrikhand': ['Shrikhand', 'cursive'],
        'work-sans': ['Work Sans', 'sans-serif'],
        
      },
      colors: {
        'custom-purple': '#7d5bb0',
        'custom-pink': '#dc6fe8',
        'custom-blue': '#6fbae8'
      },
    
    },
  },
  plugins: [
    require('tailwindcss-textshadow'), // If you want to use text shadow plugin
  ],
}