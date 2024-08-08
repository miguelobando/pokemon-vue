import { ref } from 'vue'
import type { getAllPokemonsApiResponse, PokemonWithURL } from '@/interfaces/ApiResponses'
import type { PokemonDetailAPIResponse } from '@/interfaces/DetailApiResponse'
import type { PokemonInfo } from '@/interfaces/PokemonInfo'

const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon'

export const usePokeApi = () => {
  const isLoading = ref(false)

  async function getAllPokemons(): Promise<PokemonWithURL[]> {
    isLoading.value = true
    try {
      // Similate a delay
      await new Promise((resolve) => setTimeout(resolve, 3000))
      const response = await fetch(POKE_API_URL)
      const data: getAllPokemonsApiResponse = await response.json()
      const enhancedData: PokemonWithURL[] = data.results.map((pokemon) => ({
        ...pokemon
      }))
      return enhancedData
    } catch (error) {
      console.log(error)
      return []
    } finally {
      isLoading.value = false
    }
  }

  async function getPokemonByName(url: string): Promise<PokemonInfo | null> {
    try {
      const response = await fetch(`${url}`)
      const apiResponse: PokemonDetailAPIResponse = await response.json()
      const pokemonInfo: PokemonInfo = {
        id: apiResponse.id,
        name: apiResponse.name,
        imageURL: apiResponse.sprites.front_default,
        types: apiResponse.types.map((type) => type.type.name),
        weight: apiResponse.weight,
        height: apiResponse.height,
        favorite: false
      }
      return pokemonInfo
    } catch (error) {
      console.log(error)
      return null
    }
  }

  return { getAllPokemons, getPokemonByName, isLoading }
}
