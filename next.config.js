/** @type {import('next').NextConfig} */
module.exports = (phase, { defaultConfig }) => {
  const nextConfig = {
    trailingSlash: false,
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
    output: process.env.LOCAL === 'true' ? null : 'export',
    redirects: process.env.LOCAL === 'true' ? async () => {
      return [
        {
          source: '/',
          destination: '/box',
          permanent: false,
          basePath: false,
        }
      ];
    }: null,
  };

  return nextConfig;
};
