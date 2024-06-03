import axios from 'axios';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useProfile = defineStore("profiles", {
    state: () => ({
        name: "",
        email: "",
        biodata: "",
        img: "",
    }),

    actions: {
        async profileUser() {
            try {
                const urlBase = 'https://storytime-api.strapi.timedoor-js.web.id';
                const token = Cookies.get('jwt'); // Ambil token dari cookies
                if (!token) throw new Error('No token found');


                const profile = await axios.get('https://storytime-api.strapi.timedoor-js.web.id/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Sertakan token dalam header
                    },
                });

                this.name = profile.data.data.name;
                this.email = profile.data.data.email;
                this.biodata = profile.data.data.biodata;
                this.img =  profile.data.data.profile_picture?.formats?.thumbnail?.url  
                ? urlBase + profile.data.data.profile_picture.formats.thumbnail.url 
                : 'https://via.placeholder.com/150';

            } catch (err: any) {
                console.log(err);
            }
        },

        async editUser(profileData: any) {
            try {
                const token = Cookies.get('jwt');
                if (!token) throw new Error('No token found');
    
                const response = await axios.patch('https://storytime-api.strapi.timedoor-js.web.id/api/users/me', profileData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            } catch (err) {
                console.error(err);
            }
        },
        
    },
});
