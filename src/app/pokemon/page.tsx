"use client";
import Image from "next/image";
import { useQuery } from "urql";
import { graphql } from "@/graphql/generated";
import { Query_Root } from "@/graphql/generated/graphql";

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

  const sprites = pokemons[0].pokemon_v2_pokemonsprites[0].sprites;
  var obj = JSON.parse(sprites);
  console.log(obj.front_default);
  const replacedString = obj.front_default.replace(
    "/media/",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master"
  );

  console.log(replacedString);

  return (
    <>
      <h1>Pokemon</h1>
      <ul>
        {pokemons.map((pokemon) => {
          const sprites = pokemon.pokemon_v2_pokemonsprites[0].sprites;
          var obj = JSON.parse(sprites);
          console.log(obj.front_default);
          const replacedString = obj.front_default.replace(
            "/media",
            "https://raw.githubusercontent.com/PokeAPI/sprites/master"
          );

          return (
            <div key={pokemon.id}>
              <li key={pokemon.id}>{pokemon.name}</li>
              <Image
                src={replacedString}
                alt={pokemon.name}
                width={64}
                height={64}
              />
            </div>
          );
        })}
      </ul>
    </>
  );
};

export default Pokemons;
