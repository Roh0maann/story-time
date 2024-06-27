import { useAuth } from "~/stores/auth";
import Cookies from 'js-cookie';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth = useAuth();

    // Panggil checkAuth dan tunggu sampai selesai
    await auth.checkAuth();

    // Log untuk debugging
    console.log('auth.userLogin:', auth.userLogin);
    console.log('Navigating to:', to.path);

    // Jika pengguna sudah login dan mencoba mengakses halaman login atau register
    if (auth.userLogin && (to.path === '/login' || to.path === '/register')) {
        console.log('User is logged in, redirecting to home');
        return navigateTo('/', { replace: true });
    }

    // Jika pengguna belum login dan mencoba mengakses halaman yang membutuhkan login
    if (!auth.userLogin && to.path.startsWith('/user')) {
        console.log('User is not logged in, redirecting to login');
        return navigateTo('/login', { replace: true });
    }
});
