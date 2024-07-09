<script setup lang="ts">
import { getVotings } from "@/services/requests";
import type { Voting } from "@types";
import { computed, onBeforeMount, ref, type Ref } from "vue";

const loading = ref(false)
const votings: Ref<Array<Voting>> = ref([])

onBeforeMount(async()=>{
  votings.value = await getVotings()
  loading.value = false
})
</script>

<template>
  <h4>Votings View</h4>
  <div v-for="voting in votings">
    <h3>
      {{ voting.name }}
    </h3>
    <h4>
      {{ voting.description }}
    </h4>
  <q-knob
      :min="0"
      :max="voting.votesAgainst+voting.votesFor+voting.votesLeft"
      v-model="voting.votesFor"
      show-value
      size="50px"
      :thickness="0.22"
      color="teal"
      track-color="grey-3"
      class="q-ma-md"
    />
    </div>
</template>