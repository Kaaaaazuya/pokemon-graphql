// usePokemonDetail.ts
import { useQuery } from 'urql'

import { Query_Root } from '@/graphql/generated/graphql'

const GetPokemonDetailDocument = /* GraphQL */ `
  query pokemonDetail($condition: pokemon_v2_pokemon_bool_exp) {
    pokemon_v2_pokemon(where: $condition) {
      id
      height
      name
      weight
      pokemon_v2_pokemonstats {
        pokemon_v2_stat {
          name
        }
        base_stat
      }
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

export const usePokemonDetail = (id: string, isModalOpen: boolean) => {
  const [result] = useQuery<Query_Root>({
    query: GetPokemonDetailDocument,
    variables: { condition: { id: { _eq: parseInt(id) } } },
    pause: !isModalOpen,
  })

  return result
}
