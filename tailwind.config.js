const {
	default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	safelist: [
		"fill-crema",
		"fill-midnight",
		"fill-silver",
		"fill-gold",
		"fill-neutral-400",
		"border-midnight",
		"border-bronze",
		"border-silver",
		"border-gold",
		"border-bronze/30",
		"border-silver/30",
		"border-gold/30",
		"bg-bronze",
		"bg-silver",
		"bg-gold",
		"bg-bronze/10",
		"bg-silver/10",
		"bg-gold/10",
		"text-bronze",
		"text-silver",
		"text-gold",
		"border-1cost",
		"border-2cost",
		"border-3cost",
		"border-4cost",
		"border-5cost",
		"border-1cost/50",
		"border-2cost/50",
		"border-3cost/50",
		"border-4cost/50",
		"border-5cost/50",
		"bg-1cost",
		"bg-2cost",
		"bg-3cost",
		"bg-4cost",
		"bg-5cost",
		"bg-s",
		"bg-a",
		"bg-b",
		"text-1cost",
		"text-2cost",
		"text-3cost",
		"text-4cost",
		"text-5cost",
		"text-1cost/50",
		"text-2cost/50",
		"text-3cost/50",
		"text-4cost/50",
		"text-5cost/50",
		"bg-3cost",
		"w-2.5",
		"w-3",
		"w-4",
		"opacity-20",
		"focus:ring-silver/[.30]",
		"focus:ring-gold/[.30]",
		"focus:ring-prismatic/[.30]",
	],
	theme: {
		screens: {
			sm: "600px",
			md: "820px",
			lg: "1110px",
			xl: "1280px",
		},
		container: {
			center: "true",
		},
		extend: {
			colors: {
				midnight: "#041C32",
				earlynight: "#04293A",
				midday: "#064663",
				morning: "#ECB365",
				crema: "#ffffd2",
				bronze: "#9f561b",
				silver: "#b5cbde",
				gold: "#f9be0a",
				"1cost": "#9f9a89",
				"2cost": "#39b65a",
				"3cost": "#2875be",
				"4cost": "#aa09a4",
				"5cost": "#d78e00",
				"6cost": "#f9be0a",
				support: "#39b65a",
				carry: "#8b52e9",
				s: "rgb(255, 127, 127)",
				a: "rgb(255, 223, 127)",
				b: "rgb(127, 255, 127)",
			},
			animation: {
				aurora: "aurora 60s linear infinite",
			},
			keyframes: {
				aurora: {
					from: {
						backgroundPosition: "50% 50%, 50% 50%",
					},
					to: {
						backgroundPosition: "350% 50%, 350% 50%",
					},
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [addVariablesForColors, require("tailwindcss-animate")],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		":root": newVars,
	});
}
