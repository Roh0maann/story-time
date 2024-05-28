<template>
    <div class="border shadow m-0 p-4 w-100">
        <div class="d-flex justify-content-between align-items-center">
            <h4 class="m-0 p-0">Password</h4>
            <button class="py-1 px-3 btn btn-outline-dark rounded-0 w-25" style="font-size: 16px">
                <i class="fa-regular fa-pen-to-square"></i>
                Change Password
            </button>
        </div>
        <form action="" class="">
            <div class="mt-4">
                <div class="mb-3 position-relative">
                    <label for="exampleInputPassword1" class="form-label">Old Password</label>
                    <input :type="passwordFieldType" class="form-control rounded-0" placeholder="Enter old password">
                    <span @click="togglePasswordVisibility"
                        class="position-absolute top-50 end-0 mt-1 me-2 border-0 bg-white">
                        <i :class="passwordIcon"></i>
                    </span>
                </div>
                <div class="mb-3 position-relative">
                    <label for="exampleInputPassword1" class="form-label">New Password</label>
                    <input :type="passwordFieldType1" class="form-control rounded-0" placeholder="Enter a new password">
                    <span @click="togglePasswordVisibility1"
                        class="position-absolute top-50 end-0 mt-1 me-2 border-0 bg-white">
                        <i :class="passwordIcon1"></i>
                    </span>
                </div>
                <div class="mb-3 position-relative">
                    <label for="exampleInputPassword1" class="form-label">New Password Confirmation</label>
                    <input :type="passwordFieldType2" class="form-control rounded-0"
                        placeholder="Enter new password confirmation">
                    <span @click="togglePasswordVisibility2"
                        class="position-absolute top-50 end-0 mt-1 me-2 border-0 bg-white">
                        <i :class="passwordIcon2"></i>
                    </span>
                </div>
                <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-outline-dark rounded-0 py-1 px-3 fs-6 me-3">Cencel</button>
                    <button type="submit" class="btn btn-dark rounded-0 py-1 px-3 fs-6">Save</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
useHead({
    title: "Story Time"
})

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
</script>