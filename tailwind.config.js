// tailwind.config.js
import {nextui} from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/renderer/**/*.{html,js}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	darkMode: "class",
	plugins: [nextui({
		defaultTheme : 'dark',
		addCommonColors : true
	})],
}

