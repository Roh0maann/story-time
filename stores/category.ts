import axios from 'axios';
import { defineStore } from 'pinia';

export const useCategory = defineStore("category", {
    state: () => ({
        categoryList: [] as string[],
    }),
    actions: {
        async fetchCategories() {
            try {
                const response = await axios.get('https://storytime-api.strapi.timedoor-js.web.id/api/categories');
                const categories = response.data.data;

                this.categoryList = categories.map((category: any) => category.name);
            } catch (error) {
                console.log('Error fetching categories:', error);
            }
        }
    }
});
