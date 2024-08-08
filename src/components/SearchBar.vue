<template>
  <label class="search-bar">
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      stroke-width="2"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="search-icon"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
    <input @input="handleSearch" placeholder="Search" type="search" class="search-input" />
  </label>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update-search-term', searchTerm: string): void
}>()

const handleSearch = (event: Event) => {
  const input = event.target as HTMLInputElement
  emit('update-search-term', input.value)
}
</script>

<style scoped>
body {
  background: #f5f5f6;
}

.search-bar {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  width: 50vw;
  max-width: 400px;
  background: #fff;
  border-radius: 5px;
  padding: 10px 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-icon {
  flex-shrink: 0;
  margin-right: 10px;
  color: #cfd5db;
}

.search-input {
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  color: #6c757d;
}

.search-input::placeholder {
  color: #cfd5db;
}
</style>
