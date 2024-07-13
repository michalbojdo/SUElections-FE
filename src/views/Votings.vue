<script setup lang="ts">
import { getVotings } from "@/services/requests";
import type { Voting } from "@types";
import { computed, onBeforeMount, ref, type Ref } from "vue";

const loading = ref(false);
const votings: Ref<Array<Voting>> = ref([]);

onBeforeMount(async () => {
  votings.value = await getVotings();
  loading.value = false;
});
</script>

<template>
  <h4>Votings View</h4>
  <div class="q-pa-md">
    <div class="row items-start q-gutter-md">
      <q-responsive class="col" v-for="voting in votings">
        <div>
        <h3>
          {{ voting.name }}
        </h3>
        <h4>
          {{ voting.description }}
        </h4>
        <q-knob
          v-model="voting.votesFor"
          :max="voting.votesAgainst + voting.votesFor"
          :thickness="0.22"
          show-value
          size="100px"
          color="teal"
          track-color="red"
          class="q-ma-md"
          readonly
        />
        </div>
      </q-responsive>
    </div>
  </div>
</template>
