<template>
    <button class="btn" @click="$emit('clickButton')">
        <slot></slot>
    </button>
</template>