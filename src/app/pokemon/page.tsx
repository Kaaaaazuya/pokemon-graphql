'use client'

import { useState, useCallback } from 'react'

import { Pokemon_V2_Pokemon_Bool_Exp } from '@/graphql/generated/graphql'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

import { PokemonList } from './components/PokemonList'
import { PokemonTypeFilter } from './components/PokemonTypeSelector'
import { PokemonType } from './types/PokemonType'

const LIMIT = 30

const Pokemon = () => {
  const [pageVariables, setPageVariables] = useState([
    {
      offset: 0,
      limit: LIMIT,
    },
  ])

  const [condition, setCondition] = useState<Pokemon_V2_Pokemon_Bool_Exp>({
    pokemon_v2_pokemontypes: {
      pokemon_v2_type: { id: { _in: [...Object.values(PokemonType)] } },
    },
  })

  const handleReachEnd = useCallback(() => {
    setPageVariables((v) => {
      const lastPageVariable = v.at(-1)
      const offset = lastPageVariable ? lastPageVariable.offset + lastPageVariable.limit : null

      return offset ? [...v, { offset, limit: LIMIT }] : v
    })
  }, [])

  const { setLastElement } = useInfiniteScroll(handleReachEnd)

  const handleSelectedTypesChange = useCallback((selectedTypes: number[]) => {
    setCondition({
      pokemon_v2_pokemontypes: {
        pokemon_v2_type: { id: { _in: selectedTypes } },
      },
    })
  }, [])

  return (
    <main className='bg-white'>
      <div className=''>
        <h1 className='bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-6xl font-extrabold text-transparent'>
          Pokemon Zukan
        </h1>
      </div>

      <PokemonTypeFilter onChange={handleSelectedTypesChange} />
      <hr className='my-4 h-0.5 border-t-0 bg-gray-100 opacity-100 dark:opacity-50' />
      {pageVariables.map((v, i) => (
        <PokemonList
          key={i}
          offset={v.offset}
          limit={v.limit}
          setRef={
            i === pageVariables.length - 1
              ? (ref) => {
                  setLastElement(ref)
                }
              : undefined
          }
          condition={condition}
        />
      ))}
    </main>
  )
}

export default Pokemon
