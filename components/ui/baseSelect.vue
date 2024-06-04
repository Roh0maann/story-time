<template>
    <label :for="identity" class="form-label">
        {{ label }}
        <slot></slot>
    </label>
    <select class="form-select rounded-0" :id="identity" @input="handleInput" v-model="internalValue">
        <option v-for="(item, index) in data" :key="index" :value="item" :disabled="index === 0 && isOptionSelected">
            {{ item }}
        </option>
    </select>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    label: { type: String, required: true },
    identity: { type: String, required: true },
    data: { type: Array, required: true },
    modelValue: { type: [String, Number] },
});

const emit = defineEmits(['update:modelValue']);
const internalValue = ref(props.modelValue || props.data[0]);
const isOptionSelected = ref(internalValue.value !== props.data[0]);

const handleInput = (event) => {
    const newValue = event.target.value;
    internalValue.value = newValue;
    isOptionSelected.value = newValue !== props.data[0];
    emit('update:modelValue', newValue);
};

watch(() => props.modelValue, (newVal) => {
    internalValue.value = newVal;
    isOptionSelected.value = newVal !== props.data[0];
});
</script>
