<template>
    <div class="border shadow m-0 p-4 w-100 mb-4">
        <div class="d-flex justify-content-start align-items-center align-content-center fs-5">
            <NuxtLink to="/user/story" class="text-decoration-none text-black">
                <i class="fa-solid fa-arrow-left me-4"></i>
            </NuxtLink>
            <h4 class="m-0 p-0">Edit Story</h4>
        </div>

        <form @submit.prevent="saveStory" class="">
            <div class="mt-4">
                <div class="mb-3">
                    <UiBase-Input v-model="title" name="title" type="text" label="Title" placeholder="Enter a story title" identity="title" />
                </div>
                <div class="mb-3">
                    <UiBase-Select v-model="category" :data="listCategory" label="Category" identity="category" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Content</label>
                    <Field name="content" v-slot="field">
                        <UiQuill v-bind="field" v-model:content="content"></UiQuill>
                    </Field>
                </div>
                <div class="mb-3 position-relative">
                    <label for="exampleInputPassword1" class="form-label">Cover Image</label>
                    <div v-if="!imageUrl" name="inputImage">
                        <div class="w-100">
                            <UiBase-Input-Img class="d-none" v-model="image" type="file" label="" identity="inputImage" isImage @update:modelValue="onImageChange" />
                            <label for="inputImage" class="d-flex justify-content-center align-content-center align-items-center border-2 border-secondary flex-column m-0" style="border-style: dashed; width: 300px; height: 300px; cursor: pointer;">
                                <i class="fa-solid fa-circle-plus fs-5"></i>
                                <p class="m-0 p-0">Add image</p>
                            </label>
                        </div>
                    </div>

                    <div v-if="imageUrl" name="outputImage" class="row">
                        <div class="d-flex col-sm-12 col-lg-6">
                            <div class="ms-4">
                                <NuxtImg :src="imageSrc" class="w-100 h-100" alt=""/>
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
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStory } from '~/stores/store';
import { useCategory } from '~/stores/category';

const router = useRouter();
const route = useRoute();
const categoryStore = useCategory();
const storyStore = useStory();

const storyId = route.params.id;
const urlBase = 'https://storytime-api.strapi.timedoor-js.web.id';

const title = ref('');
const content = ref('');
const category = ref('');
const image = ref<File | null>(null);
const imageUrl = ref('');

const listCategory = computed(() => {
    return categoryStore.categoryList;
});

onMounted(async () => {
    await categoryStore.fetchCategories();
    await fetchStoryDetails();
});

async function fetchStoryDetails() {
    try {
        await storyStore.getStoryDetail(storyId);
        const story = storyStore.storyListDetail;

        title.value = story.title;
        content.value = story.content;
        category.value = story.category ? story.category.id : '';
        imageUrl.value = story.cover_image ? story.cover_image.url : '';

    } catch (err) {
        console.error(err);
    }
}

function batalAdd() {
    router.push('/user/story');
}

async function saveStory() {
    try {
        const updatedData = {
            data: {
                title: title.value,
                content: content.value,
                category: category.value
            }
        };

        await storyStore.updateStory(storyId, updatedData);

        if (image.value) {
            if (imageUrl.value) {
                await storyStore.deleteImg(storyId);
            }

            await storyStore.addImg(image.value, storyId);
        }

        router.push('/user/story');
    } catch (err) {
        console.error(err);
    }
}

function onImageChange(file: File) {
    image.value = file; 
    imageUrl.value = URL.createObjectURL(file);
}

function removeImage() {
    image.value = null;
    imageUrl.value = '';
}

const imageSrc = computed(() => {
    return imageUrl.value.startsWith('blob:') ? imageUrl.value : urlBase + imageUrl.value;
});
</script>
