"use client";

import { useState, useCallback } from "react";
import { PokemonList } from "./components/PokemonList";
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

  return (
    <main className="bg-white">
      <h1>Pokemon List</h1>
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
        />
      ))}
    </main>
  );
};

export default Pokemon;
