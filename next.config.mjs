/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "matmaster-profile-images.s3.us-east-2.amazonaws.com",
      },
      {
        hostname: "matmaster-event-images.s3.us-east-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
