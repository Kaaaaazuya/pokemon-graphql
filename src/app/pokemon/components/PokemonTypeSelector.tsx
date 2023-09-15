import { useState, useEffect } from 'react'

import useLanguage from '@/app/hooks/useLanguage'

import { PokemonType, getTypeNameInJapanese, typeColor } from '../types/PokemonType'

export const PokemonTypeFilter = ({
  onChange,
}: {
  onChange: (selectedTypes: number[]) => void
}) => {
  const { language } = useLanguage()
  const [selectedTypes, setSelectedTypes] = useState<number[]>([...Object.values(PokemonType)])
  const [prevSelectedTypes, setPrevSelectedTypes] = useState<number[]>([])

  const toggleTypeSelection = (typeId: number) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId) ? prev.filter((id) => id !== typeId) : [...prev, typeId],
    )
  }

  const areAllTypesSelected = () => {
    return selectedTypes.length === Object.values(PokemonType).length
  }

  const toggleAllTypes = () => {
    if (areAllTypesSelected()) {
      setSelectedTypes([]) // すべてのタイプを選択解除
    } else {
      setSelectedTypes([...Object.values(PokemonType)]) // すべてのタイプを選択
    }
  }

  useEffect(() => {
    // 前回の selectedTypes と現在の selectedTypes が異なる場合のみ onChange を呼び出す
    if (JSON.stringify(prevSelectedTypes) !== JSON.stringify(selectedTypes)) {
      onChange(selectedTypes)
      setPrevSelectedTypes(selectedTypes)
    }
  }, [onChange, selectedTypes, prevSelectedTypes])

  return (
    <div>
      <div className='flex flex-wrap items-center justify-around	'>
        <button
          onClick={toggleAllTypes} // toggleAllTypesを呼び出す
          className='mb-2 rounded-full bg-blue-500 px-3 py-1 text-white hover:bg-blue-600'
        >
          {areAllTypesSelected() ? 'NONE' : 'ALL'}
        </button>
        {Object.entries(PokemonType).map(([typeName, typeId]) => (
          <span
            key={typeId}
            onClick={() => toggleTypeSelection(typeId)}
            className={`cursor-pointer rounded border border-gray-400 px-2 py-1 ${
              selectedTypes.includes(typeId)
                ? `${typeColor[typeName]} text-white`
                : 'bg-white text-black'
            }`}
          >
            {language === 'jp' ? getTypeNameInJapanese(typeName) : typeName}{' '}
          </span>
        ))}
      </div>
    </div>
  )
}
