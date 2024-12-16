import { useEffect, useState } from "react";
import { getPokemonById, TPokemon } from "../../api/pokemon";

export default function Pokemon() {
  const [id] = useState(1);
  const [pokemon, setPokemon] = useState<TPokemon | null>(null);

  useEffect(() => {
    const handleFetchPokemon = async () => {
      setPokemon(null);
      try {
        const data = await getPokemonById(id);
        setPokemon(data!);
      } catch (err) {
        console.log(err);
      }
    };

    handleFetchPokemon();
  }, [id]);

  return <div>{pokemon && <h1>{pokemon.name}</h1>}</div>;
}
