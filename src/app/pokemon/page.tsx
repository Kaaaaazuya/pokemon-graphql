"use client";

import { useQuery } from "urql";
import { PokemonList } from "./components/PokemonList";
import { graphql } from "@/graphql/generated";
import { Pokemon_V2_Pokemon, Query_Root } from "@/graphql/generated/graphql";

const GetPokemonListDocument = graphql(`
  query pokemon_v2_pokemon($limit: Int) {
    pokemon_v2_pokemon(limit: $limit) {
      name
      id
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`);

const Pokemons = () => {
  const limit = 30;
  const [result] = useQuery<Query_Root["pokemon_v2_pokemon"]>({
    query: GetPokemonListDocument,
    variables: { limit },
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!data || data == undefined) {
    return <p>fetch data failed ...</p>;
  }
  const pokemons = data.pokemon_v2_pokemon;

  return (
    <>
      <h1>Pokemon</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <PokemonList
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            sprite={pokemon.pokemon_v2_pokemonsprites[0].sprites}
          />
        ))}
      </ul>
    </>
  );
};

export default Pokemons;
