<template>
  <div class="p-0 m-0">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProfile } from '~/stores/profile';

const profileStore = useProfile();

onMounted(() => {
    profileStore.loadBookmarks();
});
</script>