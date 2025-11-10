import { isEmpty } from "./empty";

export async function fetchAndCache(url, storageKey, setState) {
  try {
    setState((prev) => ({ ...prev, isLoading: true }));

    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (!isEmpty(data?.records)) {
      sessionStorage.setItem(storageKey, JSON.stringify(data.records));

      setState({ all: data.records, error: false, isLoading: false });
    } else {
      setState({ all: [], error: true, isLoading: false });
    }
  } catch {
    setState({ all: [], error: true, isLoading: false });
  }
}
