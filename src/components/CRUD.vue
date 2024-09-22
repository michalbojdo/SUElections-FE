<script setup lang="ts">

</script>

<template>
    <div class="q-pa-md">
        <q-btn icon="more_vert" flat>
        <q-menu>
            <q-list>
              <q-item clickable v-close-popup class="bg-dark text-white">
                <q-item-section avatar>
                    <q-icon name="edit"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Edit</q-item-label>
                </q-item-section>
              </q-item>
      
              <q-item clickable v-close-popup class="bg-red-5 text-white">
                <q-item-section avatar>
                    <q-icon name="warning"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Delete</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
          </q-btn>
    </div>
</template>