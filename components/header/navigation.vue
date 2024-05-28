<template>
    <nav class="navbar bg-white navbar-expand-lg fixed-top shadow-sm">
            <div class="container">
                <NuxtLink to="/" class="navbar-brand"><img src="~/assets/images/logo.svg" alt="" /></NuxtLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end p-0 m-0" id="navbarSupportedContent">
                    <div class="gap-3 d-flex">
                        <NuxtLink to="/register" class="btn btn-outline-dark fs-5 rounded-0 px-4" type="submit">
                            Register
                        </NuxtLink>
                        <NuxtLink to="/login" class="btn btn-dark text-white fs-5 rounded-0 px-4" type="submit">
                            Login
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </nav>
</template>
