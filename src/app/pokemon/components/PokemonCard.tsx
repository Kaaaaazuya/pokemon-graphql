import Image from 'next/image'
import { Suspense } from 'react'

import { PokemonCardSkelton } from './PokemonCardSkelton'

type PokemonListProps = {
  id: number
  name: string
  sprite: string
  onClick: () => void
}

export const PokemonCard = ({ id, name, sprite, onClick }: PokemonListProps) => {
  const replacedString = JSON.parse(sprite).front_default?.replace(
    '/media',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master',
  )

  const displayNum = 'No.' + id

  return (
    <div key={id} onClick={onClick}>
      <Suspense fallback={<PokemonCardSkelton />}>
        <p className='text-black'>{name}</p>
        <p className='text-black'>{displayNum}</p>
        <div className='bg-gray-200'>
          <Image src={replacedString} alt={name} width={200} height={200} priority={false} />
        </div>
      </Suspense>
    </div>
  )
}
