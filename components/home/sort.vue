<template>
    <div class="p-0 m-0 w-25">
        <select v-model="sortOrder" class="py-2 px-2 w-100 m-0 form-select rounded-0">
            <option value="" disabled selected>Sort</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(['sortedData']);

const sortOrder = ref('');

watch(sortOrder, (newOrder) => {
    emit('sortedData', newOrder);
});
</script>
