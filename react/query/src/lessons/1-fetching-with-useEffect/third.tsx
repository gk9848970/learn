import { useCallback, useState } from "react";
import { getPokemonById, TPokemon } from "../../api/pokemon";
import { delayPromise } from "../../utils";
import { useQuery } from "../../hooks/useQuery";

export default function Pokemon() {
  const [id, setId] = useState(1);
  const callback = useCallback(
    () =>
      delayPromise(
        getPokemonById(id),
        id === 1 ? 5000 : 0
      ) as Promise<TPokemon>,
    [id]
  );

  const { data: pokemon, isLoading } = useQuery<TPokemon>(callback);

  return (
    <div>
      {pokemon && <h1>{pokemon.name}</h1>}
      {isLoading && <h1>Loading...</h1>}
      <div>
        <button onClick={() => setId(2)}>Change</button>
      </div>
    </div>
  );
}
