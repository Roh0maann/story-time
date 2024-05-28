<template>
    <div class="container-lg" style="margin-bottom: 5%; margin-top: 8%;">
        <div class="row">
            <div class="p-3 col-lg-8">
                <DetailContent></DetailContent>
            </div>
            <div class="p-3 col-lg-4">
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
