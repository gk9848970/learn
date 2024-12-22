import { useState } from "react";
import { QueryProvider, useQuery } from "./creating-context";
import { TPokemon } from "../../../api/pokemon";

export const Component = () => {
  const [show, setShow] = useState(false);
  return (
    <QueryProvider>
      <Pokemon id={"1"} />
      <Pokemon id={"2"} />
      {show && <Pokemon id={"1"} />}
      <button onClick={() => setShow(!show)}>Show</button>
    </QueryProvider>
  );
};

const Pokemon = ({ id }: { id: string }) => {
  const pokemon = useQuery(id) as { data: TPokemon | null; isLoading: boolean };
  return (
    <div>
      {pokemon.data! && <h1>{pokemon.data.name}</h1>}
      {pokemon.isLoading! && <h1>Loading...</h1>}
    </div>
  );
};
