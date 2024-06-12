<script setup lang="ts">
import { ref, computed, watch, onBeforeMount } from "vue"
import { useDark, useTitle } from '@vueuse/core' 
import { useRoute } from "vue-router"; 

const currentRoute = computed(()=>'SUElections - '+ route.name?.toString())

const route = useRoute()
const title = useTitle(currentRoute)
const isDark = useDark()

const textPrimary = ref()
const textSecondary = ref()
const bgPrimary = ref()
const bgSecondary = ref()

const drawer = ref(false)

const setColorPalette = () =>{
  [textPrimary.value, textSecondary.value, bgPrimary.value, bgSecondary.value] =
  isDark.value ? 
  ['text-grey-1','text-grey-5','bg-dark','bg-grey-10'] :
  ['text-grey-1','text-grey-9','bg-primary','bg-grey-2']
}

onBeforeMount(setColorPalette)
watch(isDark, setColorPalette)

const menuList = [
  {
    icon: "home",
    label: "Home",
    to: "/",
  },
  {
    icon: "poll",
    label: "Votings",
    to: "/votings",
  },
  {
    icon: "how_to_vote",
    label: "Voters registry",
    to: "/voters"
  },
  {
    icon: "group",
    label: "Voters groups",
    to: "/voters-groups"
  }
]
</script>

<template>
  <q-layout>
    <q-header :class="bgPrimary">
      <q-toolbar>
        <q-toolbar-title class="text-grey-1 q-pa-lg"> SUElections </q-toolbar-title>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" :class="textPrimary"></q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawer"
      :width="200"
      :breakpoint="500"
      :class="bgPrimary+' '+textSecondary"
      side="right"
      overlay
      bordered
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="menuItem in menuList">
            <q-item clickable :to="menuItem.to" :active-class="textPrimary">
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
      <q-page padding :class="bgSecondary+' '+textSecondary">
        <slot />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
