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
        <!-- <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </table> -->
    </div>
</template>