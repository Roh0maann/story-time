import axios from 'axios';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { use } from 'chai';
import { useProfile } from '~/stores/profile';

export const useAuth = defineStore("auth", {
    state: () => ({
        name: "",
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        token: "",
        userId: "",

        userLogin: false,
        userRegister: false,
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
            } catch (err: any) {
                console.log(err);
                return false;
            }
        },

        async loginUser() {
            try {
                const {data} = await axios.post('https://storytime-api.strapi.timedoor-js.web.id/api/auth/local', {
                    identifier: this.username || this.email,
                    password: this.password
                });
        
                this.token = data.data.jwt;
                this.userId = data.data.user.id;
                this.userLogin = true;
                
                // Simpan token di cookies
                Cookies.set("jwt", this.token, { expires: 1 });
                Cookies.set("userID", this.userId, { expires: 1 });
                return true;
            } catch (err: any) {
                console.log(err);
                return false;
            }
        },
        

        checkAuth() {
            const token = Cookies.get('jwt');
            if (token) {
                this.token = token; 
                this.userLogin = true;
            }
        },

        async logout() {
            this.token = "";
            this.userId = "";
            this.userLogin = false;
            Cookies.remove('jwt');
            Cookies.remove('userID');


            const profileStore = useProfile();
            profileStore.clearBookmarks();
        }
    },
});
