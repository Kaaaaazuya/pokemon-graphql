import Image from "next/image";

type PokemonListProps = {
  id: string;
  name: string;
  sprite: string;
};

export const PokemonCard = ({ id, name, sprite }: PokemonListProps) => {
  const replacedString = JSON.parse(sprite).front_default.replace(
    "/media",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master"
  );

  return (
    <div key={id}>
      <p key={id}>{name}</p>
      <Image src={replacedString} alt={name} width={64} height={64} />
    </div>
  );
};
