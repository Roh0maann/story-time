<template>
    <div class="shadow p-4 text-center position-sticky" style="top: 18%;">
        <h2 class="fw-normal text-secondary" style="font-size: 16px;">Author</h2>
        <div class="">
            <div class="mx-auto my-3" style="height: 70px; width: 70px;">
                <img v-if="data.author" class="w-100 h-100 rounded-circle object-fit-cover "
                    :src="urlBase + data.author.profile_picture.formats.thumbnail.url" alt="">
            </div>
            <h3 v-if="data.author" class="mb-3 p-0 " style="font-size: 16px;">{{ data.author.username }}</h3>
            <h5 v-if="data.author" class="text-secondary fw-normal m-0 p-0" style="font-size: 14px;">{{
                data.author.biodata }}</h5>
        </div>
    </div>
</template>

<script setup lang="ts">

import {useStory} from '~/stores/store'
import {onMounted, computed} from 'vue'

const {id} = useRoute().params;

const dataStore = useStory();

onMounted(() => {
    dataStore.getStoryDetail(id);
});

const data = computed (() => {
    return dataStore.storyListDetail;
})

const urlBase = 'https://storytime-api.strapi.timedoor-js.web.id';


</script>