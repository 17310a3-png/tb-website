/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'obgobetnlecbmypvfnsq.supabase.co' },
    ],
  },
};

export default nextConfig;
