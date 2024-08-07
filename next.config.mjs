import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants.js";

/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: false,
};

const nextConfigFunction = async (phase) => {
	if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
		const withPWA = (await import("@ducanh2912/next-pwa")).default({
			dest: "public",
			runtimeCaching: [
				{
					urlPattern: /^https:\/\/example.com\/.*$/,
					handler: "NetworkFirst",
					options: {
						cacheName: "example-cache",
						expiration: {
							maxEntries: 50,
							maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
						},
					},
				},
				{
					urlPattern: /\/api\/.*$/,
					handler: "NetworkFirst",
					method: "GET",
					options: {
						cacheName: "api-cache",
						expiration: {
							maxEntries: 50,
							maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
						},
						networkTimeoutSeconds: 10,
					},
				},
				{
					urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
					handler: "CacheFirst",
					options: {
						cacheName: "image-cache",
						expiration: {
							maxEntries: 50,
							maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
						},
					},
				},
			],
		});
		return withPWA(nextConfig);
	}
	return nextConfig;
};

export default nextConfigFunction;
