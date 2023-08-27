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

  const displayNum = "No." + id;

  return (
    <div key={id}>
      <p className="text-black">{name}</p>
      <p className="text-black">{displayNum}</p>
      <div className="bg-gray-200">
        <Image src={replacedString} alt={name} width={200} height={200} />
      </div>
    </div>
  );
};
