<template>
  <div class="not-found-countainer">
    <h2>Uh-oh!</h2>
    <p>You look lost on your journey!</p>
    <ActionBtn msg="Go Back Home" :clickFn="goToHome" />
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import ActionBtn from './ActionBtn.vue'

const goToHome = () => {
  router.push('/')
  router.go(0)
}
</script>

<style scoped>
h2 {
  font-size: 3rem;
  margin-top: 2rem;
  margin-bottom: 1px;
  font: Lato, sans-serif;
}

p {
  margin-top: 0.5rem;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font: Lato, sans-serif;
}

.not-found-countainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
  gap: 1px;
}
</style>
