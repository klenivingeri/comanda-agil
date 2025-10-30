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

const optionsColors = [
  { type: "btn-blue", name: "Azul" },
  { type: "btn-purple", name: "Roxo" },
  { type: "btn-green", name: "Verde" },
  { type: "btn-gray", name: "Cinza" },
  { type: "btn-orange", name: "Laranja" },
  { type: "btn-red", name: "Vermelho" },
];

export const buttonThemes = {
  'btn-purple': {
    "--button-default": "#9B59B6",
    "--button-hover": "#AF7AC5",     
    "--button-focus": "#8E44AD",     
    "--button-pressed": "#82589F",  
    "--button-disabled": "#D2B4DE", 
    "--button-progress": "#BB8FCE", 
  },
  'btn-green': {
    "--button-default": "#2ECC71",  // Verde Esmeralda
    "--button-hover": "#58D683",
    "--button-focus": "#27AE60",
    "--button-pressed": "#28B463",
    "--button-disabled": "#A9DFBF",
    "--button-progress": "#52BE80",
  },
  'btn-gray': {
    "--button-default": "#95A5A6",  // Cinza neutro
    "--button-hover": "#AABEB2",
    "--button-focus": "#7F8C8D",
    "--button-pressed": "#88999A",
    "--button-disabled": "#D5DBDB",
    "--button-progress": "#BFC9CA",
  },
  'btn-blue': {
    "--button-default": "#3498DB",
    "--button-hover": "#5DADE2",
    "--button-focus": "#2E86C1",
    "--button-pressed": "#2874A6",
    "--button-disabled": "#A9CCE3",
    "--button-progress": "#5DADE2",
  },
  'btn-blue': {
    "--button-default": "#E74C3C",  // Vermelho Cereja
    "--button-hover": "#EC7063",
    "--button-focus": "#C0392B",
    "--button-pressed": "#CD4235",
    "--button-disabled": "#FADBD8",
    "--button-progress": "#E56357",
  },
  'btn-orange': {
    "--button-default": "#FF9900",
    "--button-hover": "#FFB84D",
    "--button-focus": "#CC7A00",
    "--button-pressed": "#D98500",
    "--button-disabled": "#FFDDAA",
    "--button-progress": "#FFC066",
  },
};