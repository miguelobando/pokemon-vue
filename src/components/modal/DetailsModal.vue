<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <div class="modal-content" role="dialog" aria-modal="true">
        <ModalImage :imageUrl="pokemon.imageURL" @close="closeModal" />
        <ModalText atribute="Name" :value="pokemon.name" />
        <ModalText atribute="Weight" :value="pokemon.weight.toString()" />
        <ModalText atribute="Height" :value="pokemon.height.toString()" />
        <ModalText atribute="Types" :value="pokemon.types.join(', ')" />
        <div class="modal-actions">
          <ActionBtn msg="Share with my friends" :clickFn="shareWithFriends" />
          <div class="favorite-button">
            <div v-if="favoriteStatus" class="favorite-icon">
              <div @click="handleFavorite">
                <selected />
              </div>
            </div>
            <div v-else class="non-favorite-icon">
              <div @click="handleFavorite">
                <nonSelected />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PokemonInfo } from '@/interfaces/PokemonInfo'
import ModalText from './ModalText.vue'
import ModalImage from './ModalImage.vue'
import ActionBtn from '../ActionBtn.vue'
import nonSelected from '../../assets/non-selected-star.svg'
import selected from '../../assets/selected-star.svg'
import { ref } from 'vue'
const props = defineProps<{
  pokemon: PokemonInfo
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update-favorite', name: string): void
}>()

const handleFavorite = () => {
  emit('update-favorite', props.pokemon.name)
  favoriteStatus.value = !favoriteStatus.value
}

const favoriteStatus = ref(!props.pokemon.favorite)

const closeModal = () => {
  emit('close')
}

const shareWithFriends = async () => {
  const informationToShare = `${props.pokemon.name} is a ${props.pokemon.types.join(', ')} Pokemon with a weight of ${props.pokemon.weight} and a height of ${props.pokemon.height}`
  await navigator.clipboard.writeText(informationToShare)
  alert(`${props.pokemon.name} information has been copied to your clipboard`)
}
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
}

.modal-content {
  background-color: white;
  color: black;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  width: 35rem;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  padding: 1rem 2.5rem;
}

.button-yes:hover {
  background-color: #0056b3;
}
</style>
