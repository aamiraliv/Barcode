/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/**/*.{js,jsx,ts,tsx,html}',
  ],
  theme: {
    extend: {
      colors: {
        gradientStart: '#FFEFBA',
        gradientEnd: '#FFFFFF',
      },
      fontFamily:{
        customFont:['Custom'],
        Iceland:['Iceland'],
        Poppins:['Poppins']
      }
    },
  },
  plugins: [
  ],
}

