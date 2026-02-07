import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import AppDetailView from './views/AppDetailView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/app/:id', component: AppDetailView, props: true },
    { path: '/notibee/:username', name: 'anonymous', component: () => import('./views/AnonymousBuzzView.vue'), props: true },
    // Short link redirect: /username -> /notibee/username
    { path: '/:username', redirect: (to: any) => `/notibee/${to.params.username}` },
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
