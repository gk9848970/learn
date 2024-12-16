import { useEffect, useState } from "react";

export const useQuery = <T>(callback: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let ignore = false;
    const handleFetchData = async () => {
      setData(null);
      try {
        const data = await callback();
        if (ignore) return;
        setData(data!);
      } catch (err) {
        setError(err as Error);
      }
    };

    handleFetchData();

    return () => {
      ignore = true;
    };
  }, [callback]);

  return {
    data,
    isLoading: !data,
    error,
  };
};
