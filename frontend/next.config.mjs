/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "picsum.photos" },
      { hostname: "source.unsplash.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "media.istockphoto.com" },
      { hostname: "play-lh.googleusercontent.com" },
      { hostname: "localhost" },
      { hostname: "127.0.0.1" },
    ],
  },
  webpack: (config) => {
    config.snapshot = {
      ...(config.snapshot || {}),
      managedPaths: [/^(.+?[\\/]node_modules[\\/])((?!next).)*$/],
    };
    return config;
  },
};

export default nextConfig;
