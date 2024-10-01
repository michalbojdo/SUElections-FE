<script setup lang="ts">
import { getExtendedVotersGroups } from "@/services/requests";
import type { VotersGroup } from "@types";
import { useDark } from "@vueuse/core";
import { computed, onBeforeMount, ref, type Ref, watch } from "vue";

const isDark = useDark()

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

const ticked = ref([])

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
  <h4>Voters groups</h4>
  <q-pull-to-refresh @refresh="refresh" style="min-height: 700px">
    <section class="q-pa-md">
      <q-tree 
        :nodes="votersTree" 
        node-key="label" 
        default-expand-all
        :dark="isDark"
      />
      <q-inner-loading 
        :showing="loading" 
        label-style="font-size: 1.1em" 
      />
    </section>
  </q-pull-to-refresh>
</template>