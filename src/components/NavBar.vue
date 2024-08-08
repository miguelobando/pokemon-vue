<template>
  <div :class="['footer', { sticky: isSticky }]">
    <div class="footer-content">
      <IconActionBtn actionType="all" msg="All" :clickFn="goToDashboard" />
      <IconActionBtn actionType="favorites" msg="Favorites" :clickFn="goToFavorites" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import IconActionBtn from './FooterBtn.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToDashboard = () => {
  router.push('/dashboard')
}

const goToFavorites = () => {
  router.push('/favorites')
}

const isSticky = ref(false)

const handleScroll = () => {
  const scrolled = window.scrollY
  if (scrolled >= window.innerHeight * 0.9) {
    isSticky.value = true
  } else {
    isSticky.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  background-color: #fff;
  color: #333;
  text-align: center;
  transition: transform 0.3s ease-in-out;
}

.footer.sticky {
  transform: translateY(0);
}

.footer-content {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 3rem;
}

@media only screen and (max-width: 600px) {
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    padding: 1rem;
    background-color: #fff;
    color: #333;
    text-align: center;
  }

  .footer-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
}
</style>
