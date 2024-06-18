<template>
    <div class="container-lg">
        <div class="row">
            <div class="p-3 col-lg-8 detail-content">
                <DetailContent></DetailContent>
            </div>
            <div class="p-3 col-lg-4 detail-profile">
                <DetailProfile></DetailProfile>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const {id} = useRoute().params;

useHead({
    title: `StoryTime | Detail ${id}`
})
</script>

<style scoped>
@media (min-width: 768px) {
  .detail-content {
    margin-top: 0%;
  }

  .detail-profile {
    margin-top: 0%;
  }
}

@media (max-width: 767px) {
  .detail-content {
    margin-top: 18%;
  }

  .detail-profile {
    margin-top: 8%;
  }
}
</style>
