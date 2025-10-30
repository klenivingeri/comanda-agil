const MASTER = "MASTER";
const ADMIN = "ADMIN";
const MODERATOR = "MODERATOR";
const VIEWER = "VIEWER";

export const RULES = {
  MODERATOR: [MASTER, ADMIN, MODERATOR],
  ADMIN: [MASTER, ADMIN],
};
// Paleta base (sem repetições)
const BASE_CORES = [
  "#007BFF", // Azul vibrante
  "#28A745", // Verde
  "#DC3545", // Vermelho
  "#FFC107", // Amarelo
  "#6F42C1", // Roxo
  "#20C997", // Verde Água
  "#FD7E14", // Laranja
  "#17A2B8", // Ciano
  "#E83E8C", // Rosa
  "#6C757D", // Cinza
];

/**
 * Clareia uma cor em HEX.
 * @param {string} hex - Cor original.
 * @param {number} amount - Percentual de clareamento (0 a 1).
 */
function lightenColor(hex, amount) {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.floor((num >> 16) + (255 - (num >> 16)) * amount));
  const g = Math.min(255, Math.floor(((num >> 8) & 0x00ff) + (255 - ((num >> 8) & 0x00ff)) * amount));
  const b = Math.min(255, Math.floor((num & 0x0000ff) + (255 - (num & 0x0000ff)) * amount));
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
}

/**
 * Gera a paleta completa com tons mais claros nas repetições.
 * @param {number} total - Quantidade total desejada.
 */
export const generateCoresFixas = (total = 50) => {
  const cores = [];
  const repeatCount = Math.ceil(total / BASE_CORES.length);

  for (let i = 0; i < repeatCount; i++) {
    const lighten = i * 0.2; // quanto mais repete, mais claro
    const set = BASE_CORES.map(color => i === 0 ? color : lightenColor(color, lighten));
    cores.push(...set);
  }

  return cores.slice(0, total);
};

// Exemplo de uso
export const CORES_FIXAS = generateCoresFixas(50);