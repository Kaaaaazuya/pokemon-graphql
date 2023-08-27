import Image from "next/image";
import { Pokemon_V2_Pokemon } from "@/graphql/generated/graphql";

type PokemonListProps = {
  id: string;
  name: string;
  sprite: string;
};

export const PokemonList = ({ id, name, sprite }: PokemonListProps) => {
  const replacedString = JSON.parse(sprite).front_default.replace(
    "/media",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master"
  );

  console.log(id);

  return (
    <div key={id}>
      <li key={id}>{name}</li>
      <Image src={replacedString} alt={name} width={64} height={64} />
    </div>
  );
};
