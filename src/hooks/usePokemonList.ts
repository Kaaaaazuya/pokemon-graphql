// usePokemonList.ts
import { useQuery } from 'urql'

import { Query_Root, Pokemon_V2_Pokemon_Bool_Exp } from '@/graphql/generated/graphql'

const GetPokemonListDocument = /* GraphQL */ `
  query pokemon_v2_pokemon($limit: Int, $offset: Int, $condition: pokemon_v2_pokemon_bool_exp) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, where: $condition) {
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
`

export const usePokemonList = (
  offset: number,
  limit: number,
  condition: Pokemon_V2_Pokemon_Bool_Exp,
) => {
  const [result] = useQuery<Query_Root>({
    query: GetPokemonListDocument,
    variables: { offset, limit, condition },
  })

  return result
}
