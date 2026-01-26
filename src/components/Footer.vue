<script setup lang="ts">
import { Github, Twitter, Linkedin, Heart } from 'lucide-vue-next'
</script>

<template>
  <footer class="border-t border-white/5 bg-background pt-20 pb-10 px-6">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div class="col-span-1 md:col-span-2">
        <div class="flex items-center gap-2 mb-6">
           <span class="text-xl font-bold tracking-tight text-white">
            Cypher<span class="text-primary text-2xl leading-none">.</span>Studio
          </span>
        </div>
        <p class="text-gray-500 max-w-sm mb-8">
          Crafting digital experiences that push the boundaries of what's possible. Join our community of early testers and shape the future.
        </p>
        <div class="flex gap-4">
          <a href="#" class="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
            <Twitter class="w-5 h-5" />
          </a>
          <a href="#" class="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
            <Github class="w-5 h-5" />
          </a>
          <a href="#" class="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
            <Linkedin class="w-5 h-5" />
          </a>
        </div>
      </div>

      <div>
        <h4 class="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Platform</h4>
        <ul class="space-y-4 text-sm text-gray-500">
          <li><a href="#" class="hover:text-primary transition-colors">Showcase</a></li>
          <li><a href="#" class="hover:text-primary transition-colors">Documentation</a></li>
          <li><a href="#" class="hover:text-primary transition-colors">API Status</a></li>
        </ul>
      </div>

      <div>
        <h4 class="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Company</h4>
        <ul class="space-y-4 text-sm text-gray-500">
          <li><a href="#" class="hover:text-primary transition-colors">About</a></li>
          <li><a href="#" class="hover:text-primary transition-colors">Privacy</a></li>
          <li><a href="#" class="hover:text-primary transition-colors">Terms</a></li>
        </ul>
      </div>
    </div>

    <div class="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
      <p>© {{ new Date().getFullYear() }} Cypher Studio. All rights reserved.</p>
      <p class="flex items-center gap-1.5">
        Built with <Heart class="w-4 h-4 text-red-500 fill-current" /> by Cypher
      </p>
    </div>
  </footer>
</template>
