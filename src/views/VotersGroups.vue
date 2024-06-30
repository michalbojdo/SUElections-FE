<script setup lang="ts">
import { ref, type Ref, onBeforeMount, watch, computed } from "vue";
import type { VotersGroup } from "@types";
import SUElectionsAPI from "@services/axios";

const loading = ref(false)
const votersGroups: Ref<Array<VotersGroup>> = ref([])

const getVotersGroups = () => {
  loading.value = true
  SUElectionsAPI.get("voters-groups/extended")
    .then((response) => response.data)
    .then((data) => (votersGroups.value = data)).then(() =>
      loading.value = false)
}

const votersTree = computed(() =>
  votersGroups.value.map(x => ({ label: `${x.name}`, children: x.voters.map(e => ({ label: `${e.name} ${e.lastName}` })) }))
)

onBeforeMount(getVotersGroups);

</script>

<template>
  <h2>Voters groups</h2>
  <section class="q-pa-md">
    <q-tree :nodes="votersTree" node-key="label" text-color="grey-1" default-expand-all />
    <q-inner-loading :showing="loading" label-class="text-teal" label-style="font-size: 1.1em" />
  </section>
</template>