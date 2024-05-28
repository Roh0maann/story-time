import axios from 'axios';
import { defineStore } from 'pinia';

export const useAuth = defineStore("auth", {
    state: () => ({
        user: null,
    }),

    actions: {
        async registerUser(name:any, username:any, email:any, password:any) {
            try {
                const register = await axios.post('https://storytime-api.strapi.timedoor-js.web.id/api/auth/local/register');
                this.user = register.data.user;
            } catch (err:any) {
                console.log(err)
            }
        },

        async loginUser(identifier:any, password:any) {
            try {
                const login = await axios.get('https://storytime-api.strapi.timedoor-js.web.id/api/auth/local');
                this.user = login.data.user;
            } catch (err:any) {
                console.log(err);
            }
        },
    },
});
