<template>
    <div class="" style="padding-top: 8%; padding-bottom: 10%">
        <div class="container">
            <div class="row justify-content-center ">
                <div class="col-lg-5">
                    <form @submit.prevent="login" class="p-4 shadow">
                        <h4>Login</h4>
                        <div class="mt-3">
                            <div class="mb-3">
                                <UiBase-Input v-model="email" name="email" type="email" label="Email/Username" placeholder="Enter email/username" identity="email"/>
                            </div>
                            <div class="mb-3 position-relative">
                                <UiBase-Input v-model="password" name="password" :type="passwordFieldType" label="Password" placeholder="Enter password" identity="password" />
                                <span @click="togglePasswordVisibility" class="position-absolute top-50 end-0 mt-1 me-2 border-0 bg-white">
                                    <i :class="passwordIcon"></i>
                                </span>
                            </div>
                            <UiBase-Button type="submit" class="btn btn-dark w-100 rounded-0 py-2 fs-5">Login</UiBase-Button>
                            <p class="mt-3 mb-0">Don't have an account yet? <NuxtLink to="/register" class="fw-semibold text-black" style="text-decoration: none;">Register</NuxtLink></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"> 
useHead({
    title: "Login | Story Time"
});

import { ref, computed } from 'vue';
import { useAuth } from '~/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuth();
const router = useRouter();

const email = ref('');
const password = ref('');

const isPasswordVisible = ref(false);
const passwordFieldType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));
const passwordIcon = computed(() => (isPasswordVisible.value ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'));

function togglePasswordVisibility() {
    isPasswordVisible.value = !isPasswordVisible.value;
}

const login = async () => {
    try {
        const success = await authStore.loginUser(email.value, password.value);
        if (success) {
            console.log("Login berhasil");
            router.push("/"); 
        } else {
            console.log("Login gagal");
        }
    } catch (err) {
        console.error("Login error", err);
    }
};
</script>
