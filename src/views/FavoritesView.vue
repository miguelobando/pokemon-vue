<template>
  <div class="container">
    <div class="header">
      <SearchBar @update-search-term="updateSearchTerm" />
    </div>

    <div v-if="pokemonsToDisplay.length === 0">
      <NotFoundPokemon @goBackHome="goBackHome" />
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
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import DetailsModal from '../components/modal/DetailsModal.vue'
import PokemonItem from '../components/PokemonItem.vue'
import { pokemonInfomock } from '@/components/mocks/pokemonInfoMock'
import NotFoundPokemon from '../components/NotFoundPokemon.vue'
import type { PokemonWithURL } from '@/interfaces/ApiResponses'
import { useAllPokemonsStore } from '@/stores/useAllPokemonsStore'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { usePokeApi } from '@/composables/usePokeAPI'
import type { PokemonInfo } from '@/interfaces/PokemonInfo'
const { updateFavoritePokemons, recoverFavoritePokemons } = useLocalStorage()
const { getPokemonByName } = usePokeApi()
const pokemonStore = useAllPokemonsStore()
import router from '@/router'

const pokemonsToDisplay = ref<PokemonWithURL[]>([])

const detailedPokemon = ref<PokemonInfo>(pokemonInfomock[0])
const isModalVisible = ref(false)

const goBackHome = () => {
  router.push('/dashboard')
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
      const getFavorite = recoverFavoritePokemons()
      const isFavorite = getFavorite.includes(pokemon.name)

      detailedPokemon.value = {
        ...pokemon,
        favorite: isFavorite
      }
      isModalVisible.value = true
    } else {
      console.error('pokemon not found')
    }
  })
}

const closeModal = () => {
  isModalVisible.value = false
}

const updateSearchTerm = (newSearchTerm: string) => {
  const favoriteList = recoverFavoritePokemons()
  const toReset = pokemonStore.getAllPokemons.filter((pokemon) =>
    favoriteList.includes(pokemon.name)
  )

  if (newSearchTerm === '' && pokemonsToDisplay.value.length === 0) {
    pokemonsToDisplay.value = [...toReset]
    return
  }

  const filteredPokemons = toReset.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(newSearchTerm.toLowerCase())
  })

  pokemonsToDisplay.value = filteredPokemons
}

const removeDuplicates = (pokemons: PokemonWithURL[]) => {
  const uniquePokemons = pokemons.filter((pokemon, index) => {
    return pokemons.findIndex((p) => p.name === pokemon.name) === index
  })

  pokemonsToDisplay.value = uniquePokemons
}

onMounted(() => {
  const allPokemons = pokemonStore.getAllPokemons

  const favorites = recoverFavoritePokemons()

  const filteredFavorites = allPokemons.filter((pokemon) => {
    return favorites.includes(pokemon.name)
  })

  removeDuplicates(filteredFavorites)
})
</script>

<style scoped>
.header {
  width: 50%;
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

@media only screen and (min-device-width: 600px) {
  .container {
  }
}
</style>
