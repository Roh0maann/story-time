import axios from 'axios';
import { defineStore } from 'pinia';

export const useAuth = defineStore("auth", {
    state: () => ({
        name: "",
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        jwt:"",

        userLogin: null,
        userRegister: null,
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

                this.userRegister = register.data.user;
                return true;
            } catch (err:any) {
                console.log(err)
                return false;
            }
        },

        async loginUser() {
            try {
                const response = await axios.post('https://storytime-api.strapi.timedoor-js.web.id//api/auth/local', {
                    identifier: this.username || this.email,
                    password: this.password
                });

                this.userLogin = response.data.user;
                return true;
            } catch (err: any) {
                console.log(err);
                return false;
            }
        },

        async Logout() {
            this.userLogin = null;
            return true;
        }
    },
});