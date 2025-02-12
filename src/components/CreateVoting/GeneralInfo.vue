<script setup>
import { ref, watch, defineModel, computed } from "vue";
import { useDark } from "@vueuse/core";
import { date } from "quasar";
import { CreateVoting } from "@/services/validators";

const isDark = useDark();

const name = defineModel("name", { type: String, required: true, default: "" });
const description = defineModel("description", {
  type: String,
  required: true,
  default: "",
});
const startDate = defineModel("startDate", {
  type: String,
  required: true, 
});
const endDate = defineModel("endDate", {
  type:String,
  required: true, 
});


// const startDateOptions = computed(()=>(availableDate) =>
//   availableDate >= date.formatDate(now, "YYYY.MM.DD, HH:mm")
// )

// const endDateOptions = computed(()=>(availableDate) =>
//   availableDate >= date.formatDate(startDate.value, "YYYY.MM.DD, HH:mm")
// );

// watch(endDateOptions.value, console.log)
</script>

<template>
  <q-card class="q-pa-md row" :dark="isDark">
    <!-- <q-card-title class="col-md-12" :dark="isDark"> Add voting </q-card-title> -->
    <q-input
      v-model="name"
      label="Name"
      class="col-12 col-md-3 q-pa-md"
      outlined
      :dark="isDark"
      lazy-rules
      :rules="[val => CreateVoting.validateName(val) || 'At least three characters']"
    />
    <q-input
      v-model="description"
      label="Description"
      class="col-12 col-md-9 q-pa-md"
      autogrow
      outlined
      :dark="isDark"
      lazy-rules
      :rules="[val => CreateVoting.validateDescription(val) || 'At least three characters']"
    />
    <div class="col-12 col-md-6 q-pa-md">
      <q-input
        v-model="startDate"
        :dark="isDark"
        label="Start date"
        outlined  
        :rules="[val => CreateVoting.validateIsFutureDate(startDate) || 'Must be future date']"
      >
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy years-in-month-view>
              <q-date
                v-model="startDate"
                mask="DD.MM.YYYY, HH:mm" 
                minimal
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time v-model="startDate" mask="DD.MM.YYYY, HH:mm" format24h minimal>
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="col-12 col-md-6 q-pa-md">
      <q-input
        v-model="endDate"
        :dark="isDark"
        label="End date"
        outlined  
        :rules="[
          val => CreateVoting.validateEndDateAfterStartDate(startDate, val) || 'End date must be after start date',
          val => CreateVoting.validateIsFutureDate(val) || 'Must be future date'
          ]"
      >
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy>
              <q-date
                v-model="endDate"
                mask="DD.MM.YYYY, HH:mm" 
                minimal
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy>
              <q-time v-model="endDate" mask="DD.MM.YYYY, HH:mm" format24h minimal>
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
  </q-card>
</template>
