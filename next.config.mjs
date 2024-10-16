/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["assets.aceternity.com"]
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
  
  export default nextConfig;