<template>
    <div>
        <HeaderNavigation v-if="isUserLoggedIn" />
        <HeaderNavbar-Login v-else />
        <slot/>
        <FooterFooters/>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuth } from '~/stores/auth';

const auth = useAuth();

const isUserLoggedIn = computed(() => {
    return auth.userLogin === null;
});
</script>