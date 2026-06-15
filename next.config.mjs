/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'obgobetnlecbmypvfnsq.supabase.co' },
    ],
  },
};

export default nextConfig;
