/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/news",
        destination: "http://localhost:3001/",
      },
    ];
  },
};

module.exports = nextConfig;
