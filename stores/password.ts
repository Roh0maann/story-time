import axios from 'axios';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const usePassword = defineStore("password", {
    state: () => ({

    }),
    actions: {
        async resetPassword(formPassword: any) {
            try {
                const token = Cookies.get('jwt');

                const reset = await axios.post('https://storytime-api.strapi.timedoor-js.web.id/api/users/me/reset-password', formPassword, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                return reset.data.data;
            } catch (error) {
                console.log(error);
            }
        }
    }
});