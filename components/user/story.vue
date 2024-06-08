<template>
    <div class="border shadow m-0 p-4 w-100 mb-4">
        <div class="d-flex justify-content-between align-items-center align-content-center">
            <h4 class="m-0 p-0">Story List</h4>
            <NuxtLink to="/user/story/create" class="py-1 px-2 btn btn-dark rounded-0 fw-semibold btn-create-story"
                style="font-size: 14px;">
                +
                Create Story
            </NuxtLink>
        </div>

        <div class="mt-5 mb-3" v-if="storyStore.storyList.length === 0">
            <div class="text-center">
                <img class="me-4 empty-data-image" style="width: 20%;" src="~/assets/images/empty-data.svg" alt="No data found" />
                <p class="p-0 mt-3 fw-semibold empty-data-text" style="font-size: 24px;">No data found</p>
            </div>
        </div>

        <div class="mt-4 mb-3" v-else>
            <table class="table">
                <thead>
                    <tr class="table-group-divider fs-6">
                        <th scope="col" class="w-50">Title</th>
                        <th scope="col">Last Update</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="(story, index) in storyStore.storyList" :key="story.id" style="font-size: 14px;">
                        <td>
                            <NuxtLink :to="'/story/' + story.id" class="text-decoration-none text-black">{{ story.title
                                }}</NuxtLink>
                        </td>
                        <td>{{ formatDateStory(story.updatedAt) }}</td>
                        <td>
                            <NuxtLink :to="'/user/story/' + story.id + '/edit'"
                                class="btn btn-outline-dark rounded-0 py-1 px-3 me-3 btn-edit">
                                <i class="fa-solid fa-pen"></i> Edit
                            </NuxtLink>
                            <UiBase-Button class="btn btn-outline-danger rounded-0 py-1 px-3 btn-delete"
                                @click="deleteStory(story.id)">
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
import { formatDateStory } from '~/helpers/dateFormat';

const authStore = useAuth();
const storyStore = useStory();

onMounted(async () => {
    try {
        await storyStore.getUserStory();
    } catch (error) {
        console.error('Failed to fetch stories:', error);
    }
});

const deleteStory = async (storyId) => {
    if (confirm('yakin mau hapus ?')) {
        try {
            await storyStore.deleteUserStory(storyId);
        } catch (error) {
            console.error('Failed to delete story:', error);
        }
    }
};
</script>
