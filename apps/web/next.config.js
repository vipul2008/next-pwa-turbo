/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ["@repo/ui"],
};

// You may want to use a more robust revision to cache
// files more efficiently.
// A viable option is `git rev-parse HEAD`.
const revision = crypto.randomUUID();

module.exports = async () => {
	const withSerwist = (await import("@serwist/next")).default({
		cacheOnNavigation: true,
		swSrc: "src/app/sw.ts",
		swDest: "public/sw.js",
		additionalPrecacheEntries: [{ url: "/~offline", revision }],
	});
	return withSerwist(nextConfig);
};