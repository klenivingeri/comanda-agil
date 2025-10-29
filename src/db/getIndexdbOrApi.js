import { dbManager } from "src/db/IndexedDBManager";
import { saveCollectionToDB } from "src/db/saveCollectionToDB";

export const getIndexdbOrApi = async ({
  setIsLoading,
  setError,
  setResponse,
  period,
  endpoint,
  name
}) => {
  setIsLoading(true);
  const nameTable = `${name}${period.charAt(0).toUpperCase() + period.slice(1)}`
  console.log(nameTable)
  const today = new Date().toISOString().split("T")[0];

  try {
    if (period !== "day") {
      const cachedData = await dbManager.getAll(nameTable);
      const isCacheValid = cachedData?.length > 0 && cachedData[0]?.requestDate === today;

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
        requestDate: today,
      }));
      await saveCollectionToDB(nameTable, dataToSave);
    }
  } catch (error) {
    console.error(`Erro ao buscar dados (${nameTable}):`, error);
    setError(true);

    // 🔹 5. Fallback pro cache se a API falhar
    try {
      const cachedData = await dbManager.getAll(nameTable);
      if (cachedData?.length > 0) {
        setResponse(cachedData);
      }
    } catch (cacheError) {
      console.warn(`Erro ao tentar usar cache (${nameTable}):`, cacheError);
    }
  } finally {
    setIsLoading(false);
  }
};
