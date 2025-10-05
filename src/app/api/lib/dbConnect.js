import mongoose from "mongoose";

const MONGO_URI = process.env.DB_CONNECT_STRING;
const show_log = process.env.SHOW_LOG === "true";

if (!MONGO_URI && show_log) {
  console.error(
    "⚠️ A variável de ambiente DB_CONNECT_STRING não está definida!"
  );
}

// cache global para serverless
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
      maxPoolSize: 20, // manter mesmo valor da connection string
    });

    mongoose.connection.on("error", (err) => {
      if (show_log) console.error("❌ Erro de conexão MongoDB:", err);
    });

    mongoose.connection.once("open", () => {
      if (show_log) console.log("✅ Conexão MongoDB estabelecida com sucesso");
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
