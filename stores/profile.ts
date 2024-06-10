import axios from 'axios';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useProfile = defineStore("profiles", {
    state: () => ({
        name: "",
        email: "",
        biodata: "",
        img: "",
        bookmarks: [],
    }),

    getters: {
        isBookmarked: (state) => (id: any) => {
            return state.bookmarks.some(item => item.id === id);
        },
        getBookmarks: (state) => {
            return state.bookmarks;
        }
    },

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
        
        /* Untuk bookmark */
        toggleBookmark(story: any) {
            const index = this.bookmarks.findIndex(item => item.id === story.id);
            if (index === -1) {
                this.bookmarks.push(story);
            } else {
                this.bookmarks.splice(index, 1);
            }
            this.saveBookmarks();
        },
    
        saveBookmarks() {
            const token = Cookies.get('jwt');
            if (token) {
                const userId = Cookies.get('userID');
                localStorage.setItem(`bookmarks_${userId}`, JSON.stringify(this.bookmarks));
            }
        },
    
        loadBookmarks() {
            const userId = Cookies.get('userID');
            const savedBookmarks = localStorage.getItem(`bookmarks_${userId}`);
            if (savedBookmarks) {
                this.bookmarks = JSON.parse(savedBookmarks);
            }
        },
    
        clearBookmarks() {
            const userId = Cookies.get('userID');
            localStorage.removeItem(`bookmarks_${userId}`);
            this.bookmarks = [];
        },
        /* Untuk bookmark */
    },
});