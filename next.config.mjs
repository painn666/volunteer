/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "volunteer-backend-vxxe.onrender.com",
      },
    ],
  },
};

export default nextConfig;
