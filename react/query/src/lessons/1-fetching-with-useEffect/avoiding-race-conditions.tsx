import { useEffect, useState } from "react";
import { getPokemonById, TPokemon } from "../../api/pokemon";
import { delayPromise } from "../../utils";

export default function Pokemon() {
  const [id, setId] = useState("1");
  const [pokemon, setPokemon] = useState<TPokemon | null>(null);


  useEffect(() => {
    let ignore = false;
    const handleFetchPokemon = async () => {
      setPokemon(null);
      try {
        const data = await delayPromise(
          getPokemonById(id),
          id === "1" ? 10000 : 0
        );
        if (ignore) return;
        setPokemon(data!);
      } catch (err) {
        console.log(err);
      }
    };

    handleFetchPokemon();

    return () => {
      ignore = true;
    };
  }, [id]);

  return (
    <div>
      {pokemon && <h1>{pokemon.name}</h1>}
      <div>
        <button onClick={() => setId("2")}>Change</button>
      </div>
    </div>
  );
}
