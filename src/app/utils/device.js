/**
 * Verifica se o navegador suporta eventos de toque.
 * Esta é a forma mais confiável de verificar a interação em dispositivos móveis/tablets.
 * * @returns {boolean} True se o dispositivo for touch (mobile/tablet).
 */
export const isTouchDevice = () => {
  // Retorna false no servidor (Next.js SSR) para evitar erros
  if (typeof window === "undefined") {
    return false;
  }

  // Verifica a presença de 'ontouchstart' (método antigo)
  // OU se o navegador reporta mais de zero pontos de toque (método moderno)
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

/**
 * Verifica se o dispositivo NÃO é touch (geralmente é desktop).
 * * @returns {boolean} True se o dispositivo for desktop (não-touch).
 */
export const isDesktopDevice = () => {
  return !isTouchDevice();
};
