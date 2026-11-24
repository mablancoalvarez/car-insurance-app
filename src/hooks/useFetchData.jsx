import { useState, useEffect } from 'react';

export const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

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
        const json = await response.json();
        if (ignore) return;
        setData(json);
        setError(null);
      } catch (fetchError) {
        if (fetchError.name === 'AbortError' || ignore) return;
        setError(fetchError.message || 'Could not fetch data');
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
