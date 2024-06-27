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
import { useAuth } from '~/stores/auth';

const auth = useAuth();
const profileStore = useProfile();

onMounted(async () => {
    await auth.checkAuth();
    profileStore.loadBookmarks();
});
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>