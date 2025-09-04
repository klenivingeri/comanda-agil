import mongoose from "mongoose";

const MONGO_URI = process.env.DB_CONNECT_STRING;

if (!MONGO_URI) {
  console.log("A variavel de ambiente MONGO_URI não está Definida");
}

let cache = global?.mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGO_URI);

    mongoose.connection.on("error", (erro) =>
      console.error("Error de conexão", erro)
    );
    mongoose.connection.once("open", () =>
      console.log("Conexão feita com sucesso")
    );
  }
};
