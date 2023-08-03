/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api",
        destination: "http://localhost:3001/api",
      },
    ];
  },
};

module.exports = nextConfig;
