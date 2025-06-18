const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  compress: true,
  swcMinify: true, // SWC를 활성화하여 빌드 최적화
  eslint: {
    ignoreDuringBuilds: true, // 빌드 시 ESLint 오류 무시
  },
  webpack(config, { webpack, isServer }) {
    const prod = process.env.NODE_ENV === 'production';

    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }

    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins: [
        ...config.plugins,
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
      ],
    };
  },
});
