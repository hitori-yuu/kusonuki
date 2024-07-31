/** @type {import('next').NextConfig} */
import withPWA from "@ducanh2912/next-pwa";

const nextConfig = withPWA({
	pwa: {
		dest: "public",
		register: true,
		skipWaiting: true,
	},
	reactStrinctMode: true,
});

export default nextConfig;
