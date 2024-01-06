/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: "standalone",
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve = {
				...(config.resolve || {}),
				fallback: {
					...(config.resolve.fallback || {}),
					net: false,
					tls: false,
				},
			};
		}
		return config;
	},
};

module.exports = nextConfig;
