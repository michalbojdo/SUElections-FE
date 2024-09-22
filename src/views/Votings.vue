<script setup lang="ts">
import { getVotings } from "@/services/requests";
import type { Voting } from "@types";
import { computed, onBeforeMount, ref, type Ref } from "vue";

import crud from "@components/CRUD.vue";

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
    <q-list bordered>
      <q-item class="col-5" v-for="voting in votings">
        <q-item-section class="col-2 text-h5">
          {{ voting.name }}
        </q-item-section>
        <q-item-section>
          {{ voting.description }}
        </q-item-section>
        <q-item-section avatar class="col-2">
          <component v-if="new Date(voting.endingDate) > new Date()">
            <q-chip size="md" icon="hourglass_empty"> Active </q-chip>
          </component>
          <component v-else-if="voting.votesFor > voting.votesAgainst">
            <q-chip size="md" icon="check_circle" color="green-5" text-color="white"> Passed </q-chip>
          </component>
          <component v-else>
            <q-chip size="md" icon="cancel" color="red-5" text-color="white"> Not passed </q-chip>
          </component>
        </q-item-section>
        <q-item-section class="col-1">
          <crud />
        </q-item-section>
      </q-item>
    </q-list>
    <!-- <div class="row items-start q-gutter-3">
       
        <div class="col-3" v-for="voting in votings">
        <h4>
          {{ voting.name }}
        </h4>
        <h5>
          {{ voting.description }}
        </h5>
        <q-circular-progress
          :value="voting.votesFor"
          :max="voting.votesAgainst + voting.votesFor"
          :thickness="0.22"
          show-value
          size="100px"
          color="teal"
          track-color="red"
          class="q-ma-md"
          reverse
          readonly
        />
        </div> 
    </div> -->
  </div>
</template>
