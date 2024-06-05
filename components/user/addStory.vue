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
                    <UiBase-Select v-model="category" :data="categoryOptions" label="Category" identity="category" />
                </div> 
                <div class="mb-3">
                    <label class="form-label">Content</label>
                    <UiQuill v-model:content="content"></UiQuill>
                </div>
                <div class="mb-3 position-relative">
                    <label for="exampleInputPassword1" class="form-label">Cover Image</label>
                    <div v-if="!imageUrl" name="inputImage">
                        <div class="w-100">
                            <UiBase-Input class="d-none" v-model="image" type="file" label="" identity="inputImage" isImage @update:modelValue="onImageChange" />
                            <label for="inputImage" class="d-flex justify-content-center align-content-center align-items-center border-2 border-secondary flex-column m-0" style="border-style: dashed; width: 300px; height: 300px; cursor: pointer;">
                                <i class="fa-solid fa-circle-plus fs-5"></i>
                                <p class="m-0 p-0">Add image</p>
                            </label>
                        </div>
                    </div>
                    <div v-if="imageUrl" name="outputImage">
                        <div class="w-100 d-flex">
                            <div class="ms-4" style="width: 30%;">
                                <img :src="imageUrl" class="w-100 h-100" alt="">
                            </div>
                            <button type="button" @click="removeImage" class="btn rounded-circle fs-4 d-flex justify-content-center align-items-center" style="width: 25px; height: 25px;">
                                <i class="text-danger fa-solid fa-circle-xmark"></i>
                            </button>
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStory } from '~/stores/store';
import { useCategory } from '~/stores/category';

const router = useRouter();
const categoryStore = useCategory();
const storyStore = useStory();

const title = ref('');
const content = ref('');
const category = ref('');
const image = ref<File | null>(null);
const imageUrl = ref<string | null>(null);
const categoryOptions = ref<string[]>(['Select a category']); // Default option

onMounted(async () => {
    await categoryStore.fetchCategories();
    categoryOptions.value = ['Select a category', ...categoryStore.categoryList];
});

function batalAdd() {
    router.push('/user/story');
}

async function saveStory() {
    try {
        await storyStore.addStory(title.value, content.value, category.value, image.value);
        console.log(title.value);
        console.log(content.value);
        console.log(category.value);
        console.log(image.value);
        
        router.push('/user/story');
    } catch (err) {
        console.log(err);
    }
}

function onImageChange(file: File) {
    image.value = file; 
    imageUrl.value = URL.createObjectURL(file);
}

function removeImage() {
    image.value = null;
    imageUrl.value = null;
}
</script>
