/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "hsl(172, 100%, 30%)",
      gray:"rgb(203, 213, 225)",
      white: "hsl(0, 0%, 100%)",
      "gray-dark":"#666",
      success: "#44b774",
      error: "#ea5555",
    }
  
  },
  plugins: [],
}