<script setup lang="ts">
import { getExtendedVotersGroups } from "@/services/requests";
import type { VotersGroup } from "@types";
import { computed, onBeforeMount, ref, type Ref } from "vue";

const loading = ref(false)
const votersGroups: Ref<Array<VotersGroup>> = ref([])

const votersTree = computed(() =>
  votersGroups.value.map(x => (
    { 
      label: x.name, 
      children: x.voters.map(v => (
        { 
          label: `${v.name} ${v.lastName}` 
        }
      )) 
    }
  ))
)

onBeforeMount(async()=>{
  votersGroups.value = await getExtendedVotersGroups()
  loading.value = false
})

</script>

<template>
  <h2>Voters groups</h2>
  <section class="q-pa-md">
    <q-tree :nodes="votersTree" node-key="label" text-color="grey-1" default-expand-all />
    <q-inner-loading :showing="loading" label-class="text-teal" label-style="font-size: 1.1em" />
  </section>
</template>