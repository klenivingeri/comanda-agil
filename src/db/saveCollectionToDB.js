import { dbManager } from './IndexedDBManager'; // Ajuste o caminho

// A sua função auxiliar para salvar no cache
export const saveCollectionToDB = async (storeName, items) => {
    // 1. Limpa a store para garantir cache fresco
    await dbManager.clearStore(storeName); 
    
    if (!items || items.length === 0) {
        console.log(`Coleção vazia para salvar em '${storeName}'. Store limpa.`);
        return; 
    }
    
    // 2. Salva todos os novos itens
    const savePromises = items.map(item => dbManager.putItem(storeName, item));
    await Promise.all(savePromises);
    
    console.log(`Dados (${items.length} itens) salvos em '${storeName}'.`);
};