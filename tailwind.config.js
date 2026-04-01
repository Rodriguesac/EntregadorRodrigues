/** @type {import('tailwindcss').Config} */ 
export default { 
  darkMode: 'class', // <-- SE NÃO TIVER ISSO, O BOTÃO NÃO FUNCIONA
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], 
  theme: { 
    extend: {}, 
  }, 
  plugins: [], 
}