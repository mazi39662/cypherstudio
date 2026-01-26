<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const router = useRouter()
const route = useRoute()

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav 
    :class="[
      'fixed w-full z-50 transition-all duration-300 px-6 py-4',
      isScrolled ? 'glass py-3' : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div 
        @click="router.push('/')" 
        class="flex items-center gap-3 cursor-pointer group"
      >
        <div class="w-10 h-10 rounded-xl overflow-hidden transition-all duration-500 group-hover:scale-110">
          <img src="/logo.png" alt="Cypher Studio Logo" class="w-full h-full object-contain mix-blend-screen" />
        </div>
        <span class="text-xl font-bold tracking-tight text-white">
          Cypher<span class="text-primary text-2xl leading-none">.</span>Studio
        </span>
      </div>

      <!-- Desktop Menu -->
      <div v-if="route.path === '/'" class="hidden md:flex items-center gap-10">
        <a href="#apps" class="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-all">Project Gallery</a>
        <a href="#vision" class="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-all">Our Vision</a>
        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLSeNiiEy_hfYk9hG4Aqo3vjeBHm2dVRQ6NernDkF8glU-5O9GA/viewform?usp=publish-editor"
          target="_blank"
          class="px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all shadow-lg hover:shadow-white/10"
        >
          Test the App
        </a>
      </div>
      <div v-else class="hidden md:flex items-center gap-10">
        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLSeNiiEy_hfYk9hG4Aqo3vjeBHm2dVRQ6NernDkF8glU-5O9GA/viewform?usp=publish-editor"
          target="_blank"
          class="px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all shadow-lg hover:shadow-white/10"
        >
          Test the App
        </a>
      </div>

      <!-- Mobile Toggle -->
      <button 
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="md:hidden p-2 text-gray-400 hover:text-white"
      >
        <Menu v-if="!isMobileMenuOpen" />
        <X v-else />
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 top-[64px] bg-background md:hidden p-6 gap-6 flex flex-col items-center justify-center text-center">
        <template v-if="route.path === '/'">
          <a @click="isMobileMenuOpen = false" href="#apps" class="text-2xl font-semibold">Project Gallery</a>
          <a @click="isMobileMenuOpen = false" href="#vision" class="text-2xl font-semibold">Our Vision</a>
        </template>
        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLSeNiiEy_hfYk9hG4Aqo3vjeBHm2dVRQ6NernDkF8glU-5O9GA/viewform?usp=publish-editor"
          target="_blank"
          class="w-full max-w-xs py-4 rounded-2xl bg-primary text-white text-lg font-bold"
        >
          Test the App
        </a>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
