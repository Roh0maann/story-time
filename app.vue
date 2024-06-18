<template>
  <div class="p-0 m-0">
    <NuxtLayout>
      <NuxtPage style="margin-top: 9%; margin-bottom: 7%;" />
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