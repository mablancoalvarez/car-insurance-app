import { useState, useEffect } from 'react';

export const useFetchData = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let ignore = false;

    const fetchData = async () => {
      setIsPending(true);
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(response.statusText || 'Could not fetch data');
        }
        // response.json() is untyped at the network boundary.
        const json = (await response.json()) as T;
        if (ignore) return;
        setData(json);
        setError(null);
      } catch (fetchError: unknown) {
        if (ignore) return;
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          return;
        }
        const message =
          fetchError instanceof Error && fetchError.message
            ? fetchError.message
            : 'Could not fetch data';
        setError(message);
      } finally {
        if (!ignore) setIsPending(false);
      }
    };

    fetchData();
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [url]);

  return { data, isPending, error };
};
