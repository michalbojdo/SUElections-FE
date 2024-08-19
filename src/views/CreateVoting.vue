<script setup lang="ts">
import { computed, onBeforeMount, ref, type Ref, watch } from "vue";
import { getExtendedVotersGroups } from "@services/requests";
import type { VotersGroup } from "@types";
import AddGroups from "@components/CreateVoting/AddGroups.vue";


const loading = ref(false)
const votersGroups: Ref<Array<VotersGroup>> = ref([])

const notSelected: Ref<Array<VotersGroup>> = ref([])
const selected: Ref<Array<VotersGroup>> = ref([])

const splitterModel = ref(25)

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
const group = ref(['op1'])

const options = [
  {
    label: 'Option 1',
    value: 'op1'
  },
  {
    label: 'Option 2',
    value: 'op2'
  },
  {
    label: 'Option 3',
    value: 'op3'
  }
]

onBeforeMount(async () => {
  votersGroups.value = await getExtendedVotersGroups()
  notSelected.value = await getExtendedVotersGroups()
  loading.value = false
})

const selectVotersGroup = (votersGroup) => {
  selected.value.push(votersGroup)
  notSelected.value.splice(notSelected.value.indexOf(votersGroup), 1)
}

console.log(import.meta.env)

</script>

<template>
  <h2>Create voting</h2> 
 <add-groups/>
</template>