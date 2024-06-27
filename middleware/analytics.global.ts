import { useAuth } from "~/stores/auth";
import Cookies from 'js-cookie';

export default defineNuxtRouteMiddleware(async (to, from) => {

    // const auth = useAuth();
    // await auth.checkAuth();
    // const token = Cookies.get('jwt');

    // if (auth.userLogin && (to.path === '/login' || to.path === '/register')) {
    //     return navigateTo("/")
    // }

    // if (!auth.userLogin && to.path.startsWith('/user')) {
    //     return navigateTo('/login')
    // }

}); 