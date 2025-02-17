export type TPokemon = {
  id: number;
  name: string;
  type: string;
  image: string;
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
  height: number;
  weight: number;
  gender: string;
  base_experience: number;
  species: string;
  abilities: string[];
  held_items: string[];
  game_indices: number[];
  is_default: boolean;
};

const pokemon = [
  {
    id: 1,
    name: "Bulbasaur",
    type: "Grass",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    hp: 45,
    attack: 49,
    defense: 49,
    special_attack: 65,
    special_defense: 65,
    speed: 45,
    height: 7,
    weight: 69,
    gender: "M",
    base_experience: 64,
    species: "Bulbasaur",
    abilities: ["Overgrow"],
    held_items: [],
    game_indices: [1],
    is_default: true,
  },
  {
    id: 2,
    name: "Ivysaur",
    type: "Grass",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
    hp: 60,
    attack: 62,
    defense: 63,
    special_attack: 80,
    special_defense: 80,
    speed: 60,
    height: 10,
    weight: 130,
    gender: "M",
    base_experience: 142,
    species: "Ivysaur",
    abilities: ["Overgrow"],
    held_items: [],
    game_indices: [2],
    is_default: true,
  },
  {
    id: 3,
    name: "Venusaur",
    type: "Grass",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
    hp: 80,
    attack: 82,
    defense: 83,
    special_attack: 100,
    special_defense: 100,
    speed: 80,
    height: 20,
    weight: 1000,
    gender: "M",
    base_experience: 236,
    species: "Venusaur",
    abilities: ["Overgrow"],
    held_items: [],
    game_indices: [3],
    is_default: true,
  },
  {
    id: 4,
    name: "Charmander",
    type: "Fire",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    hp: 39,
    attack: 52,
    defense: 43,
    special_attack: 60,
    special_defense: 50,
    speed: 65,
    height: 6,
    weight: 85,
    gender: "M",
    base_experience: 62,
    species: "Charmander",
    abilities: ["Blaze"],
    held_items: [],
    game_indices: [4],
    is_default: true,
  },
  {
    id: 5,
    name: "Charmeleon",
    type: "Fire",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
    hp: 58,
    attack: 64,
    defense: 58,
    special_attack: 80,
    special_defense: 65,
    speed: 80,
    height: 11,
    weight: 190,
    gender: "M",
    base_experience: 142,
    species: "Charmeleon",
    abilities: ["Blaze"],
    held_items: [],
    game_indices: [5],
    is_default: true,
  },
  {
    id: 6,
    name: "Charizard",
    type: "Fire",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
    hp: 78,
    attack: 84,
    defense: 78,
    special_attack: 109,
    special_defense: 85,
    speed: 100,
    height: 17,
    weight: 905,
    gender: "M",
    base_experience: 239,
    species: "Charizard",
    abilities: ["Blaze"],
    held_items: [],
    game_indices: [6],
    is_default: true,
  },
  {
    id: 7,
    name: "Squirtle",
    type: "Water",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    hp: 44,
    attack: 48,
    defense: 65,
    special_attack: 50,
    special_defense: 64,
    speed: 43,
    height: 5,
    weight: 90,
    gender: "M",
    base_experience: 63,
    species: "Squirtle",
    abilities: ["Torrent"],
    held_items: [],
    game_indices: [7],
    is_default: true,
  },
  {
    id: 8,
    name: "Wartortle",
    type: "Water",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
    hp: 59,
    attack: 63,
    defense: 80,
    special_attack: 65,
    special_defense: 80,
    speed: 58,
    height: 10,
    weight: 225,
    gender: "M",
    base_experience: 142,
    species: "Wartortle",
    abilities: ["Torrent"],
    held_items: [],
    game_indices: [8],
    is_default: true,
  },
  {
    id: 9,
    name: "Blastoise",
    type: "Water",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
    hp: 79,
    attack: 83,
    defense: 100,
    special_attack: 85,
    special_defense: 105,
    speed: 78,
    height: 16,
    weight: 855,
    gender: "M",
    base_experience: 239,
    species: "Blastoise",
    abilities: ["Torrent"],
    held_items: [],
    game_indices: [9],
    is_default: true,
  },
  {
    id: 10,
    name: "Caterpie",
    type: "Bug",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
    hp: 45,
    attack: 30,
    defense: 35,
    special_attack: 20,
    special_defense: 20,
    speed: 45,
    height: 3,
    weight: 29,
    gender: "F",
    base_experience: 52,
    species: "Caterpie",
    abilities: ["Shield Dust"],
    held_items: [],
    game_indices: [10],
    is_default: true,
  },
];

export const getPokemonById = async (id: string) => {
  const pokemonId = Number(id);
  return pokemon.find((pokemon) => pokemon.id === pokemonId);
};
