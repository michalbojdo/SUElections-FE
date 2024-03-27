<script setup lang="ts">
import { ref, computed } from "vue"
import { useDark, useTitle } from '@vueuse/core' 
import { useRoute } from "vue-router";

const currentRoute = computed(()=>'SUElections - '+ route.name?.toString())

const route = useRoute()
const title = useTitle(currentRoute)
const isDark = useDark()

const drawer = ref(false)

const menuList = [
  {
    icon: "home",
    label: "Home",
    to: "/",
  },
  {
    icon: "poll",
    label: "Current polls",
    to: "/polls",
  },
]
</script>

<template>
  <q-layout>
    <q-header class="q-pa-lg">
      <q-toolbar>
        <q-toolbar-title> SUElections </q-toolbar-title>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu"></q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawer"
      :width="200"
      :breakpoint="500"
      side="right"
      overlay
      bordered
      :class="isDark ? 'bg-teal-1' : 'bg-teal-3'"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="menuItem in menuList">
            <q-item clickable :to="menuItem.to">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <q-page padding>
        <slot />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
