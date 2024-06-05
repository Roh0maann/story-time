<template>
    <div class="border shadow m-0 p-4 w-100 mb-4">
        <div class="d-flex justify-content-between align-items-center align-content-center">
            <h4 class="m-0 p-0">Story List</h4>
            <NuxtLink to="/user/story/create" class="py-1 px-1 btn btn-dark rounded-0 fw-semibold "
                style="font-size: 14px; width: 18%;">
                +
                Create Story
            </NuxtLink>
        </div>
        <div class="mt-5 mb-3">
            <div class="text-center">
                <img class="me-4" style="width: 20%;" src="~/assets/images/empty-data.svg" alt="">
                <p class="p-0 mt-3 fw-semibold " style="font-size: 24px;">No data found</p>
            </div>
        </div>
        <!-- <div class="mt-4 mb-3">
            <table class="table">
                <thead>
                    <tr class="table-group-divider">
                        <th scope="col">#</th>
                        <th scope="col" style="width: 50%;">Title</th>
                        <th scope="col">Last Update</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider align-content-center align-items-center">
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>00:42, 01 jun 2024</td>
                        <td>
                            <UiBase-Button class="btn btn-outline-dark rounded-0 py-1 px-3 fs-6 me-3" ><i class="fa-solid fa-pen"></i> Edit</UiBase-Button>
                            <UiBase-Button class="btn btn-outline-danger rounded-0 py-1 px-3 fs-6" ><i class="fa-solid fa-trash-can"></i> Delete</UiBase-Button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>00:42, 01 jun 2024</td>
                        <td>
                            <UiBase-Button class="btn btn-outline-dark rounded-0 py-1 px-3 fs-6 me-3" ><i class="fa-solid fa-pen"></i> Edit</UiBase-Button>
                            <UiBase-Button class="btn btn-outline-danger rounded-0 py-1 px-3 fs-6" ><i class="fa-solid fa-trash-can"></i> Delete</UiBase-Button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry the Bird</td>
                        <td>00:42, 01 jun 2024</td>
                        <td>
                            <UiBase-Button class="btn btn-outline-dark rounded-0 py-1 px-3 fs-6 me-3" ><i class="fa-solid fa-pen"></i> Edit</UiBase-Button>
                            <UiBase-Button class="btn btn-outline-danger rounded-0 py-1 px-3 fs-6" ><i class="fa-solid fa-trash-can"></i> Delete</UiBase-Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> -->
    </div>
</template>