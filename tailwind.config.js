/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Added just in case
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A9B94', // Our BSR Seafoam Teal
      },
    },
  },
  plugins: [],
}