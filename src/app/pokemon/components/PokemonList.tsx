'use client'

import { useState } from 'react'

import { Pokemon_V2_Pokemon_Bool_Exp } from '@/graphql/generated/graphql'
import useModal from '@/hooks/useModal'
import { usePokemonList } from '@/hooks/usePokemonList'

import { PokemonCard } from './PokemonCard'
import { PokemonDetailModal } from './PokemonDetailModal'

type PokemonListProps = {
  offset: number
  limit: number
  setRef?: (ref: HTMLDivElement | null) => void
  condition: Pokemon_V2_Pokemon_Bool_Exp
}

export const PokemonList = ({ offset, limit, setRef, condition }: PokemonListProps) => {
  const { isModalOpen, openModal, closeModal } = useModal()
  const [selectedPokemonId, setSelectedPokemonId] = useState<string | null>(null)

  const result = usePokemonList(offset, limit, condition) // カスタムフックの使用
  const { data, error } = result

  if (error) return <p>Oh no... {error.message}</p>
  if (!data || data == undefined) {
    return <p>fetch data failed ...</p>
  }
  const pokemons = data.pokemon_v2_pokemon

  const handleOpenModal = (id: string) => {
    setSelectedPokemonId(id)
    openModal()
  }

  return (
    <>
      <div ref={setRef} className='grid grid-cols-3	justify-items-center gap-y-10'>
        {pokemons.map((pokemon) => (
          <div key={pokemon.id}>
            <PokemonCard
              id={pokemon.id}
              name={pokemon.name}
              sprite={pokemon.pokemon_v2_pokemonsprites[0].sprites}
              onClick={() => handleOpenModal(pokemon.id.toString())}
            />
          </div>
        ))}
        {isModalOpen && selectedPokemonId && (
          <PokemonDetailModal
            id={selectedPokemonId}
            isModalOpen={isModalOpen}
            closeModal={() => {
              closeModal()
              setSelectedPokemonId(null)
            }}
          />
        )}
      </div>
    </>
  )
}
