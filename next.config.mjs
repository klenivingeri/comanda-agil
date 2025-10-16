/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["http://192.168.0.23:3000", "http://localhost:3000"],
  images: {
    // 💡 Adicione o domínio da imagem aqui
    domains: ["thumbs.dreamstime.com"],
  },
};

export default nextConfig;
