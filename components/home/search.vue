<template>
    <div class="input-group w-50">
        <input v-model="searchValue" @keyup.enter="dataSearch" class="px-3 py-1 border rounded-0 w-50" placeholder="Search story..." type="text"
            style="font-size: 1rem" />
        <button @click="dataSearch" class="input-group-text bg-black text-white rounded-0 border-0">
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
</script>/
