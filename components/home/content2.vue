<template>
    <div class="" style="padding-top: 10%;">
        <div class="container">
            <div class="d-flex flex-md-row flex-column justify-content-between m-0 p-0 w-100 gap-3">
                <HomeSearch @searchData="updateSearch"></HomeSearch>
                <HomeSort @sortedData="updateSort"></HomeSort>
            </div>

            <HomeStory v-if="!loading" :displayedData="displayedData"></HomeStory>

            <div v-if="loading" class="text-center my-3">
                <h1 class="py-5 my-5">Loading...</h1>
            </div>

            <div v-if="noDataFound && !loading" class="my-3">
                <div class="text-center">
                    <img class="me-4" style="width: 20%" src="~/assets/images/empty-data.svg" alt="" />
                    <p class="p-0 mt-3 fw-semibold" style="font-size: 24px">
                        No data found
                    </p>
                </div>
            </div>

            <div v-if="!noDataFound && !isSearchActive && hasMorePages && !loading"
                class="d-flex justify-content-center">
                <button class="px-3 py-2 btn-outline-dark btn rounded-0" @click="loadMore">
                    Load More
                </button>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useStory } from "~/stores/store";

const dataStore = useStory();
const currentPage = ref(1);
const searchOn = ref("");
const sortOrder = ref("");
const loading = ref(false);

// Load More //
function loadMore() {
    currentPage.value++;
    fetchData();
}

const isSearchActive = computed(() => {
    return searchOn.value !== "";
});

const hasMorePages = computed(() => {
    const totalPages = dataStore.pageCount;
    return currentPage.value < totalPages;
});

// Search and Sort //
function updateSearch(keyword: any) {
    searchOn.value = keyword;
    currentPage.value = 1;
    fetchData();
}

function updateSort(order: any) {
    sortOrder.value = order;
    currentPage.value = 1;
    fetchData();
}

// Fetch Data //
function fetchData() {
    loading.value = true;
    dataStore.fetchStoryList(currentPage.value, searchOn.value, sortOrder.value)
        .then(() => {
            loading.value = false;
        })
        .catch((error) => {
            loading.value = false;
            console.error('Error fetching data:', error);
        });
}

// Display Data //
const noDataFound = computed(() => {
    return displayedData.value.length === 0;
});

const displayedData = computed(() => {
    return dataStore.storyList;
});

onMounted(() => {
    fetchData();
});
</script>