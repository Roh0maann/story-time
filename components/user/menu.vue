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
                    class="py-1 px-3 btn btn-outline-danger rounded-0 w-100 d-flex justify-content-between align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Logout
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </div>
            </li>
        </ul>
    </div>


    <div class="modal fade" id="exampleModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Logout</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Are you sure want to logout?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-dark rounded-0" data-bs-dismiss="modal">Cancle</button>
                    <button type="button" class="btn btn-dark rounded-0" data-bs-dismiss="modal" @click="logout()">Logout</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuth();
const router = useRouter();

const logout = async () => {
    await authStore.logout();
    router.push('/');
}
</script>
