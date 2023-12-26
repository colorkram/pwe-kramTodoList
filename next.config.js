// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    disable: process.env.NODE_ENV === "development",
    workboxOptions: {
      disableDevLogs: true,
    },
    // ... other options you like
  });
  
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    output: 'standalone',
    images: {
      domains: [
        "res.cloudinary.com",
        "cdn.discordapp.com",
        "lh3.googleusercontent.com",
        "www.pcclean.io",
        "192.168.1.88",
        "192.168.1.40",
        "localhost",
        "*",
        "api.travelmatch.biz",
        "ttd-accounting.s3.ap-southeast-1.amazonaws.com",
        "upload.wikimedia.org",
        "s3-symbol-logo.tradingview.com"
      ],
    }}
  
  module.exports = withPWA(nextConfig);
