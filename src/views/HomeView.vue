<template>
  <div class="pokedex-container">
    <div class="img-container">
      <img class="pika-img" src="../assets/image.png" alt="pokedex" />
    </div>
    <h2 class="welcome-header">Welcome to the Pokedex</h2>
    <div class="pokedex-description">
      <p>The digital encyclopedia created by Professor Oak is an invaluable tool</p>
      <p>to Trainers in the Pokemon world.</p>
    </div>
    <ActionBtn msg="Get Started" :clickFn="goToDashboard" />
  </div>
</template>

<script setup lang="ts">
import ActionBtn from '../components/ActionBtn.vue'
const goToDashboard = () => {
  alert('Go to Dashboard')
}
</script>

<style scoped>
.pokedex-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
  padding: 2rem;
  width: 100%;
  height: 100vh; /* Ensure it takes the full viewport height */
  box-sizing: border-box;
  overflow: hidden; /* Prevent scrolling */
}

.img-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.pika-img {
  max-width: 30%;
  height: auto;
}

.welcome-header {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  margin-bottom: 1rem;
  text-align: center;
}

.pokedex-description {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  row-gap: 0.2rem;
  margin-bottom: 1.5rem;
}

.pokedex-description p {
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  margin: 0;
  color: #5e5e5e;
}

@media (min-width: 768px) {
  .pokedex-container {
    padding: 3rem;
  }

  .welcome-header {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  .pokedex-description {
    row-gap: 0.5rem;
  }

  .pokedex-description p {
    font-size: 1.125rem;
  }
}

@media (min-width: 1024px) {
  .pokedex-container {
    padding: 4rem;
  }

  .welcome-header {
    margin-bottom: 2rem;
    font-size: 2rem;
  }

  .pokedex-description p {
    font-size: 1.25rem;
  }
}
</style>
