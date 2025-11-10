// ⚠️ ATENÇÃO: Verifique e INCREMENTE esta versão se você já executou o código antes.
const DB_NAME = "ComandaGoDB";
const DB_VERSION = 1; // Use um número maior que qualquer versão anterior.
const show_log = process.env.SHOW_LOG === "true";
class IndexedDBManager {
  constructor() {
    this.db = null; // Instância do IDBDatabase
  }

  /**
   * Abre a conexão com o banco de dados.
   * @returns {Promise<IDBDatabase>} A promessa da conexão.
   */
  openDB() {
    return new Promise((resolve, reject) => {
      if (!("indexedDB" in window)) {
        return reject(new Error("IndexedDB não é suportado neste navegador."));
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (event) => {
        console.error("Erro ao abrir o IndexedDB:", event.target.error);
        reject(event.target.error);
      };

      request.onsuccess = (event) => {
        this.db = event.target.result; // Salva a instância
        resolve(this.db);
      };

      // Chamado se DB_VERSION for maior que a anterior ou DB não existir
      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // --- FUNÇÃO AUXILIAR PARA CRIAR STORES (Melhorando a repetitividade) ---
        const createStore = (storeName) => {
          if (!db.objectStoreNames.contains(storeName)) {
            const store = db.createObjectStore(storeName, { keyPath: "_id" });
            // Assumimos que a propriedade para o índice é 'name' e não 'nome'
            // Mude 'name' para 'nome' se o seu objeto MongoDB usar 'nome'
            if(show_log) console.log(`Object Store '${storeName}' criada.`);
          }
        };

        // --- CRIAÇÃO DE TODAS AS 12 STORES ---

        createStore("orders");
        createStore("catalog_products");
        createStore("catalog_categories");
        createStore("catalog_users");

      };
    });
  }

  /**
   * 2. Função auxiliar para executar transações e retornar uma Promise.
   * @param {string} storeName - O nome da Object Store (tabela).
   * @param {string} mode - O modo da transação ('readonly' ou 'readwrite').
   * @param {Function} action - A função que contém a lógica da operação IndexedDB.
   * @returns {Promise<any>} A promessa da operação de banco de dados.
   */
  _transactionWrapper(storeName, mode, action) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject(new Error("Conexão com o IndexedDB não está aberta."));
      }

      const transaction = this.db.transaction(storeName, mode);
      const store = transaction.objectStore(storeName);

      // Lógica de manipulação de erros da transação
      transaction.oncomplete = () => resolve(); // Sucesso
      transaction.onerror = (event) => reject(event.target.error); // Erro na transação
      transaction.onabort = (event) => reject(event.target.error); // Transação abortada

      // Executa a ação da operação CRUD
      const request = action(store);

      // Garante que a requisição de ação (put, get, delete) também seja tratada
      if (request) {
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
      }
    });
  }

  // --- MÉTODOS CRUD PRINCIPAIS ---

  /**
   * Adiciona ou atualiza um item em uma store.
   * @param {string} storeName - O nome da Object Store.
   * @param {object} item - O objeto a ser armazenado.
   * @returns {Promise<any>} A chave (key) do item inserido/atualizado.
   */
  putItem(storeName, item) {
    return this._transactionWrapper(storeName, "readwrite", (store) => {
      return store.put(item);
    });
  }

  /**
   * Obtém um item de uma store pela sua chave (key).
   * @param {string} storeName - O nome da Object Store.
   * @param {any} key - A chave (key) do item.
   * @returns {Promise<object>} O item encontrado.
   */
  getItem(storeName, key) {
    return this._transactionWrapper(storeName, "readonly", (store) => {
      return store.get(key);
    });
  }

  /**
   * Obtém todos os itens de uma store.
   * @param {string} storeName - O nome da Object Store.
   * @returns {Promise<Array<object>>} Um array com todos os itens.
   */
  getAll(storeName) {
    return this._transactionWrapper(storeName, "readonly", (store) => {
      return store.getAll();
    });
  }

  /**
   * Deleta um item de uma store pela sua chave (key).
   * @param {string} storeName - O nome da Object Store.
   * @param {any} key - A chave (key) do item a ser deletado.
   * @returns {Promise<void>}
   */
  deleteItem(storeName, key) {
    return this._transactionWrapper(storeName, "readwrite", (store) => {
      return store.delete(key);
    });
  }

  /**
   * Remove todos os registros de uma Object Store.
   * @param {string} storeName - O nome da Object Store a ser limpa.
   * @returns {Promise<void>}
   */
  clearStore(storeName) {
    return this._transactionWrapper(storeName, "readwrite", (store) => {
      return store.clear();
    });
  }

  /**
 * Limpa todas as Object Stores (tabelas) da database.
 * @returns {Promise<void>}
 */
 async recreateDatabase() {
  // 1️⃣ Fecha a conexão atual se existir
  if (this.db) {
    this.db.close();
    this.db = null;
  }

  // 2️⃣ Deleta o banco existente
  await new Promise((resolve, reject) => {
    const deleteRequest = indexedDB.deleteDatabase(DB_NAME);

    deleteRequest.onsuccess = () => {
      if(show_log) console.log(`🧹 Database "${DB_NAME}" deletada com sucesso.`);
      resolve();
    };

    deleteRequest.onerror = (event) => {
      console.error("Erro ao deletar database:", event.target.error);
      reject(event.target.error);
    };

    deleteRequest.onblocked = () => {
      console.warn("⚠️ Operação bloqueada — feche outras abas usando o app antes.");
    };
  });

  // 3️⃣ Reabre o banco (isso aciona onupgradeneeded e recria as stores)
  if(show_log) console.log("🔄 Recriando database...");
  const db = await this.openDB();
  if(show_log) console.log("✅ Database recriada com sucesso.");
  return db;
}
}

export const dbManager = new IndexedDBManager();
