/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', 'moodiday.nyc3.digitaloceanspaces.com', 'image.mux.com'],
    },
    // env: {
    //     API_URL: process.env.API_URL,
    //     CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    // },
}

module.exports = nextConfig
