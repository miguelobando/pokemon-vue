<template>
  <button class="btn" @click="clickFn">{{ msg }}</button>
</template>

<script setup lang="ts">
const props = defineProps<{
  msg: string
  clickFn: (event: MouseEvent) => void
}>()
</script>

<style scoped>
.btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.6875rem 1.25rem;
  gap: 0.625rem;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.375rem;
  background: #f22539;
  border-radius: 3.75rem;
  color: white;
  border: none;
}
</style>
