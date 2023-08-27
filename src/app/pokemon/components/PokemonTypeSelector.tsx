import { useState, useEffect } from "react";
import { PokemonType } from "../types/PokemonType";

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

  const toggleAllTypes = () => {
    if (selectedTypes.length === Object.keys(PokemonType).length) {
      setSelectedTypes([]); // All OFF
    } else {
      setSelectedTypes([...Object.values(PokemonType)]); // All ON
    }
  };

  useEffect(() => {
    onChange(selectedTypes);
  }, [onChange, selectedTypes]);

  return (
    <div>
      <div className="mb-2">
        <button
          onClick={toggleAllTypes}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          {selectedTypes.length === Object.keys(PokemonType).length
            ? "All OFF"
            : "All ON"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.entries(PokemonType).map(([typeName, typeId]) => (
          <span
            key={typeId}
            onClick={() => toggleTypeSelection(typeId)}
            className={`cursor-pointer px-2 py-1 border border-gray-400 rounded ${
              selectedTypes.includes(typeId)
                ? "bg-blue-500 text-white"
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
