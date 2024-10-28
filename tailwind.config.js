/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
	content: ["./src/**/*.{js,jsx,ts,tsx}"], // Adjust if needed
	theme: {
		extend: {
			colors: {
				primary: '#1a1a1a', // Example color, adjust based on design
			},
		},
	},
  plugins: [require("tailwindcss-animate")],
}

