<template>
  <div class="container">
    <div class="header">
      <SearchBar @update-search-term="updateSearchTerm" />
    </div>
    <div class="list">
      <div v-for="pokemon in pokemonsToDisplay" :key="pokemon.id">
        <PokemonItem :pokemon="pokemon" @update-favorite="updateFavorite" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import type { PokemonInfo } from '@/interfaces/PokemonInfo'
import { pokemonInfomock } from '@/components/mocks/pokemonInfoMock'
import PokemonItem from '../components/PokemonItem.vue'

const allPokemons = ref<PokemonInfo[]>([...pokemonInfomock])
const pokemonsToDisplay = ref<PokemonInfo[]>([...pokemonInfomock])

const updateSearchTerm = (newSearchTerm: string) => {
  const filteredPokemons = allPokemons.value.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(newSearchTerm.toLowerCase())
  })
}

const updateFavorite = (id: number) => {
  const indexOfFavorite = pokemonsToDisplay.value.findIndex((pokemon) => pokemon.id === id)
  if (indexOfFavorite !== -1) {
    pokemonsToDisplay.value[indexOfFavorite].favorite =
      !pokemonsToDisplay.value[indexOfFavorite].favorite
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  background-color: #f9f9f9;
  height: 100vh;
  gap: 1rem;
}

.list {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 0.5rem;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
