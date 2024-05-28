<template>
    <div class="border shadow m-0 p-4 w-100 mb-4">
        <div class="d-flex justify-content-between align-items-center align-content-center">
            <h4 class="m-0 p-0">My Profile</h4>
            <button class="py-1 px-3 btn btn-outline-dark rounded-0" style="font-size: 16px; width: 17%;">
                <i class="fa-regular fa-pen-to-square"></i>
                Edit Profile
            </button>
        </div>
        <div class="mt-5 mb-4 d-flex row">
            <div class="col-4">
                <div class="" style="width: 200px;">
                    <div class="mb-4">
                        <img class="w-100 h-100 object-fit-cover rounded-circle" src="https://via.placeholder.com/150"
                            alt="">
                    </div>
                    <button class="py-1 px-3 btn btn-outline-dark rounded-0 w-100 " style="font-size: 16px;">
                        Change Avatar
                    </button>
                </div>
            </div>
            <div class="col-8">
                <div class="d-flex">
                    <div class="text-black fw-semibold me-5">
                        <p>Name</p>
                        <p>Email</p>
                        <p>Biodata</p>
                    </div>

                    <div class=" text-secondary fw-normal w-100 ">
                        <p>Ezy</p>
                        <p>Ezy@gmail.com</p>
                        <p>Hi</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>