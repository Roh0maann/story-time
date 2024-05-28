import axios from 'axios';

export const useStory =  defineStore("store", {
    state: () => ({
        storyList: [],
        storyListDetail: {},
    }),

    actions: {
        async fetchStoryList(page:any, keyword = '') {
            try {
                const infos = await axios.get(`https://storytime-api.strapi.timedoor-js.web.id//api/stories?keyword=${keyword}&author&page=${page}`);

                if (page === 1) {
                    this.storyList = [];
                }
                
                const newInfos = infos.data.data;
                for (const item of newInfos) {
                    const isExisting = this.storyList.find(existing => existing.id === item.id);
                    if(!isExisting) {
                        this.storyList.push(item);
                    }
                }
            } catch (err) {
                console.log(err)
            }
        },

        async getStoryDetail(id:any) {
            try {
                const {data} = await axios.get (`https://storytime-api.strapi.timedoor-js.web.id/api/stories/${id}`);
                this.storyListDetail = data.data;
            }catch (err){
                console.log(err)
            }
        },
    },
})