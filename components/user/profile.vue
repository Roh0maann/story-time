<template>
    <div class="border shadow m-0 p-4 w-100 mb-4">
        <div class="d-flex justify-content-between align-items-center align-content-center">
            <h4 class="m-0 p-0">My Profile</h4>
            <UiBase-Button v-if="!isEditing" class="py-1 px-3 btn btn-outline-dark rounded-0" style="font-size: 16px; width: 17%;" @click="startEditing">
                <i class="fa-regular fa-pen-to-square"></i>
                Edit Profile
            </UiBase-Button>
        </div>
        <div class="mt-5 mb-4 d-flex row">
            <div class="col-4">
                <div class="" style="width: 200px;">
                    <div class="mb-4">
                        <img class="w-100 h-100 object-fit-cover rounded-circle" src="https://via.placeholder.com/150"
                            alt="">
                    </div>
                    <button class="py-1 px-3 btn btn-outline-dark rounded-0 w-100 " style="font-size: 16px;">
                        Change Avatar
                    </button>
                </div>
            </div>
            <div class="col-8">
                <div v-if="!isEditing" class="d-flex" name="dataProfile">
                    <div class="text-black fw-semibold me-5">
                        <p>Name</p>
                        <p>Email</p>
                        <p>Biodata</p>
                    </div>

                    <div class="text-secondary fw-normal w-100">
                        <p>{{ profile.name }}</p>
                        <p>{{ profile.email }}</p>
                        <p>{{ profile.biodata }}</p>
                    </div>
                </div>

                <div v-if="isEditing">
                    <form @submit.prevent="saveProfile">
                        <div class="mb-3">
                            <UiBase-Input name="name" type="text" label="Name" placeholder="Enter your name" identity="name" v-model="profile.name" />
                        </div>
                        <div class="mb-3">
                            <UiBase-Input name="email" type="email" label="Email" placeholder="Enter email" identity="email" v-model="profile.email" :disabled="true" />
                        </div>
                        <div class="mb-3">
                            <UiBase-Text-Area name="aboutMe" label="About me" placeholder="Enter about me" identity="aboutMe" v-model="profile.biodata" />
                        </div>
                        <div class="d-flex justify-content-end">
                            <UiBase-Button type="button" class="btn btn-outline-dark rounded-0 py-1 px-3 fs-6 me-3" @click="cancelEditing">Cancel</UiBase-Button>
                            <UiBase-Button type="submit" class="btn btn-dark rounded-0 py-1 px-3 fs-6">Save</UiBase-Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isEditing = ref(false);
const profile = ref({
    name: 'Ezy',
    email: 'Ezy@gmail.com',
    biodata: 'Hi'
});

function startEditing() {
    isEditing.value = true;
}

function cancelEditing() {
    isEditing.value = false;
}

function saveProfile() {
    isEditing.value = false;
}
</script>
