/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  typescript: {
    // TODO: デプロイ確認用なの削除する
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
