<template>
  <button
    :class="{
      'action-type-active': props.active === true,
      'action-type-inactive': props.active === false
    }"
    @click="clickFn"
  >
    <allIcon v-if="props.actionType === 'all'" />
    <starIcon v-else-if="props.actionType === 'favorites'" />
    {{ msg }}
  </button>
</template>

<script setup lang="ts">
import allIcon from '../assets/all.svg'
import starIcon from '../assets/star.svg'
const props = defineProps<{
  msg: string
  clickFn: (event: MouseEvent) => void
  actionType: 'all' | 'favorites'
  active: boolean
}>()
</script>

<style scoped>
button {
  display: flex;
  width: 30vw;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 0.6875rem 10rem;
  gap: 0.625rem;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.375rem;
  background: var(--background-color);
  border-radius: 3.75rem;
  color: var(--text-color);
  border: none;
}

.action-type-active {
  background: #f22539;
  color: white;
}

.action-type-inactive {
  background: #bfbfbf87;
  color: white;
}
@media only screen and (max-width: 600px) {
  button {
    width: 50%;
    padding: 0.6875rem 0.5rem;
  }
}
</style>
