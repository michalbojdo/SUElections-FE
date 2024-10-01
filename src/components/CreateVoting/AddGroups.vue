<script setup lang="ts">
import { getExtendedVotersGroups } from "@/services/requests"
import type { VotersGroup } from "@types"
import { computed, onBeforeMount, ref, type Ref, defineModel } from "vue"

const loading = ref(false)
const votersGroups: Ref<Array<VotersGroup>> = ref([])

const ticked = defineModel<Array<VotersGroup>>("votersGroups", {
  default: [],
});

const votersTree = computed(() =>
  votersGroups.value.map((x) => ({
    id:x.id,
    label: x.name,
    children: x.voters.map((v) => ({
      label: `${v.name} ${v.lastName}`,
      tickable:false
    })),
  }))
)

onBeforeMount(async () => {
  votersGroups.value = await getExtendedVotersGroups()
  loading.value = false

})
</script>
<template>
  <q-tree
    v-model:ticked="ticked"
    :nodes="votersTree"
    node-key="id"
    text-color="grey-7"
    tick-strategy="strict"
  />
  <q-inner-loading
    :showing="loading"
    label-class="text-teal"
    label-style="font-size: 1.1em"
  />
</template>
