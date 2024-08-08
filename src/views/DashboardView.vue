<template>
  <div class="container">
    <div v-if="isLoading" class="loader"><loader /></div>
    <div v-else class="container">
      <div class="header">
        <SearchBar @update-search-term="updateSearchTerm" />
      </div>

      <div v-if="pokemonsToDisplay.length === 0">
        <NotFoundPokemon />
      </div>
      <div v-else>
        <div class="list">
          <div v-for="pokemon in pokemonsToDisplay" :key="pokemon.name">
            <PokemonItem
              :pokemon="pokemon"
              @update-favorite="updateFavorite"
              @open-details-modal="openDetailsModal"
            />
          </div>
        </div>
      </div>

      <DetailsModal
        @update-favorite="updateFavorite"
        :pokemon="detailedPokemon"
        v-if="isModalVisible"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import { pokemonInfomock } from '@/components/mocks/pokemonInfoMock'
import PokemonItem from '../components/PokemonItem.vue'
import NotFoundPokemon from '../components/NotFoundPokemon.vue'
import DetailsModal from '../components/modal/DetailsModal.vue'
import type { PokemonInfo } from '@/interfaces/PokemonInfo'
import { usePokeApi } from '@/composables/usePokeAPI'
import type { PokemonWithURL } from '@/interfaces/ApiResponses'
import { fillFavorites } from '@/utils/fillFavorites'
import { useAllPokemonsStore } from '@/stores/useAllPokemonsStore'
import { useLocalStorage } from '@/composables/useLocalStorage'
import loader from '@/assets/loader.svg'

const { getAllPokemons, isLoading, getPokemonByName } = usePokeApi()
const { recoverFavoritePokemons, updateFavoritePokemons } = useLocalStorage()
const allPokemonsStore = useAllPokemonsStore()

const allPokemons = ref<PokemonWithURL[]>([])
const pokemonsToDisplay = ref<PokemonWithURL[]>([])
const isModalVisible = ref(false)

const detailedPokemon = ref<PokemonInfo>(pokemonInfomock[0])

onMounted(() => {
  getAllPokemons().then((data) => {
    const localFavoritePokemons = recoverFavoritePokemons()
    const filteredFavoritePokemons = fillFavorites(data, localFavoritePokemons)
    allPokemonsStore.populateAllPokemons(filteredFavoritePokemons)
    pokemonsToDisplay.value = filteredFavoritePokemons
  })
})

const updateSearchTerm = (newSearchTerm: string) => {
  if (newSearchTerm === '') {
    pokemonsToDisplay.value = [...allPokemons.value]
    return
  }

  const filteredPokemons = allPokemons.value.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(newSearchTerm.toLowerCase())
  })

  pokemonsToDisplay.value = filteredPokemons
}

const updateFavorite = (name: string) => {
  const indexOfFavorite = pokemonsToDisplay.value.findIndex((pokemon) => pokemon.name === name)
  if (indexOfFavorite !== -1) {
    pokemonsToDisplay.value[indexOfFavorite].favorite =
      !pokemonsToDisplay.value[indexOfFavorite].favorite
  }
  updateFavoritePokemons(name)
}

const openDetailsModal = async (pokemonName: string) => {
  getPokemonByName(pokemonName.toLowerCase()).then((pokemon) => {
    if (pokemon) {
      detailedPokemon.value = pokemon
      isModalVisible.value = true
    } else {
      console.error('pokemon not found')
    }
  })
}

const closeModal = () => {
  isModalVisible.value = false
}
</script>

<style scoped>
.loader {
  margin-top: 40vh;
  animation: breathing 2s ease-in-out infinite;
}

@keyframes breathing {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.header {
  width: 100%;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  background-color: #f9f9f9;
  min-height: 100vh;
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
