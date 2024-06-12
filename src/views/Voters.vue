<script setup lang="ts">
import { ref, type Ref, onBeforeMount, watch } from "vue";
import type { Voter } from "@types";
import SUElectionsAPI from "@services/axios";

const loading = ref(false)
const voters: Ref<Array<Voter>> = ref([]);


onBeforeMount(() => {
    loading.value=true
    SUElectionsAPI.get("voters")
      .then((response) => response.data)
      .then((data) => (voters.value = data));
    loading.value = false
});

</script>

<template>
  <h4>Voters View</h4>
  <section class="q-pa-md">
    <h5 v-for="voter in voters">{{ voter.name }} {{ voter.lastName }}</h5>
    <q-inner-loading
      :showing="loading"
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </section>
</template>