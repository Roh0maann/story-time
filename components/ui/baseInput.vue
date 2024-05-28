<template>
    <div>
        <label :for="identity" class="form-label">
            {{ label }}
            <slot></slot>
        </label>
        <input  :class="[{ 'd-none': isImage }, 'form-control', 'rounded-0']" 
                :type="type"    
                :id="identity"
                :placeholder="placeholder" 
                :value="modelValue" 
                :readonly="readonly === '1'" 
                @input="handleInput" 
                @keyup="handleKeyUp" 
                @focus="handleFocus">
    </div>
</template>

<script setup>
const props = defineProps({
    type: { type: String, required: true },
    label: { type: String, required: true },
    identity: { type: String, required: true },
    placeholder: { type: String, required: false },
    readonly: { type: String, required: true, default: '0' },
    isImage: { type: Boolean, required: true, default: false },
    modelValue: { type: [String, Number], required: true }
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
