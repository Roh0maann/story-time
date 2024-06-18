import axios from 'axios';
import { defineStore } from 'pinia';

export const usePassword = defineStore("password", {
    state: () => ({
        password: "",
    }),
    actions: {
        async fetchCategories() {
            try {
                const {data} = await axios.post('https://storytime-api.strapi.timedoor-js.web.id//api/users/me/reset-password', {
                    headers: {
                        'Host': '<calculated at runtime>',
                        'Content-Type': 'multipart/form-data',
                    },
                });

            } catch (error) {
                console.log('Error fetching categories:', error);
            }
        }
    }
});