<template>
    <div class="position-relative d-flex flex-wrap align-items-stretch col-md-4 col-12 p-0 m-0">
        <input v-model="searchValue" @keyup.enter="dataSearch" class="px-3 py-2 border rounded-0 col-10" placeholder="Search story..." type="text"
            style="font-size: 1rem" />
        <button @click="dataSearch" class="input-group-text bg-black text-white rounded-0 border-0 col-2 justify-content-center">
            <i class="fa-solid fa-magnifying-glass"></i>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const searchValue = ref('');

const emit = defineEmits(['searchData']);

function dataSearch() {
    emit('searchData', searchValue.value);
}
</script>