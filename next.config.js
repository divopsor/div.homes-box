/** @type {import('next').NextConfig} */
module.exports = (phase, { defaultConfig }) => {
  const nextConfig = {
    output: 'export',
    // ...defaultConfig,
    reactStrictMode: true,
    swcMinify: true,
    basePath: "/box",
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
  };

  return nextConfig;
};
