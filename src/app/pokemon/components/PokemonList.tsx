'use client'

import { createPortal } from 'react-dom'
import { useQuery } from 'urql'

import Loading from '@/app/Loading'
import { graphql } from '@/graphql/generated'
import { Pokemon_V2_Pokemon_Bool_Exp, Query_Root } from '@/graphql/generated/graphql'

import { PokemonCard } from './PokemonCard'

type PokemonListProps = {
  offset: number
  limit: number
  setRef?: (ref: HTMLDivElement | null) => void
  condition: Pokemon_V2_Pokemon_Bool_Exp
}

const GetPokemonListDocument = graphql(`
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
`)

export const PokemonList = ({ offset, limit, setRef, condition }: PokemonListProps) => {
  const [result] = useQuery<Query_Root['pokemon_v2_pokemon']>({
    query: GetPokemonListDocument,
    variables: { offset, limit, condition },
  })

  const { data, fetching, error } = result

  if (fetching) return createPortal(<Loading />, document.body)
  if (error) return <p>Oh no... {error.message}</p>
  if (!data || data == undefined) {
    return <p>fetch data failed ...</p>
  }
  const pokemons = data.pokemon_v2_pokemon

  return (
    <>
      <div ref={setRef} className='gap-y-30 grid grid-cols-3	justify-items-center gap-x-10'>
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
  )
}
