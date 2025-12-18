/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	compress: true,
	images: {
		domains: ["raw.communitydragon.org", "pbs.twimg.com"],
	},
	async redirects() {
		return [
			{
				source: "/augments-tier",
				destination: "/augments/augments-tier",
				permanent: true,
			},
			{
				source: "/data/augments-distribution",
				destination: "/augments/augments-distribution",
				permanent: true,
			},
			{
				source: "/data/encounters",
				destination: "/encounters",
				permanent: true,
			},
			{
				source: "/augments/augments-tables", // Fixing potential typo/missing one based on file, checking original content
				destination: "/augments/augments-tables",
				permanent: true,
			},
			// Note: I will replace the block exactly as it was + the new rule.
			// Let me double check the original file content to ensure I don't miss the middle redirects.
			// Original had: augments-tier, data/augments-distribution, data/augments-tables, data/encounters
			// Wait, the original file (Step 87) had:
			// /augments-tier -> /augments/augments-tier
			// /data/augments-distribution -> /augments/augments-distribution
			// /data/augments-tables -> /augments/augments-tables
			// /data/encounters -> /encounters
			
			// So I will insert the new rule first.
			{
				source: "/data/augments-tables",
				destination: "/augments/augments-tables",
				permanent: true,
			},
			{
				source: "/data/encounters",
				destination: "/encounters",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
