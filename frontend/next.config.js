/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    console.log("Rewrites called");
    return [
      {
        source: "/api",
        destination: "http://localhost:3001/api",
      },
    ];
  },
};

module.exports = nextConfig;
