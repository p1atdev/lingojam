/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["vod-thumb-ww-live.akamaized.net", "ichef.bbc.co.uk", "ichef.bbci.co.uk"],
    },
}

module.exports = nextConfig
