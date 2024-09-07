/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // El protocolo es https
        hostname: 'oaidalleapiprodscus.blob.core.windows.net', // El dominio de OpenAI
        pathname: '/**', // Permitir todas las rutas bajo este dominio
      },
    ],
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
};

module.exports = nextConfig;
