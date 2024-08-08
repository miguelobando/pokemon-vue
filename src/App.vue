<template>
  <header>
    <link
      href="https://fonts.googleapis.com/css?family=Lato:400,700"
      rel="stylesheet"
      type="text/css"
    />
  </header>
  <RouterView />
  <div v-show="router.currentRoute.value.path != '/'">
    <FooterBar />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import router from './router'
import FooterBar from './components/NavBar.vue'
</script>

<style scoped></style>
