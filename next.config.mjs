/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // 光復店 2026-11 撤點：舊分店頁永久轉到竹北店（保留搜尋排名與外部連結）
  async redirects() {
    return [{ source: '/locations/guangfu', destination: '/locations/zhubei', permanent: true }];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'obgobetnlecbmypvfnsq.supabase.co' },
    ],
  },
};

export default nextConfig;
