import type { PokemonWithURL } from '@/interfaces/ApiResponses'

export const fillFavorites = (pokemons: PokemonWithURL[], favoritePokemons: string[]) => {
  return pokemons.map((pokemon) => {
    const isFavorite = favoritePokemons.includes(pokemon.name)
    return {
      ...pokemon,
      favorite: isFavorite
    }
  })
}
