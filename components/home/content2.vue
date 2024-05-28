<template>
    <div class="" style="padding-top: 10%; padding-bottom: 5%">
        <div class="container">
            <div class="d-flex justify-content-between m-0 p-0">
                <HomeSearch @searchData="updateSearch"></HomeSearch>
                <HomeSort @sortedData="updateSort"></HomeSort>
            </div>
            <HomeStory :displayedData="displayedData"></HomeStory>

            <div v-if="noDataFound" class="my-3">
                <div class="text-center">
                    <img class="me-4" style="width: 20%" src="~/assets/images/empty-data.svg" alt="" />
                    <p class="p-0 mt-3 fw-semibold" style="font-size: 24px">
                        No data found
                    </p>
                </div>
            </div>

            <div v-if="!noDataFound" class="d-flex justify-content-center">
                <button class="px-3 py-2 btn-outline-dark btn rounded-0" @click="loadMore">
                    Load More
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useStory } from "~/stores/store";

const dataStore = useStory();
const currentPage = ref(1);
const searchOn = ref("");
const sortOrder = ref("");

function loadMore() {
    currentPage.value++;
    dataStore.fetchStoryList(currentPage.value, searchOn.value);
}

function updateSearch(keyword: string) {
    searchOn.value = keyword;
    currentPage.value = 1;
    dataStore.fetchStoryList(currentPage.value, searchOn.value);
}

function updateSort(order: string) {
    sortOrder.value = order;
}

const noDataFound = computed(() => {
    return displayedData.value.length === 0;
});

const displayedData = computed(() => {
    let data = [...dataStore.storyList];
    
    if (searchOn.value) {
        data = data.filter((item) =>
            item.title.toLowerCase().includes(searchOn.value.toLowerCase())
        );
    }

    if (sortOrder.value === "Newest") {
        data = data.sort( (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() );
    } else if (sortOrder.value === "A-Z") {
        data = data.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder.value === "Z-A") {
        data = data.sort((a, b) => b.title.localeCompare(a.title));
    }

    return data;
});

onMounted(() => {
    dataStore.fetchStoryList(1);
});
</script>
