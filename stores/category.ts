import axios from 'axios';
import { defineStore } from 'pinia';

export const useCategory = defineStore("category", {
    state: () => ({
        categoryList: [],
    }),
    actions: {
        async fetchCategories() {
            try {
                const response = await axios.get('https://storytime-api.strapi.timedoor-js.web.id/api/categories');
                const categories = response.data.data;

                this.categoryList = categories;
            } catch (error) {
                console.log('Error fetching categories:', error);
            }
        }
    }
});
