const MAX_HEIGHT = 200; 

export const resizeImage = (file, maxHeight = MAX_HEIGHT) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // 1. Carrega o arquivo
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const originalWidth = img.width;
        const originalHeight = img.height;
        let newWidth = originalWidth;
        let newHeight = originalHeight;

        // 2. Calcula as novas dimensões mantendo a proporção
        if (originalHeight > maxHeight) {
          // A altura excede o máximo, redimensionar
          newHeight = maxHeight;
          newWidth = (originalWidth / originalHeight) * newHeight;
        }
        
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        const ctx = canvas.getContext('2d');
        
        // 3. Desenha a imagem no Canvas com o novo tamanho
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // 4. Exporta para um novo arquivo (Blob/File) com qualidade reduzida
        // 'image/jpeg', 0.8 é o fator de qualidade (0.0 a 1.0)
        canvas.toBlob((blob) => {
          if (!blob) {
            return reject(new Error("Falha ao criar Blob a partir do Canvas."));
          }
          // Cria um novo objeto File para substituir o original
          const newFile = new File([blob], file.name, {
            type: 'image/jpeg', // Você pode forçar um formato para maior compressão
            lastModified: Date.now(),
          });
          resolve(newFile);
        }, 'image/jpeg', 0.8); // <-- Ajuste aqui o formato e a QUALIDADE (compressão)
      };
      img.onerror = reject;
      img.src = event.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};