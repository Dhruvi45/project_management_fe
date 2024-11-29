/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Use "https" for `tailwindui.com` and `images.unsplash.com`
        hostname: "tailwindui.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "http", // Use "http" for local development
        hostname: "localhost",
        port: "3000", // Specify the port if needed
        pathname: "/assets/**",
      },
    ],
  },
  reactStrictMode: false, 
};

export default nextConfig;
