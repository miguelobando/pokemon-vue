import type { PokemonInfo } from '@/interfaces/PokemonInfo'

export const pokemonInfomock: PokemonInfo[] = [
  {
    id: 1,
    name: 'Bulbasaur',
    imageURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    types: ['Grass', 'Poison'],
    weight: 69,
    height: 7,
    favorite: false
  },
  {
    id: 2,
    name: 'Ivysaur',
    imageURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
    types: ['Grass', 'Poison'],
    weight: 130,
    height: 10,
    favorite: false
  },
  {
    id: 3,
    name: 'Venusaur',
    imageURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
    types: ['Grass', 'Poison'],
    weight: 1000,
    height: 20,
    favorite: false
  }
]
