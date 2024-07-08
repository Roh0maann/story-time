<template>
    <div class="">
        <div class="container login">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <form @submit="login" class="p-4 shadow">
                        <h4>Login</h4>
                        <div class="mt-3">
                            <div class="mb-3">
                                <UiBase-Input v-model="identifier" name="identifier" type="text" label="Email/Username" placeholder="Enter email/username" identity="identifier"/>
                                <p class="text-danger">{{ identifierError }}</p>
                            </div>
                            <div class="mb-3">
                                <div class="position-relative">
                                    <UiBase-Input v-model="password" name="password" :type="passwordFieldType" label="Password" placeholder="Enter password" identity="password" />
                                    <span @click="togglePasswordVisibility" class="position-absolute top-50 end-0 mt-1 me-2 border-0 bg-white">
                                        <i :class="passwordIcon"></i>
                                    </span>
                                </div>
                                <p class="text-danger">{{ passwordError }}</p>
                            </div>
                            <UiBase-Button type="submit" class="btn btn-dark w-100 rounded-0 py-2 fs-5">Login</UiBase-Button>
                            <p class="mt-3 mb-0">Don't have an account yet? <NuxtLink to="/register" class="fw-semibold text-black" style="text-decoration: none;">Register</NuxtLink></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: "Login | Story Time"
});

import { ref, computed, onMounted } from "vue";
import { useAuth } from "~/stores/auth";
import { useRouter } from "vue-router";
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
    identifier: yup.string().required("Email or username is required"),
    password: yup.string().required("Password is required").min(8, 'Password must be at least 8 characters')
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const { value: identifier, errorMessage: identifierError } = useField('identifier');
const { value: password, errorMessage: passwordError } = useField('password');

const authStore = useAuth();
const router = useRouter();

const isPasswordVisible = ref(false);
const passwordFieldType = computed(() => (isPasswordVisible.value ? "text" : "password"));
const passwordIcon = computed(() => (isPasswordVisible.value ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"));

function togglePasswordVisibility() {
    isPasswordVisible.value = !isPasswordVisible.value;
}

const login = handleSubmit(async (values) => {
    authStore.email = values.identifier.includes("@") ? values.identifier : "";
    authStore.username = !values.identifier.includes("@") ? values.identifier : "";
    authStore.password = values.password;

    try {
        const success = await authStore.loginUser();
        if (success) {
            resetForm();
            router.push("/");
        } else {
            alert("Login gagal");
        }
    } catch (err) {
        console.error("Login error", err);
    }
});

onMounted(() => {
    authStore.checkAuth();
});
</script>

<style scoped>
@media (min-width: 768px) {
  .login {
    margin-top: 0%;
    margin-bottom: 0%
  }
}

@media (max-width: 767px) {
  .login {
    margin-top: 35%;
    margin-bottom: 20%;
  }
}
</style>