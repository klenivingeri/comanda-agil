import { dbManager } from "src/db/IndexedDBManager";
import { saveCollectionToDB } from "src/db/saveCollectionToDB";

const show_log = process.env.SHOW_LOG === "true";

const serializer = (data) => {
  const addCategoryInProduct = data.catalog_products?.map((product) => {
    return {
      ...product,
      category: data.catalog_categories.find((c) => c._id === product.category),
    };
  });

  const orders = data.orders.map((order) => ({
    ...order,
    subOrders: order.subOrders.map((subOrder) => ({
      ...subOrder,
      product: addCategoryInProduct.find((p) => p._id === subOrder.product),
      userId: data.catalog_users.find((u) => u._id === subOrder.userId) || null,
    })),
  }));

  return orders;
};

export const serializerProduct = (data) => {

  const addCategoryInProduct = data.catalog_products?.map((product) => {
    return {
      ...product,
      category: data.catalog_categories.find((c) => c._id === product.category),
    };
  });

  return addCategoryInProduct;
};

export const getAllIndexdbOrApi = async ({
  setIsLoading,
  setError,
  setResponse,
  period,
  endpoint,
  name,
}) => {
  setIsLoading(true);

  try {
    const today = new Date().toISOString().split("T")[0];
    const date = localStorage.getItem("lastUpdate");

    if (period !== "day" && today === date) {
      try {
        const [orders, catalog_products, catalog_categories, catalog_users] =
          await Promise.all(
            [
              "orders",
              "catalog_products",
              "catalog_categories",
              "catalog_users",
            ].map((table) => dbManager.getAll(table))
          );

        if (orders.length) {
          const dataFormatted = serializer({
            orders,
            catalog_products,
            catalog_categories,
            catalog_users,
          });
          setResponse(dataFormatted);
          return;
        }
      } catch (cacheError) {
        if(show_log) console.warn("Erro ao ler IndexedDB:", cacheError);
      }
    }

    if(show_log) console.log(`Cache miss for '${catalogName}'. Fetching from API...`);
    const res = await fetch(`${endpoint}?period=${period}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Erro na API: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    const dataFormatted = serializer(data);
    setResponse(dataFormatted);

    if (period !== "day" && data && typeof data === "object") {
      for (const key of Object.keys(data)) {
        if (Array.isArray(data[key]) && data[key].length > 0) {
          await saveCollectionToDB(key, data[key]);
        }
      }
      localStorage.setItem("lastUpdate", today);
    }
  } catch (error) {
    if(show_log) console.error(`Erro ao buscar dados (${name || endpoint}):`, error);
    setError(true);

    try {
      const cached = await dbManager.getAll(name || "orders");
      if (cached?.length > 0) {
        setResponse(cached);
      }
    } catch (cacheError) {
      console.warn("Erro ao tentar usar cache:", cacheError);
    }
  } finally {
    setIsLoading(false);
  }
};

export const getOneIndexdbOrApi = async (
  endpoint,
  catalogName,
  setError,
  setResponse
) => {
  try {
    if (catalogName === "catalog_products") {
      const [catalog_products, catalog_categories] = await Promise.all(
        ["catalog_products", "catalog_categories"].map((table) =>
          dbManager.getAll(table)
        )
      );

      if (catalog_products.length > 0 && catalog_categories.length > 0) {
        const dataFormatted = serializerProduct({
          catalog_products,
          catalog_categories,
        });
        setResponse({ all: dataFormatted, error: false, isLoading: false });
        return; 
      }
    } else {
      const catalog = await dbManager.getAll(catalogName);
      if (Array.isArray(catalog) && catalog.length > 0) {
        setResponse({ all: catalog, error: false, isLoading: false });
        return; 
      }
    }

    if(show_log) console.log(`Cache miss for '${catalogName}'. Fetching from API...`);
    const res = await fetch(`${endpoint}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    
    if (!res.ok) {
      throw new Error(`Erro na API: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    const records = data.records || [];

    await saveCollectionToDB(catalogName, records);

    if (catalogName === "catalog_products") {
      const categories = await dbManager.getAll("catalog_categories");
      const dataFormatted = serializerProduct({ catalog_products: records, catalog_categories: categories });
      setResponse({ all: dataFormatted, error: false, isLoading: false });
    } else {
      setResponse({ all: records, error: false, isLoading: false });
    }

  } catch (error) {
    if(show_log) console.error(`Erro ao buscar dados  (${catalogName || endpoint}) 2:`, error);
    setError(true);
    setResponse({ all: [], error: true, isLoading: false });
  }
};
