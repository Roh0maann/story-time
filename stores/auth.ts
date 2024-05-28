import axios from 'axios';
import { defineStore } from 'pinia';

export const useAuth = defineStore("auth", {
    state: () => ({
        name: "",
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    }),

    actions: {
        async registerUser() {
            try {
                const register = await axios.post('https://storytime-api.strapi.timedoor-js.web.id/api/auth/local/register', {
                    name: this.name,
                    username: this.username,
                    email: this.email,
                    password: this.password,
                });
            } catch (err:any) {
                console.log(err)
            }
        },

        async loginUser(identifier:any, password:any) {
            try {
                const login = await axios.get('https://storytime-api.strapi.timedoor-js.web.id/api/auth/local');
                this.name = login.data.user;
            } catch (err:any) {
                console.log(err);
            }
        },
    },
});
