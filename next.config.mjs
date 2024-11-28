/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['haedal-image-storage.s3.ap-northeast-2.amazonaws.com'],
  },
  async rewrites() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
      throw new Error("환경 변수를 설정해주세요.");
    }

    return [
      {
        source: '/api/:path*',
        destination: `${baseUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
