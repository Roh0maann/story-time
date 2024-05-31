<template>
    <div class="border shadow m-0 p-4 w-100 mb-4">
        <div class="d-flex justify-content-start align-items-center align-content-center fs-5">
            <NuxtLink to="/user/story" class="text-decoration-none text-black">
                <i class="fa-solid fa-arrow-left me-4"></i>
            </NuxtLink>
            <h4 class="m-0 p-0">Create Story</h4>
        </div>

        <form @submit.prevent="saveStory" class="">
            <div class="mt-4">
                <div class="mb-3">
                    <UiBase-Input v-model="title" name="title" type="text" label="Title" placeholder="Enter a story title" identity="title" />
                </div>
                <div class="mb-3">
                    <UiBase-Select v-model="category" :data="['Select a category', 'Comedy', 'Horror', 'Romance']" label="Category" identity="category" />
                </div>
                <div class="mb-3">
                    <UiQuill v-model="content" label="Content" placeholder="Insert text here ..."></UiQuill>
                </div>
                <div class="mb-3 position-relative">
                    <label for="exampleInputPassword1" class="form-label">Cover Image</label>
                    <div>
                        <div class="w-100">
                            <label for="inputImage" class="d-flex justify-content-center align-content-center align-items-center border-2 border-secondary flex-column" style="border-style: dashed; width: 300px; height: 300px; cursor: pointer;">
                                <i class="fa-solid fa-circle-plus fs-5"></i>
                                <p class="m-0 p-0">Add image</p>
                            </label>
                            <input id="inputImage" type="file" identity="storyImage" class="d-none"/>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <UiBase-Button type="button" class="btn btn-outline-dark rounded-0 py-1 px-3 fs-6 me-3" @click="batalAdd">Batal</UiBase-Button>
                    <UiBase-Button type="submit" class="btn btn-dark rounded-0 py-1 px-3 fs-6">Simpan</UiBase-Button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const title = ref('');
const content = ref('');
const category = ref('Select a category');
const image = ref(null);

function batalAdd() {
    router.push('/user/story');
}

function saveStory() {
    // Logika untuk menyimpan cerita
}
</script>
