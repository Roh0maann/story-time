<template>
    <div>
        <HeaderNavbar-Login v-if="isUserLoggedIn" /> <!-- navbar ketika belum login -->
        <HeaderNavigation v-else /> <!-- navbar ketika sudah login -->
        <slot/>
        <FooterFooters/>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAuth } from '~/stores/auth';

const auth = useAuth();

const isUserLoggedIn = computed(() => {
    return auth.userLogin;
});

onMounted(() => {
    auth.checkAuth();
});
</script>
