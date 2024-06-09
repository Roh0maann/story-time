<template>
    <div>
        <label :for="identity" class="form-label">
            {{ label }}
            <slot></slot>
        </label>
        <input :class="[{ 'd-none': isImage }, 'form-control', 'rounded-0']" :type="type" :id="identity"
            :placeholder="placeholder" :value="type === 'file' ? undefined : modelValue" :readonly="readonly === '1'"
            :disabled="disabled" :name="name" @input="handleInput" @change="handleChange" @keyup="handleKeyUp"
            @focus="handleFocus" />
    </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const props = defineProps({
    type: { type: String, required: true },
    label: { type: String, required: true },
    identity: { type: String, required: true },
    placeholder: { type: String, required: false },
    readonly: { type: String, required: true, default: '0' },
    isImage: { type: Boolean, required: true, default: false },
    modelValue: { type: [String, Number, File], required: true },
    disabled: { type: Boolean, required: false, default: false },
    name: { type: String, required: true },
});

const emit = defineEmits(['update:modelValue', 'keyInput', 'totalTimeFocus']);

const handleInput = (event) => {
    if (props.type !== 'file') {
        emit('update:modelValue', event.target.value);
    }
};

const handleChange = (event) => {
    if (props.type === 'file') {
        emit('update:modelValue', event.target.files[0]);
    }
};

const handleKeyUp = (event) => {
    emit('keyInput', event.target.value);
};

const handleFocus = (event) => {
    emit('totalTimeFocus', event.target.value);
};
</script>