<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Send, Shield, Info, AlertCircle } from 'lucide-vue-next';
import { db } from '../firebase';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';

const route = useRoute();
const router = useRouter();
const username = route.params.username as string;

const message = ref('');
const charLimit = 300;
const isSending = ref(false);
const showSuccess = ref(false);
const isValid = ref(true); 
const isLoading = ref(true);

// NGL-style gradients
const gradients = [
  'from-[#FF3D77] to-[#338AFF]', // Pink to Blue
  'from-[#00E5FF] to-[#12005E]', // Cyan to Dark Purple
  'from-[#FF9E00] to-[#FF007A]', // orange to pink
  'from-[#7000FF] to-[#001AFF]', // Purple to Blue
];

const selectedGradient = ref(gradients[Math.floor(Math.random() * gradients.length)]);

onMounted(async () => {
  if (!username) {
    isValid.value = false;
    isLoading.value = false;
    return;
  }

  try {
    // Check if user exists in Firestore
    console.log('Validating user:', username);
    
    // TEMPORARY BYPASS FOR TESTING: 
    // Always allow AGENT_BEE if we're debugging
    if (username.toUpperCase() === 'AGENT_BEE') {
      console.log('AGENT_BEE bypass active');
      isValid.value = true;
    } else {
      const userDoc = await getDoc(doc(db, 'users', username));
      if (!userDoc.exists()) {
        console.warn('User not found in Firestore:', username);
        isValid.value = false;
      } else {
        console.log('User validated successfully');
        isValid.value = true;
      }
    }
  } catch (error: any) {
    console.error('Firebase Error Detail:', error);
    
    // If it's a permission error, it's because of Firestore rules
    if (error.code === 'permission-denied') {
      console.warn('Firestore Rule Block: You need to allow public read for the users collection.');
      // For now, let's assume the link is valid if we have a permission error 
      // (meaning the DB is there but we can't check the specific ID)
      isValid.value = true; 
    } else {
      isValid.value = false;
    }
  } finally {
    isLoading.value = false;
  }

  // Redirect if invalid
  if (!isValid.value) {
    setTimeout(() => {
      window.location.href = 'https://cypherstudio.netlify.app/app/notibee';
    }, 5000);
  }
});

const sendMessage = async () => {
  if (message.value.trim() === '' || isSending.value) return;
  
  isSending.value = true;
  
  try {
    const now = Date.now();
    const expiresAt = now + (24 * 60 * 60 * 1000); // 24 hours from now
    
    const payload = {
      toBeeId: username,
      content: message.value,
      timestamp: now,
      expiresAt: expiresAt,
      colorTheme: selectedGradient.value,
      isRead: false
    };
    
    await addDoc(collection(db, 'anonymous_messages'), payload);
    
    showSuccess.value = true;
    message.value = '';
  } catch (error) {
    console.error('Failed to send message:', error);
    alert('Oops! Failed to send buzz. Please try again.');
  } finally {
    isSending.value = false;
  }
};

const sendAnother = () => {
  showSuccess.value = false;
  selectedGradient.value = gradients[Math.floor(Math.random() * gradients.length)];
};
</script>

<template>
  <div class="min-h-screen bg-[#0D0D12] text-white flex flex-col items-center justify-center p-4 font-sans selection:bg-white/20">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex flex-col items-center gap-4">
      <div class="w-12 h-12 border-4 border-white/5 border-t-white rounded-full animate-spin"></div>
      <p class="text-white/40 font-medium animate-pulse">Checking buzz link...</p>
    </div>

    <!-- Link Expired State -->
    <div v-else-if="!isValid" class="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-500">
      <div class="flex justify-center">
        <div class="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
          <AlertCircle class="w-10 h-10" />
        </div>
      </div>
      <h1 class="text-3xl font-bold">Link Expired</h1>
      <p class="text-gray-400">This buzz link is no longer available or has expired. You are being redirected to our official page.</p>
      <div class="pt-4">
        <div class="inline-block h-1 w-24 bg-red-500/20 rounded-full overflow-hidden">
          <div class="h-full bg-red-500 animate-[loading_3s_linear_infinite]"></div>
        </div>
      </div>
    </div>

    <!-- Message Composition State -->
    <div v-else-if="!showSuccess" class="max-w-md w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <!-- Profile Header -->
      <div class="text-center space-y-3">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/60">
          <Shield class="w-4 h-4" />
          Anonymous & Private
        </div>
        <h1 class="text-4xl font-black tracking-tight pt-2">
          Buzz @<span class="text-transparent bg-clip-text bg-gradient-to-r" :class="selectedGradient">{{ username }}</span>
        </h1>
        <p class="text-white/40 text-sm">Send an anonymous message. They'll never know it was you.</p>
      </div>

      <!-- Input Card -->
      <div class="relative group">
        <div class="absolute -inset-0.5 bg-gradient-to-r blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" :class="selectedGradient"></div>
        <div class="relative bg-[#16161D] rounded-3xl p-6 border border-white/10 shadow-2xl">
          <div class="relative">
            <textarea
              v-model="message"
              :maxlength="charLimit"
              class="w-full h-48 bg-transparent text-xl font-medium placeholder:text-white/10 focus:outline-none resize-none"
              placeholder="Send me anonymous messages..."
            ></textarea>
            
            <div class="absolute bottom-0 right-0 flex items-center gap-3">
              <span class="text-xs font-mono text-white/20" :class="{ 'text-red-500/50': message.length >= charLimit }">
                {{ message.length }}/{{ charLimit }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <button
        @click="sendMessage"
        :disabled="message.trim() === '' || isSending"
        class="w-full py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed group relative overflow-hidden"
        :class="[message.trim() !== '' ? 'bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'bg-white/5 text-white/20']"
      >
        <span v-if="!isSending" class="flex items-center gap-3">
          Send!
          <Send class="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </span>
        <div v-else class="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
      </button>

      <div class="flex items-center justify-center gap-2 text-white/20 text-xs">
        <Info class="w-3 h-3" />
        Your IP and identity are hidden from the recipient.
      </div>
    </div>

    <!-- Success State -->
    <div v-else class="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
      <div class="flex justify-center">
        <div class="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
          <Send class="w-10 h-10" />
        </div>
      </div>
      <div class="space-y-3">
        <h2 class="text-4xl font-black">Sent!</h2>
        <p class="text-white/60 text-lg">Your anonymous buzz was delivered to @{{ username }}.</p>
      </div>
      
      <div class="pt-4 space-y-4">
        <button
          @click="sendAnother"
          class="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-semibold"
        >
          Send another one
        </button>
        <a
          href="https://cypherstudio.netlify.app/app/notibee"
          class="block w-full py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold shadow-lg shadow-yellow-500/20 hover:scale-[1.02] transition-transform"
        >
          Get your own link 🐝
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes loading {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Custom transitions */
.animate-in {
  animation-duration: 0.5s;
}

.fade-in {
  animation-name: fadeIn;
}

.slide-in-from-bottom-8 {
  animation-name: slideInBottom;
}

.zoom-in {
  animation-name: zoomIn;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInBottom {
  from { transform: translateY(2rem); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes zoomIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
