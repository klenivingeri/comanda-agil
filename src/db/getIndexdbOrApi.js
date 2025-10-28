import { dbManager } from "src/db/IndexedDBManager";
import { saveCollectionToDB } from "src/db/saveCollectionToDB";

export const getIndexdbOrApi = async ({
  setIsLoading,
  setError,
  setResponse,
  period,
  endpoint,
}) => {
  setIsLoading(true);

  const today = new Date().toISOString().split("T")[0];

  try {
    if (period !== "day") {
      const cachedData = await dbManager.getAll(period);
      const isCacheValid = cachedData?.length > 0 && cachedData[0]?.createdAt === today;

      if (isCacheValid) {
        setResponse(cachedData);
        return; 
      }
    }

    const res = await fetch(`${endpoint}?period=${period}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Erro na API: ${res.status} - ${res.statusText}`);
    }

    const { records = [] } = await res.json();

    setResponse(records);

    if (period !== "day" && records.length > 0) {
      const dataToSave = records.map((item) => ({
        ...item,
        createdAt: today,
      }));
      await saveCollectionToDB(period, dataToSave);
    }
  } catch (error) {
    console.error(`Erro ao buscar dados (${period}):`, error);
    setError(true);

    // 🔹 5. Fallback pro cache se a API falhar
    try {
      const cachedData = await dbManager.getAll(period);
      if (cachedData?.length > 0) {
        setResponse(cachedData);
      }
    } catch (cacheError) {
      console.warn(`Erro ao tentar usar cache (${period}):`, cacheError);
    }
  } finally {
    setIsLoading(false);
  }
};
