<script setup lang="ts">
import SUElectionsAPI from "@services/axios";
import type { Voter } from "@types";
import { onBeforeMount, ref, type Ref, computed, watch } from "vue";

const loading = ref(true)
const voters: Ref<Array<Voter>> = ref([]);


const getVoters = () => {
  loading.value = true
  SUElectionsAPI.get("voters")
    .then((response) => response.data)
    .then((data) => (voters.value = data)).then(() =>
      loading.value = false)
}

const votersTree = computed(() => 
  voters.value.map(x => ({label:`${x.name} ${x.lastName}`}) )
)

onBeforeMount(() => {
  getVoters()
});

watch(votersTree, (x)=>console.log(votersTree.value))

</script>

<template>

  <section class="q-pa-md">
    <div class="q-pa-md q-gutter-md">
      <div class="row justify-between">
        <q-parallax src="https://cdn.quasar.dev/img/parallax1.jpg" :height="200">
          <h1 class="text-dark">Voters</h1>
        </q-parallax>
      </div>
    </div>

    <h5 v-for="voter in voters"> {{ voter.id }}. {{ voter.name }} {{ voter.lastName }}</h5>
    <q-inner-loading :showing="loading" />
  </section>

</template>