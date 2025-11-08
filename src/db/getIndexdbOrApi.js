import { dbManager } from "src/db/IndexedDBManager";
import { saveCollectionToDB } from "src/db/saveCollectionToDB";

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
      userId: data.catalog_users.find((u) => u._id === order.userId) || null,
    })),
  }));

  return orders;
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
          return; // ✅ já retorna se tinha cache
        }
      } catch (cacheError) {
        console.warn("Erro ao ler IndexedDB:", cacheError);
      }
    }

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
    console.error(`Erro ao buscar dados (${name || endpoint}):`, error);
    setError(true);

    // 🔹 4. Fallback: tenta recuperar algo do cache
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