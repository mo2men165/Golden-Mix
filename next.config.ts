import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { config } from 'process';

const nextConfig: NextConfig = {
  config: {
    turbo: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
