<template>
    <div class="" style="padding-top: 8%; padding-bottom: 10%">
        <div class="container">
            <div class="row justify-content-center ">
                <div class="col-lg-5">
                    <form @submit.prevent="register" class=" p-4 shadow">
                        <h4>Register</h4>
                        <div class="mt-3">
                            <div class="mb-3">
                                <UiBase-Input v-model="store.name" name="name" type="text" label="Name" placeholder="Enter name" identity="name" />
                            </div>
                            <div class="mb-3">
                                <UiBase-Input v-model="store.username" name="username" type="text" label="Username" placeholder="Enter username" identity="username" />
                            </div>
                            <div class="mb-3">
                                <UiBase-Input v-model="store.email" name="email" type="email" label="Email" placeholder="Enter email" identity="email" />
                            </div>
                            <div class="mb-3 position-relative">
                                <UiBase-Input v-model="store.password" name="password" :type="passwordFieldType" label="Password" placeholder="Enter password" identity="password" />
                                <span @click="togglePasswordVisibility" class="position-absolute top-50 end-0 mt-1 me-2 border-0 bg-white">
                                    <i :class="passwordIcon"></i>
                                </span>
                            </div>
                            <div class="mb-3 position-relative">
                                <UiBase-Input v-model="store.passwordConfirmation" name="confirmation" :type="passwordFieldType1" label="Password Confirmation" placeholder="Enter password confirmation" identity="confirmation" />
                                <span @click="togglePasswordVisibility1" class="position-absolute top-50 end-0 mt-1 me-2 border-0 bg-white">
                                    <i :class="passwordIcon1"></i>
                                </span>
                            </div>
                            <UiBase-Button type="submit" class="btn btn-dark w-100 rounded-0 py-2 fs-5">Register</UiBase-Button>
                            <p class="mt-3 mb-0">Already have an account? <NuxtLink to="/login" class="fw-semibold text-black" style="text-decoration: none;">Login</NuxtLink></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: "Register | Story Time"
});

import { ref, computed } from 'vue';
import { useAuth } from '~/stores/auth';
import { useRouter } from 'vue-router';

const store = useAuth();
const router = useRouter();

const isPasswordVisible = ref(false);
const passwordFieldType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));
const passwordIcon = computed(() => (isPasswordVisible.value ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'));

function togglePasswordVisibility() {
    isPasswordVisible.value = !isPasswordVisible.value;
}

const isPasswordVisible1 = ref(false);
const passwordFieldType1 = computed(() => (isPasswordVisible1.value ? 'text' : 'password'));
const passwordIcon1 = computed(() => (isPasswordVisible1.value ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'));

function togglePasswordVisibility1() {
    isPasswordVisible1.value = !isPasswordVisible1.value;
}

const register = async () => {
    await store.registerUser();
    router.push("/");
};
</script>
