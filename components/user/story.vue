<template>
    <div class="border shadow m-0 p-4 w-100 mb-4">
        <div class="d-flex justify-content-between align-items-center align-content-center">
            <h4 class="m-0 p-0">Story List</h4>
            <NuxtLink to="/user/story/create" class="py-1 px-1 btn btn-dark rounded-0 fw-semibold"
                style="font-size: 14px; width: 18%;">
                +
                Create Story
            </NuxtLink>
        </div>

        <div class="mt-5 mb-3" v-if="storyStore.storyList.length === 0">
            <div class="text-center">
                <img class="me-4" style="width: 20%;" src="~/assets/images/empty-data.svg" alt="" />
                <p class="p-0 mt-3 fw-semibold " style="font-size: 24px;">No data found</p>
            </div>
        </div>


        <div class="mt-4 mb-3" v-else>
            <table class="table">
                <thead>
                    <tr class="table-group-divider">
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Last Update</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider align-content-center align-items-center">
                    <tr v-for="(story, index) in storyStore.storyList" :key="story.id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ story.title }}</td>
                        <td>{{ story.updatedAt }}</td>
                        <td>
                            <UiBase-Button class="btn btn-outline-dark rounded-0 py-1 px-3 fs-6 me-3">
                                <i class="fa-solid fa-pen"></i> Edit
                            </UiBase-Button>
                            <UiBase-Button class="btn btn-outline-danger rounded-0 py-1 px-3 fs-6">
                                <i class="fa-solid fa-trash-can"></i> Delete
                            </UiBase-Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { useAuth } from '~/stores/auth';
import { useStory } from '~/stores/store';
import { onMounted } from 'vue';

const authStore = useAuth();
const storyStore = useStory();

await storyStore.getUserStory();
</script>