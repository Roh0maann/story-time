import axios from 'axios';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useStory = defineStore("store", {
    state: () => ({
        storyList: [],
        storyListDetail: {},
        pageCount: 1,
    }),

    actions: {
        async fetchStoryList(page: any, keyword = '', sort = '') {
            try {
                const config = useRuntimeConfig();

                const infos = await axios.get(`${config.public.apiUrl}/stories`, {
                    params: {
                        keyword,
                        page,
                        sort,
                    },
                });
                if (page === 1) {
                    this.storyList = [];
                }

                const newInfos = infos.data.data;
                this.pageCount = infos.data.meta.pagination.pageCount

                for (const item of newInfos) {
                    const isExisting = this.storyList.find(existing => existing.id === item.id);
                    if (!isExisting) {
                        this.storyList.push(item);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        },

        async getStoryDetail(id: any) {
            try {
                const config = useRuntimeConfig();

                const { data } = await axios.get(`${config.public.apiUrl}/stories/${id}`);
                this.storyListDetail = data.data;
            } catch (err) {
                console.log(err)
            }
        },

        async addStory(title: any, content: any, category: any) {
            try {
                const config = useRuntimeConfig();
                const token = Cookies.get('jwt');
                if (!token) throw new Error('No token found');

                const formData = new FormData();
                formData.append('title', title);
                formData.append('content', content);
                formData.append('category', category);

                const add = await axios.post(`${config.public.apiUrl}/stories`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });

                return add.data.data.id;
            } catch (err) {
                console.log(err)
            }
        },

        async addImg(image: any, id: any) {
            try {
                const config = useRuntimeConfig();
                const token = Cookies.get('jwt');
                if (!token) throw new Error('No token found');

                const formImg = new FormData();
                formImg.append('files', image);
                formImg.append('refId', id);
                formImg.append('ref', 'api::story.story');
                formImg.append('field', 'cover_image');

                const addImg = await $fetch(`${config.public.apiUrl}/upload`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formImg
                });

                return addImg;
                
            } catch (err) {
                console.error('Error during upload:', err);
                console.log(err)
            }
        },

        async getUserStory(page: any) {
            try {
                const config = useRuntimeConfig();
                const token = Cookies.get('jwt');
                const profileStore = useProfile();
                const userId = profileStore.profileId;

                if (!token) throw new Error('No token found');

                const userStory = await axios.get(`${config.public.apiUrl}/stories?author=${userId}`, {
                    params: {
                        page,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.storyList = userStory.data.data;
                this.pageCount = userStory.data.meta.pagination.pageCount
            } catch (err) {
                console.log(err)
            }
        },

        async deleteStory(id: any) {
            try {
                const config = useRuntimeConfig();
                const token = Cookies.get('jwt');
                if (!token) throw new Error('No token found');

                const deleteStory = await axios.delete(`${config.public.apiUrl}/stories/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.storyList = this.storyList.filter(item => item.id !== id);
            } catch (err) {
                console.log(err)
            }
        },

        async updateStory(id: any, updatedData: any) {
            try {
                const config = useRuntimeConfig();
                const token = Cookies.get('jwt');
                if (!token) throw new Error('No token found');

                const update = await axios.put(`${config.public.apiUrl}/stories/${id}`, updatedData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                return update.data.data.id;
            } catch (err) {
                console.log(err)
            }
        },

        async deleteImg(id: any) {
            try {
                const config = useRuntimeConfig();
                const token = Cookies.get('jwt');
                if (!token) throw new Error('No token found');

                const imageId = this.storyListDetail.cover_image.id;

                const deleteImg = await axios.delete(`${config.public.apiUrl}/upload/files/${imageId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                return deleteImg.data;
            } catch (err) {
                console.log(err)
            }
        },
    }
});