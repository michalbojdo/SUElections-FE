<script setup lang="ts">
import { getVoters } from "@services/requests";
import type { Voter } from "@types";
import { useDark } from "@vueuse/core";
import type { QTableColumn } from "quasar";
import { onBeforeMount, ref, type Ref } from "vue";

const isDark = useDark()

const loading = ref(true)
const voters: Ref<Array<Voter>> = ref([])

const pagination = {
  rowsPerPage: 15
}

const columns: Array<QTableColumn<Voter>> = [
  {
    name: "name",
    label: "Name",
    field: (row: Voter) => row.name,
    required: true,
    sortable: true,
    align: "left",
  },
  {
    name: "lastName",
    label: "Last name",
    field: (row: Voter) => row.lastName,
    required: true,
    sortable: true,
    align: "left",
  },
  {
    name: "email",
    label: "Email",
    field: (row: Voter) => row.email,
    required: true,
    align: "left",
  },
]

const refresh = async (done) => {
  loading.value = true
  voters.value = await getVoters()
  loading.value = false
  done()
}

onBeforeMount(async () => {
  voters.value = await getVoters()
  loading.value = false
})

</script>

<template>
  <section class="q-pa-md"> 
    <q-pull-to-refresh @refresh="refresh">
      <q-table 
        :loading="loading"
        :rows="voters"
        :columns="columns"
        :dark="isDark"
        :pagination="pagination"
        title="Voters"
        no-data-label=""
        no-results-label="No results"
        flat
      >
      </q-table>
    </q-pull-to-refresh>
  </section>
</template>
