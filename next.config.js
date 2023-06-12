/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "izfokcthbvgcezxcusgh.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
