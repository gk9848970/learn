import { createContext, useContext, useEffect, useState } from "react";
import { getPokemonById } from "../../../api/pokemon";
import { delayPromise } from "../../../utils";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const queryContext = createContext<[Record<string, unknown>, Function]>([
  {},
  () => {},
]);

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const tuple = useState({});

  return (
    <queryContext.Provider value={tuple}>{children}</queryContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useQuery(url: string) {
  const [state, setState] = useContext(queryContext);

  useEffect(() => {
    const update = (newState: Record<string, unknown>) => {
      setState((prevState: Record<string, unknown>) => ({
        ...prevState,
        [url]: newState,
      }));
    };
    let ignore = false;

    const fetchData = async () => {
      update({ data: null, isLoading: true, error: null });

      try {
        const data = await delayPromise(getPokemonById(url), 1000);
        if (ignore) return;
        update({ data, isLoading: false, error: null });
      } catch (error) {
        if (ignore) return;
        update({ data: null, isLoading: false, error });
        return;
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [setState, url]);

  return state[url] || { data: null, isLoading: true, error: null };
}
