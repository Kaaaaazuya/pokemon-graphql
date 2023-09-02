type PokemonTypeKeys =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'

export const PokemonType: Record<PokemonTypeKeys, number> = {
  normal: 1,
  fighting: 2,
  flying: 3,
  poison: 4,
  ground: 5,
  rock: 6,
  bug: 7,
  ghost: 8,
  steel: 9,
  fire: 10,
  water: 11,
  grass: 12,
  electric: 13,
  psychic: 14,
  ice: 15,
  dragon: 16,
  dark: 17,
  fairy: 18,
} as const

type PokemonTypeColor = Record<PokemonTypeKeys, string>

export const typeColor: PokemonTypeColor = {
  normal: 'bg-gray-300',
  fighting: 'bg-red-500',
  flying: 'bg-blue-200',
  poison: 'bg-purple-600',
  ground: 'bg-yellow-400',
  rock: 'bg-gray-500',
  bug: 'bg-green-500',
  ghost: 'bg-purple-800',
  steel: 'bg-gray-400',
  fire: 'bg-red-700',
  water: 'bg-blue-500',
  grass: 'bg-green-600',
  electric: 'bg-yellow-300',
  psychic: 'bg-pink-500',
  ice: 'bg-blue-300',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-700',
  fairy: 'bg-pink-300',
} as const

export type PokemonType = (typeof PokemonType)[keyof typeof PokemonType]

export function ToTextColor(typeKey: PokemonTypeKeys): string {
  const backgroundColor = typeColor[typeKey]
  switch (typeKey) {
    case 'fighting':
    case 'poison':
    case 'rock':
    case 'bug':
    case 'ghost':
    case 'fire':
    case 'water':
    case 'grass':
    case 'electric':
    case 'psychic':
    case 'dragon':
    case 'dark':
      return `${backgroundColor} text-white`
    default:
      return `${backgroundColor} text-black`
  }
}

export function getTypeKeyById(typeId: number): PokemonTypeKeys | undefined {
  const typeKey = Object.keys(PokemonType).find(
    (key) => PokemonType[key as PokemonTypeKeys] === typeId,
  )
  return typeKey as PokemonTypeKeys | undefined
}
