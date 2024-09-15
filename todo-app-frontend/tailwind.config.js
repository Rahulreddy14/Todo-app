module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // Ensure Tailwind applies to all your component files
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Montserrat', 'sans-serif'],  // Define your custom font
      },
      colors: {
        'custom-black': '#000000',
        'custom-red': '#FF0000',
        'custom-gray': '#F5F5F5',
      },
    },
  },
  plugins: [],
};
