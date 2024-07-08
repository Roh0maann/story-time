<template>
    <div>
        <label :for="identity" class="form-label">
            {{ label }}
            <slot></slot>
        </label>
        <input :class="['form-control', 'rounded-0']"
            type="file"
            :id="identity"
            :placeholder="placeholder"
            :value="undefined"
            :readonly="readonly === '1'"
            :disabled="disabled"
            :name="name"
            @change="handleChange"
        />
    </div>
</template>

<script setup>
const props = defineProps({
    label: { type: String, required: true },
    identity: { type: String, required: true },
    placeholder: { type: String, default: '' },
    readonly: { type: String, default: '0' },
    disabled: { type: Boolean, default: false },
    name: { type: String, required: true },
});

const emit = defineEmits(['update:modelValue']);

const handleChange = (event) => {
    emit('update:modelValue', event.target.files[0]);
};
</script>
