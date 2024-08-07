import axios from 'axios';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useProfile = defineStore("profiles", {
    state: () => ({
        name: "",
        email: "",
        biodata: "",
        img: "",
        imgId: "",
        bookmarks: [],
        profileId: "",
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
                const config = useRuntimeConfig();

                const token = Cookies.get('jwt');
                if (!token) throw new Error('No token found');

                const profile = await axios.get(`${config.public.apiUrl}/users/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                this.name = profile.data.data.name;
                this.email = profile.data.data.email;
                this.biodata = profile.data.data.biodata;
                this.img = profile.data.data.profile_picture?.formats?.thumbnail?.url;
                this.imgId = profile.data.data.profile_picture?.id;
                this.profileId = profile.data.data.id

                this.loadBookmarks();


            } catch (err: any) {
                console.log(err);
            }
        },

        async editUser(profileData: any) {
            try {
                const config = useRuntimeConfig();

                const token = Cookies.get('jwt');
                if (!token) throw new Error('No token found');
    
                await axios.patch(`${config.public.apiUrl}/users/me`, profileData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            } catch (err) {
                console.error(err);
            }
        },

        /* Untuk Profile Picture */
        async addImgProfile(image: any) {
            try {
                const config = useRuntimeConfig();

                const urlBase = 'https://storytime-api.strapi.timedoor-js.web.id';
                const token = Cookies.get('jwt');
                if (!token) throw new Error('No token found');
                
                const formImgProfile = new FormData();
                formImgProfile.append('files', image);
                formImgProfile.append('refId', this.profileId);
                formImgProfile.append('ref', 'plugin::users-permissions.user');
                formImgProfile.append('field', 'profile_picture');
        
                const addImg = await axios.post(`${config.public.apiUrl}/upload`, formImgProfile, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });
        
                // Log the response
                console.log('Upload response:', addImg.data.data);
        
                if (addImg.data.data.length > 0) {
                    const uploadedImgUrl = addImg.data.data[0].url;
                    this.img = uploadedImgUrl;
                    console.log('New profile image URL:', this.img);
                }
        
                return addImg.data.data;
            } catch (err) {
                console.log(err);
            }
        },        

        async deleteImgProfile() {
            try {
                const config = useRuntimeConfig();

                const token = Cookies.get('jwt');
                if (!token) throw new Error('No token found');
                if (!this.imgId) throw new Error('No image to delete');

                await axios.delete(`${config.public.apiUrl}/upload/files/${this.imgId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Clear image data in the state
                this.img = "";
                this.imgId = "";
            } catch (err) {
                console.log(err);
            }
        },

        /* Untuk bookmark */
        toggleBookmark(story) {
            const index = this.bookmarks.findIndex(item => item.id === story.id);
            if (index === -1) {
                this.bookmarks.push(story);
            } else {
                this.bookmarks.splice(index, 1);
            }
            this.saveBookmarksLocally();
        },
    
        saveBookmarksLocally() {
            const userId = this.profileId;
            localStorage.setItem(`bookmarks_${userId}`, JSON.stringify(this.bookmarks));
        },
    
        loadBookmarks() {
            const userId = this.profileId;
            const savedBookmarks = localStorage.getItem(`bookmarks_${userId}`);
            if (savedBookmarks) {
                this.bookmarks = JSON.parse(savedBookmarks);
            }
        },
    
        clearBookmarksLocally() {
            const userId = this.profileId;
            localStorage.removeItem(`bookmarks_${userId}`);
            this.bookmarks = [];
        },
    },
});