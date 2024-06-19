import axios from 'axios';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const usePassword = defineStore("password", {
    state: () => ({

    }),
    actions: {
        async resetPassword(formPassword: any) {
            try {
                const reset = await axios.post('https://storytime-api.strapi.timedoor-js.web.id/api/users/me/reset-password', formPassword, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                
                return reset.data.data;
            } catch (error) {
                console.log(error);
            }
        }
    }
});