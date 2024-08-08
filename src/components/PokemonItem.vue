<template>
  <div class="pokemon-item">
    <p class="text-info" @click="openDetailsModal">{{ pokemon.name }}</p>
    <div v-if="pokemon.favorite" class="favorite-icon">
      <div @click="handleFavorite">
        <starIcon />
      </div>
    </div>
    <div v-else class="non-favorite-icon">
      <div @click="handleFavorite">
        <nonStarIcon />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import starIcon from '../assets/selected-star.svg'
import nonStarIcon from '../assets/non-selected-star.svg'
import type { PokemonWithURL } from '@/interfaces/ApiResponses'

const props = defineProps<{
  pokemon: PokemonWithURL
}>()

const emit = defineEmits<{
  (e: 'update-favorite', name: string): void
  (e: 'open-details-modal', pokemonURL: string): void
}>()

const handleFavorite = () => {
  emit('update-favorite', props.pokemon.name)
}

const openDetailsModal = () => {
  emit('open-details-modal', props.pokemon.url)
}
</script>

<style scoped>
.pokemon-item {
  width: 50vw;
  height: 10vh;
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.select-info-img {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.text-info {
  margin-right: 10px;
  font-size: 1.125rem;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  cursor: pointer;
}
</style>
