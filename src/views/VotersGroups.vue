<script setup lang="ts">
import { getExtendedVotersGroups } from "@/services/requests";
import type { VotersGroup } from "@types";
import { computed, onBeforeMount, ref, type Ref, watch } from "vue";

const loading = ref(false)
const votersGroups: Ref<Array<VotersGroup>> = ref([])

const ticked = ref([])

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

const refresh = async (done) => {
  loading.value = true
  votersGroups.value = await getExtendedVotersGroups()
  loading.value = false
  done()
}

onBeforeMount(async () => {
  votersGroups.value = await getExtendedVotersGroups()
  loading.value = false
})

</script>

<template>
  <h2>Voters groups</h2>
  <q-pull-to-refresh @refresh="refresh" style="min-height: 700px">
    <section class="q-pa-md">
      <q-tree 
        :nodes="votersTree" 
        node-key="label" 
        text-color="grey-4" 
        default-expand-all
      />
      <q-inner-loading 
        :showing="loading" 
        label-class="text-teal" 
        label-style="font-size: 1.1em" 
      />
    </section>
  </q-pull-to-refresh>
</template>