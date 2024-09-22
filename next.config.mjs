/** @type {import('next').NextConfig} */
const nextConfig = {  webpack: (config, { dev }) => {
    if (dev) {
        config.devtool = false;  // Deshabilitar los source maps en desarrollo
    }
    return config;
},};

export default nextConfig;
