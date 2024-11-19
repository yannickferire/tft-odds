/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	compress: true,
	images: {
		domains: ["raw.communitydragon.org", "pbs.twimg.com"],
	},
};

module.exports = nextConfig;
