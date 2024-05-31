<template>
    <div>
        <label :for="identity" class="form-label">{{ label }}</label>
        <input 
            class="form-control rounded-0" 
            :type="type"    
            :id="identity"
            :placeholder="placeholder" 
            :value="modelValue" 
            :readonly="readonly" 
            @input="emit('update:modelValue', $event.target.value)" 
        />
    </div>
</template>

<script setup>
defineProps({
    type: { type: String, required: true },
    label: { type: String, required: true },
    identity: { type: String, required: true },
    placeholder: { type: String, required: false },
    readonly: { type: Boolean, required: false, default: false },
    modelValue: { type: String, required: true },
});

const emit = defineEmits(['update:modelValue']);
</script>
