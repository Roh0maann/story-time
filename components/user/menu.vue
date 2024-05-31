<template>
    <div>
        <ul class="border shadow m-0 p-0 w-100">
            <NuxtLink to="/user" class="btn btn-light rounded-0 d-flex align-items-center p-2 ps-3 border-bottom">
                <i class="fa-regular fa-user me-2"></i>
                My Profile
            </NuxtLink>
            <NuxtLink to="/user/story" class="btn btn-light rounded-0 user-menu d-flex align-items-center p-2 ps-3 border-bottom">
                <i class="fa-regular fa-rectangle-list me-2"></i>
                Story List
            </NuxtLink>
            <NuxtLink to="/user/bookmark" class="btn btn-light rounded-0 user-menu d-flex align-items-center p-2 ps-3">
                <i class="fa-regular fa-bookmark me-2"></i>
                Bookmark
            </NuxtLink>
            <li class="user-menu d-flex align-items-center p-2 bg-light">
                <div
                    class="py-1 px-3 btn btn-outline-danger rounded-0 w-100 d-flex justify-content-between align-items-center" @click="logout()">
                    Logout
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuth();
const router = useRouter();

const logout = async () => {
    await authStore.Logout();
    router.push('/login');
}
</script>