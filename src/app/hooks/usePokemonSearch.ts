import pokemons from './data/pokemons.json'

type Pokemon = {
  jp: string
  en: string
}

export const usePokemonSearch = () => {
  const convertEn2Jp = (englishName: string): string | null => {
    const pokemon = pokemons.find((p: Pokemon) => p.en.toLowerCase() === englishName.toLowerCase())
    return pokemon ? pokemon.jp : null
  }

  return { convertEn2Jp }
}
