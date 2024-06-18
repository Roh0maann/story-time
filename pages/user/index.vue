<template>
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-sm-12 menu">
          <UserMenu />
        </div>
        <div class="col-lg-9 col-sm-12">
          <UserMy />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  @media (min-width: 768px) {
  .menu {
    margin-top: 0%;
    margin-bottom: 0%;
  }
}

@media (max-width: 767px) {
  .menu {
    margin-top: 22%;
    margin-bottom: 12%;
  }
}
  </style>
  