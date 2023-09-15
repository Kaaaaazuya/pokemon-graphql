'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
import Image from 'next/image'
import { Bar } from 'react-chartjs-2'
import { useQuery } from 'urql'

import Modal from '@/app/components/Modal'
import useLanguage from '@/app/hooks/useLanguage'
import { usePokemonSearch } from '@/app/hooks/usePokemonSearch'
import { graphql } from '@/graphql/generated'
import { Query_Root } from '@/graphql/generated/graphql'

import { ToTextColor, getTypeNameInJapanese, typeColor } from '../types/PokemonType'

export const options = {
  indexAxis: 'y' as const,
  scales: {
    x: {
      min: 0,
      max: 300,
    },
  },
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Pokemon Stat',
    },
  },
}

const GetPokemonListDocument = graphql(`
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
`)

type PokemonDetailModalProps = {
  id: string
  isModalOpen: boolean
  closeModal: () => void
}

export const PokemonDetailModal = ({ id, isModalOpen, closeModal }: PokemonDetailModalProps) => {
  const { language } = useLanguage()
  const { convertEn2Jp } = usePokemonSearch()
  const [result] = useQuery<Query_Root['pokemon_v2_pokemon']>({
    query: GetPokemonListDocument,
    variables: {
      condition: { id: { _eq: parseInt(id) } },
    },
    pause: !isModalOpen,
  })

  const { data, error } = result
  if (error) return <p>Oh no... {error.message}</p>
  if (!data || data == undefined) {
    return <p>fetch data failed ...</p>
  }
  const pokemon = data.pokemon_v2_pokemon[0]

  const displayTitle = `No.${pokemon.id} ${
    language === 'jp' ? convertEn2Jp(pokemon.name) || '' : pokemon.name
  }`
  const replacedString = JSON.parse(
    pokemon.pokemon_v2_pokemonsprites[0].sprites,
  ).front_default?.replace('/media', 'https://raw.githubusercontent.com/PokeAPI/sprites/master')

  const stats: {
    statName: string
    baseStat: number
  } = pokemon.pokemon_v2_pokemonstats.map(
    (
      pokemon_v2_stat: {
        name: string
        __typename: string
      },
      base_stat: number,
    ) => ({
      statName: pokemon_v2_stat.name,
      baseStat: base_stat,
    }),
  )

  const labels = pokemon.pokemon_v2_pokemonstats.map((stats) => stats.pokemon_v2_stat.name)
  const data1 = pokemon.pokemon_v2_pokemonstats.map((stats) => stats.base_stat)
  stats
  const datas = {
    labels, // x軸のラベルの配列
    datasets: [
      {
        label: 'Pokemon Stats', // 凡例
        data: data1,
        backgroundColor: 'rgba(255, 99, 132, 0.5)', // グラフの棒の色
      },
    ],
  }

  return (
    <Modal title={displayTitle} isOpen={isModalOpen} onClose={closeModal}>
      <div className='flex items-center gap-4'>
        {pokemon.pokemon_v2_pokemontypes.map((type) => {
          const typeId = type.type_id
          const typeName = type.pokemon_v2_type.name
          return (
            <span
              key={typeId}
              className={`cursor-pointer rounded border border-gray-400 px-2 py-1 ${
                typeColor[typeName]
              } text-${ToTextColor(typeName)}`}
            >
              {language === 'jp' ? getTypeNameInJapanese(typeName) : typeName}
            </span>
          )
        })}
        <p className='text-black'>height: {pokemon.height / 10} m</p>
        <p className='text-black'>weight: {pokemon.weight / 10} kg</p>
      </div>

      <div className='flex items-center'>
        <Image src={replacedString} alt={pokemon.name} width={200} height={200} priority={false} />
        <div className='flex flex-col'></div>
        <Bar options={options} data={datas} width={300} height={200} />;
      </div>
    </Modal>
  )
}
