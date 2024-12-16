import { useEffect, useState } from "react";
import { getPokemonById, TPokemon } from "../../api/pokemon";
import { delayPromise } from "../../utils";

export default function Pokemon() {
  const [id, setId] = useState(1);
  const [pokemon, setPokemon] = useState<TPokemon | null>(null);
  console.log("id", id);

  useEffect(() => {
    const handleFetchPokemon = async () => {
      setPokemon(null);
      try {
        const data = await delayPromise(
          getPokemonById(id),
          id === 1 ? 10000 : 0
        );
        setPokemon(data!);
      } catch (err) {
        console.log(err);
      }
    };

    handleFetchPokemon();
  }, [id]);

  return (
    <div>
      {pokemon && <h1>{pokemon.name}</h1>}
      <div>
        <button onClick={() => setId(2)}>Change</button>
      </div>
    </div>
  );
}
