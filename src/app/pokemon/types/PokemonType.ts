const PokemonType = {
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
type PokemonType = (typeof PokemonType)[keyof typeof PokemonType];
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
