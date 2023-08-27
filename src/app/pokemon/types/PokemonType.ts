export const PokemonType = {
  normal: 1,
  fighting: 2,
  flying: 3,
  poison: 4,
  ground: 5,
  rock: 6,
  bug: 7,
  ghost: 8,
  steel: 9,
  fire: 10,
  water: 11,
  grass: 12,
  electric: 13,
  psychic: 14,
  ice: 15,
  dragon: 16,
  dark: 17,
  fairy: 18,
} as const;

export const typeColors = {
  normal: "bg-gray-300",
  fighting: "bg-red-500",
  flying: "bg-blue-200",
  poison: "bg-purple-600",
  ground: "bg-yellow-400",
  rock: "bg-gray-500",
  bug: "bg-green-500",
  ghost: "bg-purple-800",
  steel: "bg-gray-400",
  fire: "bg-red-700",
  water: "bg-blue-500",
  grass: "bg-green-600",
  electric: "bg-yellow-300",
  psychic: "bg-pink-500",
  ice: "bg-blue-300",
  dragon: "bg-indigo-600",
  dark: "bg-gray-700",
  fairy: "bg-pink-300",
} as const;

export type PokemonType = (typeof PokemonType)[keyof typeof PokemonType];
// function toJapanese(type: PokemonType) {
//   switch (type) {
//     case Position.Top:
//       return "上";
//     case Position.Right:
//       return "右";
//     case Position.Bottom:
//       return "下";
//     case Position.Left:
//       return "左";
//   }
// }

function toColor(type: PokemonType) {
  switch (type) {
    case PokemonType.normal:
      return "white";
    case PokemonType.fighting:
      return "white";
    case PokemonType.flying:
      return "white";
    case PokemonType.poison:
      return "white";
    case PokemonType.ground:
      return "white";
    case PokemonType.rock:
      return "white";
    case PokemonType.bug:
      return "white";
    case PokemonType.ghost:
      return "white";
    case PokemonType.steel:
      return "white";
    case PokemonType.fire:
      return "white";
    case PokemonType.water:
      return "white";
    case PokemonType.grass:
      return "white";
    case PokemonType.electric:
      return "white";
    case PokemonType.ice:
      return "white";
    case PokemonType.dragon:
      return "white";
    case PokemonType.fairy:
      return "white";
  }
}
