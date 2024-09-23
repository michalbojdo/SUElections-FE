<script setup lang="ts">
import { getVotings } from "@/services/requests";
import type { Voting } from "@types";
import { computed, onBeforeMount, ref, type Ref } from "vue";

import crud from "@components/CRUD.vue";

const loading = ref(false);
const votings: Ref<Array<Voting>> = ref([]);

const refresh = async (done=()=>{}) => {
  loading.value = true
  votings.value = await getVotings()
  loading.value = false
  done()
}

onBeforeMount(async () => {
  votings.value = await getVotings();
  loading.value = false;
});
</script>

<template>
  <h4>Votings View</h4>
  <div class="q-pa-md">
    <q-pull-to-refresh @refresh="refresh">
    <q-list bordered>
      <q-item class="col" v-for="voting in votings">
        <q-item-section class="col text-h5">
          {{ voting.name }}
        </q-item-section>
        <q-item-section>
          {{ voting.description }}
        </q-item-section>
        <q-item-section avatar class="col">
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
          <crud :id="voting.id" @deleted="refresh"/>
        </q-item-section>
      </q-item>
    </q-list>
    </q-pull-to-refresh>
  </div>
</template>
