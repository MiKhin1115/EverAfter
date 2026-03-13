/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        title: ['Playfair Display', 'Georgia', 'serif'],
        poppins: ['Poppins', 'Manrope', 'sans-serif'],
      },
      colors: {
        kbzBlue: '#0D5CAB',
        kbzSoftBlue: '#E8F1FB',
        kbzGold: '#F4C430',
        kbzRose: '#F6C1CF',
        kbzBg: '#F5F7FA',
      },
      boxShadow: {
        glass: '0 10px 35px rgba(13, 92, 171, 0.14)',
      },
    },
  },
  plugins: [],
}
