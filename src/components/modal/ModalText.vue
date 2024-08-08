import { defineProps } from 'vue';
<template>
  <div class="modal-info">
    <p>{{ atribute }}: {{ value }}</p>
    <hr class="solid" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  atribute: string
  value: string
}>()
</script>

<style scoped>
.modal-info {
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: center;
  gap: 2px;
  margin-left: 10px;
}
.modal-info p {
  font-size: 1.125rem;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  color: #5e5e5e;
  margin-top: 2px;
}

hr.solid {
  border-top: 1px solid #e8e8e8;
  margin-bottom: 0px;
  width: 100%;
}
</style>
