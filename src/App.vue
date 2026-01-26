<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import InteractiveBackground from './components/InteractiveBackground.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col selection:bg-primary/30 selection:text-white scroll-smooth relative">
    <InteractiveBackground />
    <Navbar class="relative z-20" />
    <main class="flex-grow relative z-10">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    <Footer />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
