import { useQuery } from "@tanstack/react-query";

export function App() {
  return (
    <div>
      <Pokemon id={"1"} />
      <Pokemon id={"2"} />
    </div>
  );
}

const Pokemon = ({ id }: { id: string }) => {
  const pokemon = useQuery({
    queryKey: ["pokemon", id],
    queryFn: async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      return data;
    },
  });

  return (
    <div>
      {pokemon.data! && <h1>{pokemon.data.name}</h1>}
      {pokemon.isLoading! && <h1>Loading...</h1>}
    </div>
  );
};
