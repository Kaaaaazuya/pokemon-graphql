import { Skeleton } from '@mui/material'

export const PokemonCardSkelton = () => {
  return (
    <div>
      <Skeleton variant='text' />
      <Skeleton variant='text' />
      <Skeleton variant='rectangular' width={200} height={200} />
    </div>
  )
}
