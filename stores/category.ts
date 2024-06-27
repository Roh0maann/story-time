import axios from 'axios';
import { defineStore } from 'pinia';

export const useCategory = defineStore("category", {
    state: () => ({
        categoryList: [],
    }),
    actions: {
        async fetchCategories() {
            try {
                const config = useRuntimeConfig();
                const response = await axios.get(`${config.public.apiUrl}/categories`);
                const categories = response.data.data;

                this.categoryList = categories;
            } catch (error) {
                console.log('Error fetching categories:', error);
            }
        }
    }
});
