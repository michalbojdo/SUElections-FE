<script setup lang="ts">
import SUElectionsAPI from "@services/axios"
import type { Voter } from "@types"
import { onBeforeMount, ref, type Ref, computed, watch } from "vue"

const loading = ref(true)
const voters: Ref<Array<Voter>> = ref([])
const columns = ref([
  {
    name: 'name',
    label: 'Name',
    field: (row: Voter) => row.name,
    required: true,
    sortable: true,
    align: 'left',
  },
  {
    name: 'lastName',
    label: 'Last name',
    field: (row: Voter) => row.lastName,
    required: true,
    sortable: true,
    align: 'left',
  },
  {
    name: 'email',
    label: 'Email',
    field: (row: Voter) => row.email,
    required: true,
    align: 'left',
  },
])

const getVoters = () => {
  loading.value = true;
  SUElectionsAPI.get("voters")
    .then((response) => response.data)
    .then((data) => (voters.value = data))
    .then(() => (loading.value = false));
}

onBeforeMount(getVoters);

</script>

<template>
  <section class="q-pa-md">
    <div class="q-pa-md q-gutter-md">
      <div class="row justify-between">
        <q-parallax
          src="https://retool.com/blog/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fbclf52sw%2Fproduction%2F41c6c8b65b0741d0c2572418b0e3f4951da91cd4-4267x1667.png&w=3840&q=75"
          :height="200"
        >
          <h1 class="text-dark">Voters</h1>
        </q-parallax>
      </div>
    </div>

    <q-table
      :loading="loading"
      :rows="voters"
      :columns="columns"
      :max="10"
      no-data-label=""
      no-results-label="No results"
      color="primary"
      dark
      flat
      bordered
    />
  </section>
</template>
