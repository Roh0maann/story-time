<template>
    <div>
        <label :for="identity" class="form-label">
            {{ label }}
            <slot></slot>
        </label>
            <input :class="['form-control', 'rounded-0']"
            v-bind="field"
            :type="type"
            :id="identity"
            :placeholder="placeholder"
            :value="modelValue"
            :readonly="readonly === '1'"
            :disabled="disabled"
            :name="name"
            @input="handleInput"
            @keyup="handleKeyUp"
            @focus="handleFocus"
            />
    </div>
</template>

<script setup>
const props = defineProps({
    type: { type: String, required: true },
    label: { type: String, required: true },
    identity: { type: String, required: true },
    placeholder: { type: String, default: '' },
    readonly: { type: String, default: '0' },
    modelValue: { type: [String, Number], required: true },
    disabled: { type: Boolean, default: false },
    name: { type: String, required: true },
});

const emit = defineEmits(['update:modelValue', 'keyInput', 'totalTimeFocus']);

const handleInput = (event) => {
    emit('update:modelValue', event.target.value);
};

const handleKeyUp = (event) => {
    emit('keyInput', event.target.value);
};

const handleFocus = (event) => {
    emit('totalTimeFocus', event.target.value);
};
</script>
