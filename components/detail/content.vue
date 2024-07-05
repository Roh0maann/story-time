<template>
    <h2>{{ data.title }}</h2>
    <p v-if="data.createdAt" style="font-size: 14px;">{{ formatDate(data.createdAt) }}</p>
    <div class="position-relative mb-4">
        <NuxtImg v-if="data.cover_image" class="w-100 h-auto object-fit-cover rounded" :src="urlBase + data.cover_image.url" alt=""/>

        <NuxtImg v-else class="w-100 h-auto object-fit-cover rounded" src="https://via.placeholder.com/150" alt=""/>
        <button class="position-absolute rounded-circle btn btn-light p-0 top-0 end-0 mx-3 my-3" @click="toggleBookmark(data)">
            <i :class="['fa-bookmark rounded-circle p-3 m-0', isBookmarked(data.id) ? 'fa-solid' : 'fa-regular']" style="font-size: 18px;"></i>
        </button>
    </div>
    <div class="m-0 p-0" v-html="data.content"></div>
</template>

<script setup lang="ts">

import { useStory } from '~/stores/store';
import { onMounted, computed } from 'vue';
import { formatDate } from '~/helpers/dateFormat';
import { useProfile } from '~/stores/profile';
import { useAuth } from "~/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuth();
const router = useRouter();

const { id } = useRoute().params;

const dataStore = useStory();
const profileStore = useProfile();

onMounted(() => {
    dataStore.getStoryDetail(id);
});

const data = computed(() => {
    return dataStore.storyListDetail;
})

const urlBase = 'https://storytime-api.strapi.timedoor-js.web.id';

const isBookmarked = (id) => {
    return profileStore.isBookmarked(id);
}

const toggleBookmark = (item) => {
    if (!authStore.userLogin) {
        router.push("/login");
    } else {
        profileStore.toggleBookmark(item);
    }
}
</script>
