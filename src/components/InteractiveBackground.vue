<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { animate } from 'animejs'

const containerRef = ref<HTMLElement | null>(null)
const orbs = [
  { id: 1, size: 'w-[80vw] h-[80vw]', color: 'bg-primary/20', initial: { x: '-20%', y: '-20%' } },
  { id: 2, size: 'w-[60vw] h-[60vw]', color: 'bg-primary/10', initial: { x: '60%', y: '30%' } },
  { id: 3, size: 'w-[90vw] h-[90vw]', color: 'bg-primary/10', initial: { x: '10%', y: '60%' } },
]

const handleMouseMove = (e: MouseEvent) => {
  const { clientX, clientY } = e
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2
  
  const moveX = (clientX - centerX) / 8
  const moveY = (clientY - centerY) / 8

  animate('.ambient-orb', {
    translateX: (_el: any, i: number) => moveX * (i + 1) * 0.3,
    translateY: (_el: any, i: number) => moveY * (i + 1) * 0.3,
    duration: 800,
    ease: 'outQuad'
  })

  animate('.bg-grid', {
    translateX: moveX * 0.1,
    translateY: moveY * 0.1,
    duration: 1000,
    ease: 'outQuad'
  })

  animate('.bg-particle', {
    translateX: (_el: any, i: number) => moveX * (i % 2 === 0 ? 1 : -1) * 1.5,
    translateY: (_el: any, i: number) => moveY * (i % 2 === 0 ? 1 : -1) * 1.5,
    duration: 1200,
    ease: 'outQuad'
  })
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  
  // Ambient breathing animation for orbs
  animate('.ambient-orb', {
    scale: [1, 1.1],
    opacity: [0.1, 0.3],
    duration: 10000,
    direction: 'alternate',
    loop: true,
    ease: 'inOutSine',
    delay: (i: any) => i * 2000
  })

  // Dynamic float for particles
  animate('.bg-particle', {
    translateY: [-40, 40],
    duration: 6000,
    direction: 'alternate',
    loop: true,
    ease: 'inOutQuad',
    delay: (_el: any, i: number) => i * 150
  })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div ref="containerRef" class="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020202]">
    <!-- Technical Grid Layer -->
    <div class="bg-grid absolute inset-[-10%] opacity-[0.03] scale-110" 
      style="background-image: linear-gradient(#FFD700 1px, transparent 1px), linear-gradient(90deg, #FFD700 1px, transparent 1px); background-size: 60px 60px;">
    </div>

    <!-- Ambient Orbs -->
    <div 
      v-for="orb in orbs" 
      :key="orb.id"
      class="ambient-orb absolute rounded-full blur-[180px] mix-blend-screen"
      :class="[orb.size, orb.color]"
      :style="{ left: orb.initial.x, top: orb.initial.y }"
    ></div>

    <!-- Floating Particles -->
    <div 
      v-for="i in 30" 
      :key="i"
      class="bg-particle absolute w-1.5 h-1.5 bg-primary/40 rounded-full"
      :style="{ 
        left: `${Math.random() * 100}%`, 
        top: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.7 + 0.3
      }"
    ></div>

    <!-- Radial Vignette -->
    <div class="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/80"></div>
  </div>
</template>

<style scoped>
.ambient-orb, .bg-particle, .bg-grid {
  will-change: transform;
}

.bg-radial-gradient {
  background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%);
}
</style>
