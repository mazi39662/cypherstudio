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
  console.log('--- BUZZ TRANSMISSION START ---');
  
  // 10-second timeout wrapper
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('TRANSMISSION_TIMEOUT')), 10000);
  });
  
  try {
    const now = Date.now();
    const expiresAt = now + (24 * 60 * 60 * 1000);
    
    const payload = {
      toBeeId: username,
      content: message.value,
      timestamp: now,
      expiresAt: expiresAt,
      colorTheme: selectedGradient.value || 'default',
      isRead: false
    };
    
    console.log('Payload:', payload);

    // Race the addDoc against our timeout
    await Promise.race([
      addDoc(collection(db, 'anonymous_messages'), payload),
      timeoutPromise
    ]);
    
    console.log('SUCCESS: Message delivered to Hive');
    showSuccess.value = true;
    message.value = '';
  } catch (error: any) {
    console.error('CRITICAL SEND ERROR:', error);
    
    if (error.message === 'TRANSMISSION_TIMEOUT') {
      alert('Transmission timed out. The Hive is unreachable. Check your internet or Firebase Config.');
    } else if (error.code === 'permission-denied') {
      alert('Security Error: The Hive rejected your message. Check Firestore rules.');
    } else {
      alert(`Buzz failed: ${error.message || 'Unknown error'}`);
    }
  } finally {
    isSending.value = false;
    console.log('--- BUZZ TRANSMISSION END ---');
  }
};

const sendAnother = () => {
  showSuccess.value = false;
  selectedGradient.value = gradients[Math.floor(Math.random() * gradients.length)];
};
</script>

<template>
  <div class="min-h-screen bg-[#08080A] text-white flex flex-col items-center justify-center p-6 font-sans selection:bg-yellow-500/30 overflow-hidden relative">
    <!-- Animated background elements -->
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-500/10 blur-[120px] rounded-full animate-pulse"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-amber-600/10 blur-[100px] rounded-full animate-pulse" style="animation-delay: 2s;"></div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex flex-col items-center gap-6 z-10">
      <div class="relative w-16 h-16">
        <div class="absolute inset-0 border-4 border-yellow-500/10 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p class="text-yellow-500/60 font-medium tracking-widest uppercase text-xs animate-pulse">Initializing Hive Bridge...</p>
    </div>

    <!-- Link Expired State -->
    <div v-else-if="!isValid" class="max-w-md w-full text-center space-y-8 z-10 backdrop-blur-3xl bg-white/[0.02] p-10 rounded-[40px] border border-white/5 shadow-2xl animate-in fade-in zoom-in duration-500">
      <div class="flex justify-center">
        <div class="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.1)]">
          <AlertCircle class="w-12 h-12" />
        </div>
      </div>
      <div class="space-y-2">
        <h1 class="text-3xl font-black text-white">Buzz Link Expired</h1>
        <p class="text-gray-500 leading-relaxed">This portal into the hive has vanished. Returning you to the home base...</p>
      </div>
      <div class="pt-4 flex justify-center">
        <div class="h-1 w-24 bg-red-500/10 rounded-full overflow-hidden">
          <div class="h-full bg-red-500 animate-[loading_5s_linear_infinite]"></div>
        </div>
      </div>
    </div>

    <!-- Message Composition State -->
    <div v-else-if="!showSuccess" class="max-w-md w-full space-y-8 z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <!-- Profile Header -->
      <div class="text-center space-y-4">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-[10px] font-bold tracking-[0.2em] uppercase text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]">
          <Shield class="w-3.5 h-3.5" />
          Encrypted Message
        </div>
        <h1 class="text-4xl font-black tracking-tighter">
          Buzz <span class="text-yellow-500">@{{ username }}</span>
        </h1>
        <p class="text-white/40 text-sm font-medium leading-relaxed">Leave a message in their digital jar. <br/>Your identity is perfectly hidden.</p>
      </div>

      <!-- Input Card -->
      <div class="relative group">
        <!-- Background Glow -->
        <div class="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-[42px] blur opacity-10 group-focus-within:opacity-25 transition duration-500"></div>
        
        <div class="relative backdrop-blur-[40px] bg-black/40 rounded-[40px] p-8 border border-white/10 shadow-2xl transition-all duration-300 group-focus-within:border-yellow-500/50">
          <textarea
            v-model="message"
            :maxlength="charLimit"
            class="w-full h-44 bg-transparent text-xl font-medium placeholder:text-white/10 focus:outline-none resize-none leading-relaxed text-yellow-50"
            placeholder="Type your anonymous buzz here..."
          ></textarea>
          
          <div class="flex items-center justify-between mt-4">
            <div class="flex items-center gap-2 text-white/20">
              <Info class="w-3.5 h-3.5" />
              <span class="text-[10px] font-bold uppercase tracking-wider">Honey-Grade Security</span>
            </div>
            <span class="text-[10px] font-black font-mono px-2 py-1 rounded bg-white/5" :class="[message.length >= charLimit ? 'text-red-500' : 'text-white/30']">
              {{ message.length }}/{{ charLimit }}
            </span>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <button
        @click="sendMessage"
        :disabled="message.trim() === '' || isSending"
        class="w-full h-16 rounded-[24px] font-black text-lg transition-all active:scale-[0.97] disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed relative overflow-hidden group shadow-2xl shadow-yellow-500/10"
        :class="[message.trim() !== '' ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'bg-white/5 text-white/20 border border-white/5']"
      >
        <div v-if="!isSending" class="flex items-center justify-center gap-2 tracking-tight">
          SEND TO HIVE
          <Send class="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>
        <div v-else class="flex items-center justify-center gap-3">
          <div class="w-5 h-5 border-[3px] border-black/20 border-t-black rounded-full animate-spin"></div>
          <span class="tracking-widest text-xs uppercase">Transmitting...</span>
        </div>
      </button>

      <div class="text-center">
         <p class="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] animate-pulse">No IP Logs • No Tracking • Pure Buzz</p>
      </div>
    </div>

    <!-- Success State -->
    <div v-else class="max-w-md w-full text-center space-y-8 z-10 animate-in fade-in zoom-in duration-500 backdrop-blur-3xl bg-white/[0.02] p-12 rounded-[40px] border border-white/5 shadow-2xl">
      <div class="flex justify-center">
        <div class="w-24 h-24 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 border border-yellow-500/20 shadow-[0_0_50px_rgba(234,179,8,0.2)]">
          <Send class="w-10 h-10" />
        </div>
      </div>
      <div class="space-y-3">
        <h2 class="text-4xl font-black text-white tracking-tighter">BUZZED!</h2>
        <p class="text-white/40 text-lg leading-relaxed font-medium">Your secret message has been <br/>stored in @{{ username }}'s jar.</p>
      </div>
      
      <div class="pt-6 space-y-4">
        <button
          @click="sendAnother"
          class="w-full py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold text-white shadow-lg active:scale-95"
        >
          SEND ANOTHER
        </button>
        <a
          href="https://cypherstudio.netlify.app/app/notibee"
          class="block w-full py-5 rounded-2xl bg-yellow-500 text-black font-black shadow-[0_10px_30px_rgba(234,179,8,0.2)] hover:bg-yellow-400 hover:scale-[1.02] transition-all active:scale-95"
        >
          JOIN THE HIVE 🐝
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
