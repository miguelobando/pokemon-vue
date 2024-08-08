<template>
  <div class="pokemon-image-container">
    <div class="header">
      <button class="close-button" @click="closeModal">&times;</button>
    </div>
    <div class="image" :style="{ backgroundImage: `url(${backgroundUrl})` }">
      <img :src="imageUrl" alt="Pokemon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import backgroundUrl from '@/assets/modal-background.png'

defineProps<{
  imageUrl: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.pokemon-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-radius: 0.5rem 0.5rem 0 0;
  margin-bottom: 20px;
}

.header {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
}

.image {
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
}

.image img {
  min-width: 256px;
  min-height: 256px;
}
</style>
