<script setup lang="ts">
import { projects } from '../data/projects'
import { useRouter } from 'vue-router'
import { ChevronRight, Sparkles, MessageSquare, ShieldCheck, Code2, Layers, Bell } from 'lucide-vue-next'

const router = useRouter()

const iconMap: Record<string, any> = {
  MessageSquare,
  ShieldCheck,
  Code2,
  Layers,
  Bell
}

const navigateToProject = (id: string) => {
  router.push(`/app/${id}`)
}
</script>

<template>
  <div class="overflow-hidden">
    <!-- Hero Section -->
    <section class="relative pb-20 px-6">
      <div class="absolute inset-0 z-0">
        <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full"></div>
        <div class="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-accent/10 blur-[100px] rounded-full"></div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10 text-center">
        <div class="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] mb-10 animate-fade-in group hover:border-primary/30 transition-all duration-500">
          <img src="/logo.png" class="w-4 h-4 object-contain group-hover:scale-110 transition-transform mix-blend-screen" />
          <span class="text-gray-400 group-hover:text-primary transition-colors">Product of W4k1</span>
        </div>
        
        <h1 class="text-6xl md:text-8xl font-black mb-10 tracking-[-0.04em] leading-[0.9] animate-slide-up ">
          Designing the<br /> 
          <span class="text-gradient-primary">Standard</span> of {{ new Date().getFullYear() }}.
        </h1>
        
        <p class="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-14 animate-slide-up animation-delay-100 font-medium leading-relaxed">
          Crafting premium digital experiences that blend aesthetic utility with high-performance engineering. Join the elite circle of early adopters.
        </p>

        <div class="flex flex-col sm:flex-row gap-5 justify-center animate-slide-up animation-delay-200">
          <a href="#apps" class="px-10 py-5 rounded-full bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-all shadow-xl hover:shadow-white/5 flex items-center justify-center gap-3">
            Enter Gallery
            <ChevronRight class="w-4 h-4" />
          </a>
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSeNiiEy_hfYk9hG4Aqo3vjeBHm2dVRQ6NernDkF8glU-5O9GA/viewform?usp=publish-editor"
            target="_blank"
            class="px-10 py-5 rounded-full glass text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center"
          >
            Test the App
          </a>
        </div>
      </div>
    </section>

    <!-- Apps Gallery -->
    <section id="apps" class="py-24 px-6 bg-[#080808]">
      <div class="max-w-7xl mx-auto">
        <div class="mb-16">
          <h2 class="text-4xl font-bold mb-4">Project Gallery</h2>
          <p class="text-gray-500">Click on any project to explore its features and try the demo.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto gap-12 px-4">
          <div 
            v-for="project in projects" 
            :key="project.id"
            @click="navigateToProject(project.id)"
            class="group cursor-pointer relative"
          >
            <!-- High-Impact Background Glow -->
            <div 
              class="absolute -inset-1 rounded-[48px] opacity-20 group-hover:opacity-40 blur-2xl transition-all duration-700"
              :style="{ background: `linear-gradient(135deg, ${project.color}, transparent)` }"
            ></div>

            <div class="glass-card p-12 md:p-14 rounded-[48px] h-full flex flex-col relative overflow-hidden group border border-white/[0.05] hover:border-primary/30 transition-all duration-700 bg-black/40 backdrop-blur-3xl">
              <!-- Top Row: Status & Icon -->
              <div class="flex justify-between items-start mb-12">
                <div 
                  v-if="project.logoUrl"
                  class="w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 bg-white p-3 shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]"
                >
                  <img :src="project.logoUrl" class="w-full h-full object-contain" />
                </div>
                <div 
                  v-else
                  class="w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:-rotate-3 shadow-2xl"
                  :style="{ background: `${project.color}15`, border: `1px solid ${project.color}40` }"
                >
                  <component :is="iconMap[project.icon]" class="w-10 h-10" :style="{ color: project.color }" />
                </div>

                <div class="px-3 py-1 rounded-full border border-white/10 text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 group-hover:text-primary group-hover:border-primary/30 transition-colors">
                  <!-- {{ project.id === 'notibee' ? 'Active Beta' : 'Proprietary' }} -->
                  Active Beta
                </div>
              </div>
              
              <div class="flex-grow">
                <h3 class="text-4xl font-black mb-4 tracking-tight group-hover:text-white transition-colors">{{ project.name }}</h3>
                <p class="text-gray-400 text-lg leading-relaxed mb-12 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                  {{ project.tagline }}
                </p>
              </div>
              
              <!-- Bottom Row: CTA -->
              <div class="flex items-center justify-between pt-8 border-t border-white/[0.05]">
                <div class="flex items-center gap-4 text-primary font-black text-xs tracking-[0.3em] uppercase">
                  <span>Explore App</span>
                  <div class="w-10 h-px bg-primary/30 group-hover:w-16 transition-all duration-500"></div>
                </div>
                <div class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-black transition-all duration-500">
                  <ChevronRight class="w-5 h-5" />
                </div>
              </div>

              <!-- Animated Internal Glow -->
              <div 
                class="absolute -bottom-20 -left-20 w-64 h-64 blur-[100px] opacity-10 group-hover:opacity-30 transition-all duration-700 pointer-events-none"
                :style="{ background: project.color }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision Section -->
    <section id="vision" class="py-24 px-6 relative">
      <div class="max-w-7xl mx-auto">
        <div class="glass border border-white/5 rounded-[48px] p-8 md:p-20 overflow-hidden relative">
          <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>
          
          <div class="max-w-3xl mx-auto text-center relative z-10">
            <h2 class="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
              We're not just building apps. <br />
              <span class="text-primary">We're building experiences.</span>
            </h2>
            <p class="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed font-medium">
              At Cypher Studio, we believe that technology should be invisible. Our goal is to create tools that feel like an extension of your mind—intuitive, responsive, and powerful.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.animation-delay-100 { animation-delay: 0.1s; }
.animation-delay-200 { animation-delay: 0.2s; }

[id] {
  scroll-margin-top: 100px;
}
</style>
