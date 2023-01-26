/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	trailingSlash: true,
	experimental: {
		images: {
			unoptimized: true,
			loader: 'custom',
		},
	},
};
module.exports = nextConfig;
