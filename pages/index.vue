<template>
    <div>
      <div class="home-content1">
        <HomeContent1></HomeContent1>
      </div>
      <div class="home-content2">
        <HomeContent2></HomeContent2>
      </div>
    </div>
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
  
  <style scoped>
  @media (min-width: 768px) {
    .home-content1 {
      margin-top: 19%;
    }
  
    .home-content2 {
      margin-top: 15%;
    }
  }
  
  @media (max-width: 767px) {
    .home-content1 {
      margin-top: 60%;
    }
  
    .home-content2 {
      margin-top: 40%;
    }
  }
  </style>
  