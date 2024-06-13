<template>
    <label :for="identity" class="form-label">
        {{ label }}
        <slot></slot>
    </label>
    <Field :name="name" as="select" class="form-select rounded-0" :id="identity" @input="handleInput" v-model="internalValue">
        <option disabled value="">Select Category</option>
        <option v-for="(item, index) in data" :key="index" :value="item.id">
            {{ item.name }}
        </option>
    </Field>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const props = defineProps({
    label: { type: String, required: true },
    identity: { type: String, required: true },
    data: { type: Array, required: true },
    modelValue: { type: [String, Number, null], default: '' },
    name: { type: String, required: true },
});

const emit = defineEmits(['update:modelValue']);
const internalValue = ref(props.modelValue || '');

const handleInput = (event) => {
    const newValue = event.target.value;
    internalValue.value = newValue;
    emit('update:modelValue', newValue);
};

watch(() => props.modelValue, (newVal) => {
    internalValue.value = newVal;
});
</script>
