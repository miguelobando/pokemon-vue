<template>
  <div class="footer">
    <div class="footer-content">
      <IconActionBtn actionType="all" msg="All" :clickFn="goToDashboard" />
      <IconActionBtn actionType="favorites" msg="Favorites" :clickFn="goToFavorites" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import IconActionBtn from './FooterBtn.vue'

const goToDashboard = () => {
  router.push('/dashboard')
}

const goToFavorites = () => {
  router.push('/favorites')
}

const isSticky = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY
    if (scrolled >= window.innerHeight * 0.9) {
      isSticky.value = true
    } else {
      isSticky.value = false
    }
  })
})
</script>

<style scoped>
.footer-content {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 3rem;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  background-color: #fff;
  color: #fff;
  text-align: center;
  transition: transform 0.3s ease-in-out;
}

.footer.sticky {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  background-color: #333;
  color: #fff;
  text-align: center;

  /* Position the sticky footer at the bottom of the page */
  transform: translateY(calc(-100% - 2rem));
}

/* Hide the sticky footer on mobile devices */
@media only screen and (max-width: 600px) {
  .footer {
    position: relative;
    bottom: auto;
    left: auto;
    width: 100%;
    padding: 1rem;
    background-color: #333;
    color: #fff;
    text-align: center;

    /* Add some margin to the footer for better spacing */
    margin-top: 2rem;
  }
}
</style>
