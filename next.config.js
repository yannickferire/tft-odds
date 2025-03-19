/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	compress: true,
	images: {
		unoptimized: true,
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
