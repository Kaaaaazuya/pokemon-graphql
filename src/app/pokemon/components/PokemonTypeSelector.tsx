import { useState, useEffect } from "react";
import { PokemonType, typeColors } from "../types/PokemonType";

export const PokemonTypeFilter = ({
  onChange,
}: {
  onChange: (selectedTypes: number[]) => void;
}) => {
  const [selectedTypes, setSelectedTypes] = useState<number[]>([
    ...Object.values(PokemonType),
  ]);

  const toggleTypeSelection = (typeId: number) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId],
    );
  };

  const areAllTypesSelected = () => {
    return selectedTypes.length === Object.values(PokemonType).length;
  };

  useEffect(() => {
    onChange(selectedTypes);
  }, [onChange, selectedTypes]);

  return (
    <div>
      <div className="flex flex-wrap justify-around items-center	">
        {!areAllTypesSelected() && (
          <button
            onClick={() => setSelectedTypes([...Object.values(PokemonType)])}
            className="mb-2 bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600"
          >
            ALL
          </button>
        )}
        {Object.entries(PokemonType).map(([typeName, typeId]) => (
          <span
            key={typeId}
            onClick={() => toggleTypeSelection(typeId)}
            className={`cursor-pointer px-2 py-1 border border-gray-400 rounded ${
              selectedTypes.includes(typeId)
                ? `${typeColors[typeName]} text-white`
                : "bg-white text-black"
            }`}
          >
            {typeName}
          </span>
        ))}
      </div>
    </div>
  );
};
