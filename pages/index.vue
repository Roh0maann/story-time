<template>
    <HomeContent1></HomeContent1>
    <HomeContent2></HomeContent2>
</template>

<script setup>
useHead({
    title: "Story Time"
})

import { onMounted } from 'vue';
import { useProfile } from '~/stores/profile';

const profileStore = useProfile();

onMounted(() => {
    profileStore.loadBookmarks();
});
</script>