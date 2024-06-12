<script setup lang="ts">
import { ref, type Ref,  onBeforeMount, watch } from "vue";
import type { VotersGroup } from "@types";
import SUElectionsAPI from "@services/axios";

const loading = ref(false)
const votersGroups : Ref<Array<VotersGroup>> = ref([])

onBeforeMount(() => {
    loading.value=true
    SUElectionsAPI.get("voters-groups")
      .then((response) => response.data)
      .then((data) => (votersGroups.value = data));
    loading.value = false
    console.log(votersGroups.value)
});



</script>

<template>
  <h4>Voters groups View</h4>
  <section class="q-pa-md">
    <h5 v-for="votersGroup in votersGroups">{{ votersGroup.name }}
      <h6 v-for="n in votersGroup.voters">
          {{ n }}
      </h6>    
    </h5>
    <q-inner-loading
      :showing="loading"
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </section>
</template>