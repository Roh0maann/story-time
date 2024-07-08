<template>
    <div class="">
        <div class="container register">
            <div class="row justify-content-center ">
                <!-- Form Register -->
                <div v-if="!registrationSuccess" class="col-lg-5">
                    <form @submit="register" class="p-4 shadow">
                        <h4>Register</h4>
                        <div class="mt-3">
                            <div class="mb-3">
                                <UiBase-Input v-model="name" name="name" type="text" label="Name" placeholder="Enter name" identity="name" />
                                <p class="text-danger">{{ nameError }}</p>
                            </div>
                            <div class="mb-3">
                                <UiBase-Input v-model="username" name="username" type="text" label="Username" placeholder="Enter username" identity="username" />
                                <p class="text-danger">{{ usernameError }}</p>
                            </div>
                            <div class="mb-3">
                                <UiBase-Input v-model="email" name="email" type="email" label="Email" placeholder="Enter email" identity="email" />
                                <p class="text-danger">{{ emailError }}</p>
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
                            <div class="mb-3">
                                <div class="position-relative">
                                    <UiBase-Input v-model="passwordConfirmation" name="confirmation" :type="passwordFieldType1" label="Password Confirmation" placeholder="Enter password confirmation" identity="confirmation" />
                                    <span @click="togglePasswordVisibility1" class="position-absolute top-50 end-0 mt-1 me-2 border-0 bg-white">
                                        <i :class="passwordIcon1"></i>
                                    </span>
                                </div>
                                <p class="text-danger">{{ passwordConfirmationError }}</p>
                            </div>
                            <UiBase-Button type="submit" class="btn btn-dark w-100 rounded-0 py-2 fs-5">Register</UiBase-Button>
                            <p class="mt-3 mb-0">Already have an account? <NuxtLink to="/login" class="fw-semibold text-black" style="text-decoration: none;">Login</NuxtLink></p>
                        </div>
                    </form>
                </div>

                <!-- Registration Success Message -->
                <div v-if="registrationSuccess" name="registrasi success" class="col-lg-5 d-flex justify-content-center flex-column text-center">
                    <div class="mb-4">
                        <img class="w-75 m-0 p-0" src="/assets/images/success.svg" alt="">
                    </div>
                    <div class="m-0 p-0 fw-bolder">
                        <h2>REGISTRATION SUCCESS</h2>
                    </div>
                    <div>
                        <NuxtLink to="/login" class="btn btn-dark text-white fs-5 rounded-0 px-4 w-25" type="submit">
                            Login
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
useHead({
    title: "Register | Story Time"
});

import { ref, computed } from 'vue';
import { useAuth } from '~/stores/auth';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  confirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Password confirmation is required')
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const { value: name, errorMessage: nameError } = useField('name');
const { value: username, errorMessage: usernameError } = useField('username');
const { value: email, errorMessage: emailError } = useField('email');
const { value: password, errorMessage: passwordError } = useField('password');
const { value: passwordConfirmation, errorMessage: passwordConfirmationError } = useField('confirmation');

const authStore = useAuth();
const registrationSuccess = ref(false);

const isPasswordVisible = ref(false);
const passwordFieldType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));
const passwordIcon = computed(() => (isPasswordVisible.value ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'));

function togglePasswordVisibility() {
    isPasswordVisible.value = !isPasswordVisible.value;
}

const isPasswordVisible1 = ref(false);
const passwordFieldType1 = computed(() => (isPasswordVisible1.value ? 'text' : 'password'));
const passwordIcon1 = computed(() => (isPasswordVisible1.value ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'));

function togglePasswordVisibility1() {
    isPasswordVisible1.value = !isPasswordVisible1.value;
}

const register = handleSubmit(async (values) => {
    authStore.name = values.name;
    authStore.username = values.username;
    authStore.email = values.email;
    authStore.password = values.password;
    authStore.passwordConfirmation = values.confirmation;

    try {
        const success = await authStore.registerUser();
        if (success) {
            resetForm();
            registrationSuccess.value = true;
        } else {
            alert("Register failed");
        }
    } catch (err) {
        console.error("Register error", err);
    }
});
</script>

<style scoped>
@media (min-width: 768px) {
  .register {
    margin-top: 0%;
    margin-bottom: 0%
  }
}

@media (max-width: 767px) {
  .register {
    margin-top: 34%;
    margin-bottom: 20%;
  }
}
</style>