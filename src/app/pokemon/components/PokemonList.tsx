"use client";

import { useQuery } from "urql";
import { PokemonCard } from "./PokemonCard";
import { graphql } from "@/graphql/generated";
import { Query_Root } from "@/graphql/generated/graphql";

type PokemonListProps = {
  offset: number;
  limit: number;
  setRef?: (ref: HTMLDivElement | null) => void;
};

const GetPokemonListDocument = graphql(`
  query pokemon_v2_pokemon($limit: Int, $offset: Int) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      name
      id
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        type_id
        pokemon_v2_type {
          name
          id
        }
      }
    }
  }
`);

export const PokemonList = ({ offset, limit, setRef }: PokemonListProps) => {
  const [result] = useQuery<Query_Root["pokemon_v2_pokemon"]>({
    query: GetPokemonListDocument,
    variables: { offset, limit },
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
      <div
        ref={setRef}
        className="grid grid-cols-3 justify-items-center	gap-x-10 gap-y-30"
      >
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            sprite={pokemon.pokemon_v2_pokemonsprites[0].sprites}
          />
        ))}
      </div>
    </>
  );
};
