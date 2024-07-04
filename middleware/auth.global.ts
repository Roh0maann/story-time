import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useAuth } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuth()

    await authStore.checkAuth()

    if (!authStore.userLogin && to.path.startsWith('/user')) {
        return navigateTo('/login')
    } else if (authStore.userLogin && (to.path === '/login' || to.path === '/register')) {
        return navigateTo('/')
    }

})
