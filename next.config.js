/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['i.pinimg.com', 'utfs.io'],
        remotePatterns: [
            {
                protocol: 'https',
                port: '',
                hostname: 'i.pinimg.com',
            },
            {
                protocol: 'https',
                port: '',
                hostname: 'utfs.io',
            },
        ]
    }
}

module.exports = nextConfig
