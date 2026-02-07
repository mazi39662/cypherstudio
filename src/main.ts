import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import AppDetailView from './views/AppDetailView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/app/:id', component: AppDetailView, props: true },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    },
})

const app = createApp(App)
app.use(router)
app.mount('#app')
