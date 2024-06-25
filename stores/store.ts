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
                const infos = await axios.get(`https://storytime-api.strapi.timedoor-js.web.id/api/stories`, {
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
                const { data } = await axios.get(`https://storytime-api.strapi.timedoor-js.web.id/api/stories/${id}`);
                this.storyListDetail = data.data;
            } catch (err) {
                console.log(err)
            }
        },

        async addStory(title: any, content: any, category: any) {
            try {
                const token = Cookies.get('jwt');
                if (!token) throw new Error('No token found');

                const formData = new FormData();
                formData.append('title', title);
                formData.append('content', content);
                formData.append('category', category);

                const add = await axios.post('https://storytime-api.strapi.timedoor-js.web.id/api/stories', formData, {
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
                const token = Cookies.get('jwt');
                if (!token) throw new Error('No token found');

                const formImg = new FormData();
                formImg.append('files', image);
                formImg.append('refId', id);
                formImg.append('ref', 'api::story.story');
                formImg.append('field', 'cover_image');

                const addImg = await axios.post('https://storytime-api.strapi.timedoor-js.web.id/api/upload', formImg, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                })

                return addImg.data.data;
            } catch (err) {
                console.log(err)
            }
        },

        async getUserStory() {
            try {
                const token = Cookies.get('jwt');
                const userId = Cookies.get('userID');

                if (!token) throw new Error('No token found');

                const userStory = await axios.get(`https://storytime-api.strapi.timedoor-js.web.id/api/stories?author=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.storyList = userStory.data.data;
            } catch (err) {
                console.log(err)
            }
        },

        async deleteStory(id: any) {
            try {
                const token = Cookies.get('jwt');
                if (!token) throw new Error('No token found');

                const deleteStory = await axios.delete(`https://storytime-api.strapi.timedoor-js.web.id/api/stories/${id}`, {
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
                const token = Cookies.get('jwt');
                if (!token) throw new Error('No token found');

                const update = await axios.put(`https://storytime-api.strapi.timedoor-js.web.id/api/stories/${id}`, updatedData, {
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
                const token = Cookies.get('jwt');
                if (!token) throw new Error('No token found');

                const imageId = this.storyListDetail.cover_image.id;

                const deleteImg = await axios.delete(`https://storytime-api.strapi.timedoor-js.web.id/api/upload/files/${imageId}`, {
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