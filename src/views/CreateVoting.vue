<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useDark } from "@vueuse/core";
import { createVoting as createVotingRequest } from "@services/requests";
import type { VotersGroup, Voting } from "@types";
import AddGroups from "@components/CreateVoting/AddGroups.vue";
import NameDescription from "@/components/CreateVoting/GeneralInfo.vue";
import { date } from "quasar";
import router from "@/router";

const isDark = useDark();

const loading = ref(false);
const votersGroups: Ref<Array<VotersGroup>> = ref([]);

const selectedVotersGroups: Ref<Array<VotersGroup>> = ref([]);
const name = ref("");
const description = ref("");

const startDate = ref("");
const endDate = ref("");

const step = ref(1);
const nextStep = () => {if(step.value<3) step.value++;}
const previousStep = () =>{ if(step.value>1) step.value--;}

const createVoting = async () => {
  const voting: Voting = {
    name: name.value,
    description: description.value,
    votersGroups: [...selectedVotersGroups.value],
    startDate: new Date(date.extractDate(startDate.value, "DD.MM.YYYY, HH:mm")),
    endDate: new Date(date.extractDate(endDate.value, "DD.MM.YYYY, HH:mm")),
  };

  await createVotingRequest(voting)
  
  router.push("/votings")
  console.info(voting);
};

</script>

<template>
  <h4>Create voting</h4>
  <q-stepper
    v-model="step"
    ref="stepper"
    color="primary"
    animated
    :dark="isDark"
  >
    <q-step
      :name="1"
      title="Name and description"
      icon="settings"
      :done="step > 1"
    >
      <name-description 
        v-model:name="name"
        v-model:description="description"
        v-model:startDate="startDate"
        v-model:endDate="endDate"
      />
    </q-step>

    <q-step :name="2" title="Voters groups" icon="group" :done="step > 2">
      <add-groups v-model:votersGroups="selectedVotersGroups" />
    </q-step>
    <q-step :name="3" title="Summary" icon="list" :done="step > 3">
      {{ selectedVotersGroups }}
    </q-step>
    <template v-slot:navigation>
      <q-stepper-navigation>
        <q-btn @click="step === 3 ? createVoting() : nextStep()" color="primary" :label="step === 3 ? 'Create' : 'Continue'" />
        <q-btn v-if="step > 1" flat color="primary" @click="previousStep" label="Back" class="q-ml-sm" />
      </q-stepper-navigation>
    </template>
  </q-stepper>
</template>
