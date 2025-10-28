const MASTER = "MASTER";
const ADMIN = "ADMIN";
const MODERATOR = "MODERATOR";
const VIEWER = "VIEWER";

export const RULES = {
  MODERATOR: [MASTER, ADMIN, MODERATOR],
  ADMIN: [MASTER, ADMIN],
};


export const CORES_FIXAS = [
  '#007BFF', // Azul vibrante
  '#28A745', // Verde
  '#DC3545', // Vermelho
  '#FFC107', // Amarelo (laranja)
  '#6F42C1', // Roxo
  '#20C997', // Verde Água
  '#FD7E14', // Laranja
  '#17A2B8', // Ciano
  '#E83E8C', // Rosa Choque
  '#6C757D', // Cinza Chumbo
];