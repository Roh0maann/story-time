<template>
    <div class="my-4 row">
        <div class="col-6 col-lg-3 my-3" v-for="(item, index) in displayedData" :key="index">
            <div class="card position-relative h-100">
                <NuxtLink :to="'/story/' + item.id" class="text-decoration-none" style="height: 160px;">
                    <img v-if="item.cover_image" :src="urlBase + item.cover_image.url" class="card-img-top h-100 w-100"
                        alt="Img" style="object-fit: cover;" />
                </NuxtLink>
                <div class="card-body px-2 py-4">
                    <button class="position-absolute rounded-circle btn btn-light p-0 top-0 end-0 mx-2 my-2">
                        <i class="fa-regular fa-bookmark rounded-circle p-3 m-0 p-0"></i>
                    </button>
                    <NuxtLink :to="'/story/' + item.id" class="text-decoration-none">
                        <h2 class="text-black" style="font-size: 18px;">{{ item.title }}</h2>
                    </NuxtLink>
                    <p class="my-1 text-secondary line-clamp" style="font-size: 14px;">{{ item.content }}</p>
                    <div class="mt-1 text-secondary" style="font-size: 12px;">
                        <p class="m-0">by {{ item.author.username }}</p>
                        <p class="m-0">{{ formatDate(item.createdAt) }}</p>
                    </div>
                    <div class="text-black mt-1" style="font-size: 12px;">
                        <span class="py-0 px-1 bg-secondary rounded">{{ item.category.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { formatDate } from '~/helpers/dateFormat';

const props = defineProps({
    displayedData: Object
});

const urlBase = 'https://storytime-api.strapi.timedoor-js.web.id';
</script>