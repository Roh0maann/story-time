<template>
    <nav class="navbar bg-white navbar-expand-lg fixed-top shadow-sm">
        <div class="container">
            <NuxtLink to="/" class="navbar-brand">
                <img src="~/assets/images/logo.svg" alt="" />
            </NuxtLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end p-0 m-0" id="navbarSupportedContent">
                <div class="gap-3 d-flex">
                    <NuxtLink to="/user" class="btn btn-dark fs-6 rounded-0 px-4" type="submit">
                        <i class="fa-regular fa-user me-1"></i>
                        {{ profileStore.name }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useProfile } from '~/stores/profile';
import { useAuth } from '~/stores/auth';

const profileStore = useProfile();
const authStore = useAuth();

onMounted(async () => {
    authStore.checkAuth(); // Periksa otentikasi dan ambil token dari cookies
    if (authStore.userLogin) {
        await profileStore.profileUser(); // Ambil profil pengguna jika pengguna sudah login
    }
});
</script>
