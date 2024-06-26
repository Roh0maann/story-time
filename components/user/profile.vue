<template>
    <div class="border shadow m-0 p-4 w-100 mb-4">
        <div class="d-flex justify-content-between align-items-center align-content-center">
            <h4 class="m-0 px-1">My Profile</h4>
            <UiBase-Button v-if="!isEditing" class="w-auto py-1 px-3 btn btn-outline-dark rounded-0"
                style="font-size: 16px;" @click="startEditing">
                <i class="fa-regular fa-pen-to-square"></i>
                Edit Profile
            </UiBase-Button>
        </div>
        <div class="mt-5 mb-4 row gap-lg-0 gap-4">
            <div class="col-lg-4 col-sm-12 d-flex justify-content-center justify-content-lg-start">
                <div class="" style="width: 200px;">
                    <div class="mb-4">
                        <img class="w-100 h-100 object-fit-cover rounded-circle"
                            :src="profileStore.img ? urlBase + profileStore.img : 'https://via.placeholder.com/150'"
                            alt="">
                    </div>

                    <div class="w-100">
                        <UiBase-Input-Img class="d-none" v-model="imageProfile" type="file" label=""
                            identity="inputImage" isImage @update:modelValue="onImageChange" />
                        <label for="inputImage" class="py-1 px-3 btn btn-outline-dark rounded-0 w-100 "
                            data-bs-toggle="modal" data-bs-target="#cropper" style="font-size: 16px;">
                            <p class="m-0 p-0">Change Avatar</p>
                        </label>
                    </div>
                </div>
            </div>
            <div class="col-lg-8 col-sm-12">
                <div v-if="!isEditing" class="d-flex" name="dataProfile">
                    <div class="text-black fw-semibold me-5">
                        <p>Name</p>
                        <p>Email</p>
                        <p>Biodata</p>
                    </div>
                    <div class="text-secondary fw-normal w-100">
                        <p>{{ profileStore.name }}</p>
                        <p>{{ profileStore.email }}</p>
                        <p>{{ profileStore.biodata }}</p>
                    </div>
                </div>
                <div v-if="isEditing">
                    <Form :validation-schema="schema" @submit="saveProfile">
                        <div class="mb-3">
                            <UiBase-Input name="name" type="text" label="Name" placeholder="Enter your name"
                                identity="name" v-model="profileStore.name" />
                            <ErrorMessage name="name" class="text-danger" />
                        </div>
                        <div class="mb-3">
                            <UiBase-Input name="email" type="email" label="Email" placeholder="Enter email"
                                identity="email" v-model="profileStore.email" :disabled="true" />
                        </div>
                        <div class="mb-3">
                            <UiBase-Text-Area name="aboutMe" label="About me" placeholder="Enter about me"
                                identity="aboutMe" v-model="profileStore.biodata" />
                        </div>
                        <div class="d-flex justify-content-end">
                            <UiBase-Button type="button" class="btn btn-outline-dark rounded-0 py-1 px-3 fs-6 me-3"
                                @click="cancelEditing">Cancel</UiBase-Button>
                            <UiBase-Button type="submit"
                                class="btn btn-dark rounded-0 py-1 px-3 fs-6">Save</UiBase-Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>

    <div class="modal mt-5" id="cropper" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Adjust Image</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="removeImage"></button>
                </div>
                <div class="modal-body">
                    <vue-cropper v-if="imageUrlProfile" ref="cropper" :aspect-ratio="16 / 16" :src="imageUrlProfile"
                        preview=".preview" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-dark rounded-0" data-bs-dismiss="modal"
                        @click="removeImage">Cancel</button>
                    <button type="button" class="btn btn-dark rounded-0" data-bs-dismiss="modal"
                        @click="cropImage">Change</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProfile } from '~/stores/profile';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const isEditing = ref(false);
const profileStore = useProfile();
const imageProfile = ref('');
const imageUrlProfile = ref('');
const cropper = ref('');
const urlBase = 'https://storytime-api.strapi.timedoor-js.web.id/';

const schema = yup.object({
    name: yup.string().required("Name is required"),
});

onMounted(async () => {
    await profileStore.profileUser();
});

function startEditing() {
    isEditing.value = true;
}

function cancelEditing() {
    isEditing.value = false;
}

async function saveProfile() {
    await profileStore.editUser({
        name: profileStore.name,
        email: profileStore.email,
        biodata: profileStore.biodata
    });

    isEditing.value = false;
}

function onImageChange(file: File) {
    imageProfile.value = file;
    imageUrlProfile.value = URL.createObjectURL(file);
}

function removeImage() {
    imageProfile.value = '';
    imageUrlProfile.value = '';
}

async function cropImage() {
    if (cropper.value) {
        const croppedCanvas = cropper.value.getCroppedCanvas();
        croppedCanvas.toBlob(async (blob) => {
            if (blob) {
                try {
                    await profileStore.deleteImgProfile();

                    await profileStore.addImgProfile(blob);

                    await profileStore.profileUser();

                } catch (err) {
                    console.error(err);
                }
            };
        });
    }
}
</script>



<style scoped>
.preview {
    width: 100%;
    height: calc(372px * (9 / 16));
    overflow: hidden;
}
</style>