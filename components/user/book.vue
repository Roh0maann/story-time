<template>
    <div class="m-0 px-3 w-100 mb-4">
        <div class="d-flex justify-content-between align-items-center align-content-center">
            <h4 class="m-0 p-0">Bookmark</h4>
        </div>
        <div v-if="!bookmarks.length" class="mt-5 mb-3">
            <div class="text-center">
                <img class="me-4" style="width: 20%;" src="~/assets/images/empty-data.svg" alt="">
                <p class="p-0 mt-3 fw-semibold" style="font-size: 24px;">No data found</p>
            </div>
        </div>
        <div v-else>
            <UserBookmark :bookmarks="bookmarks"></UserBookmark>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProfile } from '~/stores/profile';

const profileStore = useProfile();

const bookmarks = computed(() => profileStore.getBookmarks);
</script>
