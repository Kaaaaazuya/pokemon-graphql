"use client";
import { graphql } from "graphql";
import { useQuery } from "urql";

const GetPokemons = graphql(`
  query getPokemons {
    pokemon_v2_pokemon(limit: 30, where: { pokemon_species_id: { _gt: 500 } }) {
      name
      id
    }
  }
`);

const Pokemons = () => {
  const [result, reexecuteQuery] = useQuery({
    query: GetPokemons,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <>
      <h1>Pokemon</h1>
      <ul>
        {data.map((pokemon) => (
          <li key={pokemon.id}>{pokemon.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Pokemons;
