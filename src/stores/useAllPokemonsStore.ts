import { defineStore } from 'pinia'
import type { PokemonWithURL } from '@/interfaces/ApiResponses'

export const useAllPokemonsStore = defineStore('allPokemons', {
  state: () => ({
    allPokemons: [
      {
        name: 'Bulbasaur',
        url: 'aasdfasdf.com',
        favorite: false
      }
    ]
  }),
  actions: {
    populateAllPokemons(pokemons: PokemonWithURL[]) {
      this.allPokemons.pop()
      this.allPokemons.push(...pokemons)
    }
  },
  getters: {
    getAllPokemons(state): PokemonWithURL[] {
      return state.allPokemons
    }
  }
})
