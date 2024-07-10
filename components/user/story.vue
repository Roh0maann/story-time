<template>
  <div class="border shadow m-0 p-4 w-100 mb-4">
    <div class="d-flex justify-content-between align-items-center align-content-center">
      <h4 class="m-0 p-0">Story List</h4>
      <NuxtLink to="/user/story/create" class="py-1 px-2 btn btn-dark rounded-0 fw-semibold btn-create-story w-auto" style="font-size: 14px;">
        + Create Story
      </NuxtLink>
    </div>

    <div class="mt-5 mb-3" v-if="storyStore.storyList.length === 0">
      <div class="text-center">
        <img class="me-4 empty-data-image" style="width: 20%;" src="~/assets/images/empty-data.svg" alt="No data found" />
        <p class="p-0 mt-3 fw-semibold empty-data-text" style="font-size: 24px;">No data found</p>
      </div>
    </div>

    <div class="mt-4 mb-3" v-else>
      <table class="table table-responsive table-hover table-striped">
        <thead>
          <tr class="table-group-divider fs-6">
            <th scope="col" class="col-2">Title</th>
            <th scope="col" class="col-1">Last Update</th>
            <th scope="col" class="col-1">Action</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(story, index) in storyStore.storyList" :key="story.id" style="font-size: 14px;">
            <td>
              <NuxtLink :to="'/story/' + story.id" class="text-decoration-none text-black">{{ story.title }}</NuxtLink>
            </td>
            <td>{{ formatDateStory(story.updatedAt) }}</td>
            <td class="d-flex h-100">
              <NuxtLink :to="'/user/story/' + story.id + '/edit'" class="btn btn-outline-dark rounded-0 py-1 px-3 me-3 btn-edit w-auto">
                <i class="fa-solid fa-pen"></i> <span class="d-sm-inline">Edit</span>
              </NuxtLink>
              <UiBase-Button class="btn btn-outline-danger rounded-0 py-1 px-3 btn-delete w-auto" data-bs-toggle="modal" data-bs-target="#deleteModal" @click="deletId(story.id)">
                <i class="fa-solid fa-trash-can"></i> <span class="d-sm-inline">Delete</span>
              </UiBase-Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="pagination">
      <ul class="pagination justify-content-end">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" aria-label="Previous" @click.prevent="changePage(currentPage - 1)">
            <i class="fa-solid fa-chevron-left" style="font-size: 12px;"></i>
          </a>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
          <a class="page-link" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" aria-label="Next" @click.prevent="changePage(currentPage + 1)">
            <i class="fa-solid fa-chevron-right" style="font-size: 12px;"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>

  <div class="modal fade" id="deleteModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete Story</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Are you sure want to delete this story?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-dark rounded-0" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-dark rounded-0" data-bs-dismiss="modal" @click="deleteStory()">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/stores/auth';
import { useStory } from '~/stores/store';
import { onMounted, ref, computed } from 'vue';
import { formatDateStory } from '~/helpers/dateFormat';

const authStore = useAuth();
const storyStore = useStory();


const storyIdDelete = ref('');
const currentPage = ref(1);
const totalPages = computed(() => storyStore.pageCount);

const pagination = computed(() => {
  return totalPages.value > 1;
});

onMounted(async () => {
  try {
    await fetchStories(currentPage.value);
  } catch (error) {
    console.error(error);
  }
});

const fetchStories = async (page) => {
  try {
    await storyStore.getUserStory(page);
  } catch (error) {
    console.error(error);
  }
};

const deletId = (storyId) => {
  storyIdDelete.value = storyId;
};

const changePage = async (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
    await fetchStories(page);
  }
};

const deleteStory = async () => {
  if (storyIdDelete.value) {
    try {
      await storyStore.deleteStory(storyIdDelete.value);
      storyIdDelete.value = null;

      
      if (storyStore.storyList.length === 0 && currentPage.value > 1) {
        await changePage(currentPage.value - 1);
      } else {
        await fetchStories(currentPage.value);
      }
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style scoped>
@media (max-width: 576px) {
  .btn-edit span,
  .btn-delete span {
    display: none;
  }
}

.pagination .page-link {
  border: 1px solid #a4a4a4;
  color: #343a40;
}
.pagination .page-link:hover {
  background-color: #343a40;
  color: #fff;
}
.pagination .page-item.active .page-link {
  background-color: #343a40;
  border-color: #343a40;
  color: #fff;
}
</style>
