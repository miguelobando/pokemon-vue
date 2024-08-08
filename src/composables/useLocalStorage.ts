const FAVORITE_POKEMONS_KEY = 'favorite-pokemons'

export const useLocalStorage = () => {
  const recoverFavoritePokemons = (): string[] => {
    const favoritePokemons = localStorage.getItem(FAVORITE_POKEMONS_KEY)
    if (favoritePokemons) {
      return JSON.parse(favoritePokemons)
    }
    return []
  }

  const updateFavoritePokemons = (pokemon: string) => {
    const result = localStorage.getItem(FAVORITE_POKEMONS_KEY)
    let parsedResult: string[] = []

    if (result) {
      parsedResult = JSON.parse(result)
    }

    if (parsedResult.includes(pokemon)) {
      parsedResult = parsedResult.filter((item) => item !== pokemon)
    } else {
      parsedResult.push(pokemon)
    }

    localStorage.setItem(FAVORITE_POKEMONS_KEY, JSON.stringify(parsedResult))
  }

  return { updateFavoritePokemons, recoverFavoritePokemons }
}
