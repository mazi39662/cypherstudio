<script setup lang="ts">
import { computed, ref } from 'vue'
import { projects } from '../data/projects'
import { ChevronRight, Play, CheckCircle2, ArrowLeft, MessageSquare, ShieldCheck, Code2, Layers, Bell, Sparkles, Rocket, Smartphone, Globe } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const project = computed(() => projects.find(p => p.id === props.id))

const iconMap: Record<string, any> = {
  MessageSquare,
  ShieldCheck,
  Code2,
  Layers,
  Bell
}

const isVideo = (url: string) => url.endsWith('.mp4') || url.endsWith('.webm')
const isImage = (url: string) => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url)

const galleryRef = ref<HTMLElement | null>(null)

const scrollGallery = (direction: number) => {
  if (galleryRef.value) {
    const scrollAmount = galleryRef.value.clientWidth * 0.8
    galleryRef.value.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    })
  }
}

if (!project.value) {
  router.push('/')
}
</script>

<template>
  <div v-if="project" class="min-h-screen">
    <!-- Hero / Header -->
    <header class="max-w-7xl mx-auto px-6 py-12">
      <button 
        @click="router.push('/')"
        class="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group"
      >
        <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Gallery
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div 
            v-if="project.logoUrl"
            class="w-24 h-24 md:w-28 md:h-28 rounded-3xl mb-8 flex items-center justify-center overflow-hidden bg-white/5 border border-white/10 shadow-2xl"
          >
            <img :src="project.logoUrl" class="w-full h-full object-contain p-4 mix-blend-screen" />
          </div>
          <div 
            v-else
            class="w-20 h-20 rounded-3xl mb-8 flex items-center justify-center"
            :style="{ background: `${project.color}20` }"
          >
            <component :is="iconMap[project.icon]" class="w-10 h-10" :style="{ color: project.color }" />
          </div>
          
          <h1 class="text-4xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1]">
            {{ project.name }}
          </h1>
          
          <p class="text-xl md:text-2xl text-gray-400 mb-10 leading-relaxed max-w-xl">
            {{ project.tagline }}
          </p>

          <div class="flex flex-wrap gap-4 mb-14">
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSeNiiEy_hfYk9hG4Aqo3vjeBHm2dVRQ6NernDkF8glU-5O9GA/viewform?usp=publish-editor"
              target="_blank"
              class="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-black font-extrabold hover:bg-gray-200 transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_-15px_rgba(255,255,255,0.3)] group relative overflow-hidden active:scale-95"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Rocket class="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Test the APP
            </a>
          </div>

          <div class="grid grid-cols-3 gap-4 md:gap-8 pt-12 border-t border-white/10">
            <div v-for="stat in project.stats" :key="stat.label" class="text-center lg:text-left">
              <div class="text-xl md:text-3xl font-black mb-1 text-white">{{ stat.value }}</div>
              <div class="text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.2em] font-black">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <div class="relative group flex justify-center lg:justify-end mt-8 lg:mt-0">
          <div 
            class="absolute -inset-10 rounded-[40px] blur-[120px] opacity-30 pointer-events-none transition-all duration-1000 group-hover:opacity-50"
            :style="{ background: project.color }"
          ></div>
          <!-- Premium Media Container -->
          <div class="relative glass rounded-[40px] overflow-hidden bg-[#0a0a0a]/80 backdrop-blur-2xl flex items-center justify-center shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10 group h-[500px] md:h-[600px] lg:h-[700px] w-full max-w-[320px] sm:max-w-[360px] lg:max-w-md mx-auto">
            <video 
              v-if="isVideo(project.mediaUrl)"
              :src="project.mediaUrl"
              class="w-full h-full object-cover"
              autoplay
              loop
              muted
              playsinline
            ></video>
            <img 
              v-else
              :src="project.mediaUrl" 
              :alt="project.name"
              class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </header>

    <!-- Content Sections -->
    <main class="bg-[#080808] border-t border-white/5 py-24 px-6 mt-12">
      <div class="max-w-7xl mx-auto">
        <!-- Media Gallery -->
        <div v-if="project.screenshots && project.screenshots.length > 0" class="mb-24 relative group/gallery">
          <div class="flex items-center justify-between mb-8 px-2">
            <h3 class="text-xl font-bold flex items-center gap-2">
              <div class="w-1 h-6 bg-primary rounded-full"></div>
              App Screenshots
            </h3>
            <div class="hidden md:flex gap-2">
              <button 
                @click="scrollGallery(-1)"
                class="p-2 rounded-full glass hover:bg-white/10 transition-colors"
              >
                <ArrowLeft class="w-5 h-5" />
              </button>
              <button 
                @click="scrollGallery(1)"
                class="p-2 rounded-full glass hover:bg-white/10 transition-colors"
                >
                <ChevronRight class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div 
            ref="galleryRef"
            class="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x cursor-grab active:cursor-grabbing"
          >
            <div 
              v-for="(screen, idx) in project.screenshots" 
              :key="idx"
              class="min-w-[280px] md:min-w-[320px] aspect-[9/16] rounded-[32px] overflow-hidden glass border border-white/10 snap-center shadow-2xl flex-shrink-0"
            >
              <img :src="screen" :alt="`${project.name} screenshot ${idx + 1}`" class="w-full h-full object-cover pointer-events-none" />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div class="md:col-span-2 space-y-16">
            <!-- Long Description -->
            <div>
              <h2 class="text-3xl font-bold mb-8 italic">"{{ project.description }}"</h2>
              <div class="prose prose-invert max-w-none text-gray-400 text-lg leading-relaxed whitespace-pre-line">
                {{ project.longDescription }}
              </div>
            </div>

            <!-- About Section -->
            <div v-if="project.about" class="p-8 md:p-12 rounded-[32px] bg-white/[0.02] border border-white/5">
              <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Sparkles class="w-4 h-4 text-primary" />
                </div>
                Behind the Project
              </h3>
              <p class="text-gray-400 text-lg leading-relaxed">
                {{ project.about }}
              </p>
            </div>

            <!-- Purpose Section -->
            <div v-if="project.purpose" class="border-l-2 border-primary/30 pl-8">
              <h3 class="text-xl font-bold mb-4 uppercase tracking-widest text-primary/80">Our Mission</h3>
              <p class="text-gray-400 text-lg leading-relaxed">
                {{ project.purpose }}
              </p>
            </div>
          </div>

          <div class="space-y-12">
            <div>
              <h3 class="text-xl font-bold mb-8 flex items-center gap-2">
                <CheckCircle2 class="w-5 h-5 text-accent" />
                Key Capabilities
              </h3>
              <ul class="space-y-6">
                <li v-for="feature in project.features" :key="feature" class="flex gap-4">
                  <div class="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0"></div>
                  <span class="text-gray-300 font-medium">{{ feature }}</span>
                </li>
              </ul>
            </div>
            
            <div class="p-8 rounded-3xl glass border-primary/20 border">
              <h4 class="font-bold mb-2">Be an alpha tester</h4>
              <p class="text-sm text-gray-500 mb-6">Help us refine {{ project.name }} before the global launch.</p>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSeNiiEy_hfYk9hG4Aqo3vjeBHm2dVRQ6NernDkF8glU-5O9GA/viewform?usp=publish-editor"
                target="_blank"
                class="block w-full py-3 rounded-xl bg-primary text-white text-center font-bold hover:bg-primary-hover transition-all"
              >
                Submit Application
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Dynamic Onboarding Section -->
    <section class="py-32 px-6 text-center max-w-7xl mx-auto">
      <div class="glass p-10 md:p-24 rounded-[64px] border border-white/10 relative overflow-hidden shadow-3xl">
        <!-- Animated Background Aura -->
        <div 
          class="absolute inset-0 blur-[150px] opacity-10 pointer-events-none animate-pulse"
          :style="{ background: `radial-gradient(circle, ${project.color} 0%, transparent 70%)` }"
        ></div>
        
        <h2 class="text-3xl md:text-5xl font-black mb-8 relative z-10 tracking-tight">How to get started</h2>
        <p class="text-gray-400 max-w-2xl mx-auto mb-16 relative z-10 text-lg md:text-xl leading-relaxed font-medium">
          Fill up the Google Form by clicking <span class="text-white font-black underline decoration-primary underline-offset-8">"Test the App"</span> at the top. Once you are approved as a 
          <span class="text-primary font-black uppercase tracking-widest text-sm">Closed Tester</span>, access the links below.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
           <a 
              v-if="project.androidUrl"
              :href="project.androidUrl"
              target="_blank" 
              class="w-full sm:w-auto px-12 py-6 rounded-3xl bg-white text-black font-black hover:bg-gray-200 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_-10px_rgba(255,255,255,0.2)] active:scale-95"
            >
              <Smartphone class="w-6 h-6" />
              Join on Android
            </a>
            <a 
              v-if="project.webTestUrl"
              :href="project.webTestUrl"
              target="_blank"
              class="w-full sm:w-auto px-12 py-6 rounded-3xl glass font-black hover:bg-white/10 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              <Globe class="w-6 h-6" />
              Join on the Web
            </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.prose p {
  margin-bottom: 2rem;
}
</style>
