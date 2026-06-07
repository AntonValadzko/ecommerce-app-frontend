import type { NextConfig } from 'next';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseConfigEnv } from './src/lib/env';

const { API_URL: apiUrl } = parseConfigEnv();
const frontendRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: frontendRoot,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${apiUrl}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
