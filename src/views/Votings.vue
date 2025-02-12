<script setup lang="ts">
import { getVotings } from "@/services/requests";
import type { Voting } from "@types";
import { computed, onBeforeMount, ref, type Ref } from "vue";
import router from "@/router";

import crud from "@components/CRUD.vue";

const loading = ref(false);
const votings: Ref<Array<Voting>> = ref([]);

const refresh = async (done = () => {}) => {
  loading.value = true;
  votings.value = await getVotings();
  loading.value = false;
  done();
};

onBeforeMount(async () => {
  votings.value = await getVotings();
  loading.value = false;
});

const isEnvDev = import.meta.env.DEV

</script>

<template>
  <h4>
    Votings View
    <q-chip
      v-if="isEnvDev"
      size="md"
      icon="add"
      color="green-5"
      text-color="white"
      label="Create voting"
      clickable
      @click="router.push('votings/create')"
    />
  </h4>
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
            <q-chip
              v-if="new Date(voting.endDate) > new Date()"
              size="md"
              icon="hourglass_empty"
              label="Active"
            />
            <q-chip
              v-else-if="(voting.votesFor ?? 0) > (voting.votesAgainst ?? 0)"
              size="md"
              icon="check_circle"
              color="green-5"
              text-color="white"
              label="Passed"
            />
            <q-chip
              v-else
              size="md"
              icon="cancel"
              color="red-5"
              text-color="white"
              label="Not passed"
            />
          </q-item-section>
          <q-item-section v-if="isEnvDev" class="col-2">
            <crud
              :id="voting.id"
              @action="refresh"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-pull-to-refresh>
  </div>
</template>
