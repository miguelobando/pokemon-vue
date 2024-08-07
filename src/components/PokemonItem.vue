<template>
  <div class="pokemon-item">
    <p class="text-info">{{ pokemon.name }}</p>
    <div v-if="pokemon.favorite">
      <img
        @click="handleFavorite"
        src="@/assets/selected-star.svg"
        alt="Selected Star"
        class="select-info-img"
      />
    </div>
    <div v-else>
      <img
        @click="handleFavorite"
        src="@/assets/non-selected-star.svg"
        alt="Non Selected Star"
        class="select-info-img"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { PokemonInfo } from '../interfaces/PokemonInfo'

const props = defineProps<{
  pokemon: PokemonInfo
}>()

const emit = defineEmits<{
  (e: 'update-favorite', id: number): void
}>()

const handleFavorite = () => {
  emit('update-favorite', props.pokemon.id)
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
}
</style>
