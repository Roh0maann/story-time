<template>
    <div class="border shadow m-0 p-4 w-100">
        <div class="d-flex justify-content-between align-items-center">
            <h4 class="m-0 p-0">Password</h4>
            <UiBase-Button v-show="!isEditing" class="py-1 px-3 btn btn-outline-dark rounded-0 w-auto" style="font-size: 16px" @click="startEditing">
                <i class="fa-regular fa-pen-to-square"></i>
                Change Password
            </UiBase-Button>
        </div>
        <form v-show="isEditing" @submit.prevent="changePassword" action="" class="">
            <div class="mt-4">
                <div class="mb-3 position-relative">
                    <UiBase-Input v-model="password" name="oldPassword" :type="passwordFieldType" label="Old Password" placeholder="Enter old password" identity="oldPassword"/>
                    <span @click="togglePasswordVisibility"
                        class="position-absolute top-50 end-0 mt-1 me-2 border-0 bg-white">
                        <i :class="passwordIcon"></i>
                    </span>
                </div>
                <p class="text-danger">{{ passwordError }}</p>
                <div class="mb-3 position-relative">
                    <UiBase-Input v-model="newPassword" name="newPassword" :type="passwordFieldType1" label="New Password" placeholder="Enter a new password" identity="newPassword"/>
                    <span @click="togglePasswordVisibility1"
                        class="position-absolute top-50 end-0 mt-1 me-2 border-0 bg-white">
                        <i :class="passwordIcon1"></i>
                    </span>
                </div>
                <p class="text-danger">{{ newPasswordError }}</p>
                <div class="mb-3 position-relative">
                    <UiBase-Input v-model="newPasswordConfirmation" name="newPasswordConfirmation" :type="passwordFieldType2" label="New Password Confirmation" placeholder="Enter new password confirmation" identity="newPasswordConfirmation"/>
                    <span @click="togglePasswordVisibility2"
                        class="position-absolute top-50 end-0 mt-1 me-2 border-0 bg-white">
                        <i :class="passwordIcon2"></i>
                    </span>
                </div>
                <p class="text-danger">{{ newPasswordConfirmationError }}</p>
                <div class="d-flex justify-content-end">
                    <UiBase-Button type="button" class="btn btn-outline-dark rounded-0 py-1 px-3 fs-6 me-3" @click="cancelEditing">Cencel</UiBase-Button>
                    <UiBase-Button type="submit" class="btn btn-dark rounded-0 py-1 px-3 fs-6">Save</UiBase-Button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePassword } from '~/stores/password';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

useHead({
    title: "Story Time"
})

const schema = yup.object({
    oldPassword: yup.string().required("Password is required").min(8, 'Password must be at least 8 characters'),
    newPassword: yup.string().required("Password is required").min(8, 'Password must be at least 8 characters'),
    newPasswordConfirmation: yup.string().oneOf([yup.ref('newPassword')], 'Passwords must match').required('Password confirmation is required')
})

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const { value: password, errorMessage: passwordError } = useField('oldPassword');
const { value: newPassword, errorMessage: newPasswordError } = useField('newPassword');
const { value: newPasswordConfirmation, errorMessage: newPasswordConfirmationError } = useField('newPasswordConfirmation');

const isEditing = ref(false);

function startEditing() {
    isEditing.value = true;
}

function cancelEditing() {
    isEditing.value = false;
}

const router = useRouter();
const passwordStore = usePassword();

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


const isPasswordVisible2 = ref(false);
const passwordFieldType2 = computed(() => (isPasswordVisible2.value ? 'text' : 'password'));
const passwordIcon2 = computed(() => (isPasswordVisible2.value ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'));

function togglePasswordVisibility2() {
    isPasswordVisible2.value = !isPasswordVisible2.value;
}

async function changePassword() {
    try {
        const formPassword = {
            data : {
                currentPassword: password.value,
                newPassword: newPassword.value,
            }
        };

        await passwordStore.resetPassword(formPassword);
        isEditing.value = false;
    } catch (err) {
        console.log(err);
    }
};
</script>