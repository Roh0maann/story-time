<template>
    <div class="">
        <div class="container login">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <Form :validation-schema="schema" @submit="login" class="p-4 shadow">
                        <h4>Login</h4>
                        <div class="mt-3">
                            <div class="mb-3">
                                <UiBase-Input v-model="identifier" name="identifier" type="text" label="Email/Username" placeholder="Enter email/username" identity="identifier"/>
                                <ErrorMessage name="identifier" class="text-danger" />
                            </div>
                            <div class="mb-3">
                                <div class="position-relative">
                                    <UiBase-Input v-model="authStore.password" name="password" :type="passwordFieldType" label="Password" placeholder="Enter password" identity="password" />
                                    <span @click="togglePasswordVisibility" class="position-absolute top-50 end-0 mt-1 me-2 border-0 bg-white">
                                        <i :class="passwordIcon"></i>
                                    </span>
                                </div>
                                <ErrorMessage name="password" class="text-danger" />
                            </div>
                            <UiBase-Button type="submit" class="btn btn-dark w-100 rounded-0 py-2 fs-5">Login</UiBase-Button>
                            <p class="mt-3 mb-0">Don't have an account yet? <NuxtLink to="/register" class="fw-semibold text-black" style="text-decoration: none;">Register</NuxtLink></p>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>z
</template>

<script setup lang="ts">
useHead({
    title: "Login | Story Time"
});

import { ref, computed, onMounted } from "vue";
import { useAuth } from "~/stores/auth";
import { useRouter } from "vue-router";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const schema = yup.object({
    identifier: yup.string().required("Email or username is required"),
    password: yup.string().required("Password is required")
});

const authStore = useAuth();
const router = useRouter();

const identifier = ref("");

const isPasswordVisible = ref(false);
const passwordFieldType = computed(() => (isPasswordVisible.value ? "text" : "password"));
const passwordIcon = computed(() => (isPasswordVisible.value ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"));

function togglePasswordVisibility() {
    isPasswordVisible.value = !isPasswordVisible.value;
}

const login = async (values) => {
    authStore.email = values.identifier.includes("@") ? values.identifier : "";
    authStore.username = !values.identifier.includes("@") ? values.identifier : "";

    try {
        const success = await authStore.loginUser();
        if (success) {
            identifier.value = "";
            authStore.password = "";
            router.push("/");
        } else {
            alert("Login gagal");
        }
    } catch (err) {
        console.error("Login error", err);
    }
};

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
