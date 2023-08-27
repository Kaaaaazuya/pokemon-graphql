"use client";

import { useState, useCallback } from "react";
import { PokemonList } from "./components/PokemonList";
import { PokemonTypeFilter } from "./components/PokemonTypeSelector";
import { PokemonType } from "./types/PokemonType";
import { Pokemon_V2_Pokemon_Bool_Exp } from "@/graphql/generated/graphql";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const LIMIT = 30;

const Pokemon = () => {
  const [pageVariables, setPageVariables] = useState([
    {
      offset: 0,
      limit: LIMIT,
    },
  ]);
  const handleReachEnd = useCallback(() => {
    setPageVariables((v) => {
      const lastPageVariable = v.at(-1);
      const offset = lastPageVariable
        ? lastPageVariable.offset + lastPageVariable.limit
        : null;

      return offset ? [...v, { offset, limit: LIMIT }] : v;
    });
  }, []);
  const { setLastElement } = useInfiniteScroll(handleReachEnd);

  const [condition, setCondition] = useState<Pokemon_V2_Pokemon_Bool_Exp>({
    pokemon_v2_pokemontypes: {
      pokemon_v2_type: { id: { _in: [...Object.values(PokemonType)] } },
    },
  });

  const handleSelectedTypesChange = (selectedTypes: number[]) => {
    setCondition({
      pokemon_v2_pokemontypes: {
        pokemon_v2_type: { id: { _in: selectedTypes } },
      },
    });
  };

  return (
    <main className="bg-white">
      <h1 className="text-black">Pokemon List</h1>
      <PokemonTypeFilter onChange={handleSelectedTypesChange} />
      {pageVariables.map((v, i) => (
        <PokemonList
          key={i}
          offset={v.offset}
          limit={v.limit}
          setRef={
            i === pageVariables.length - 1
              ? (ref) => {
                  setLastElement(ref);
                }
              : undefined
          }
          condition={condition}
        />
      ))}
    </main>
  );
};

export default Pokemon;
