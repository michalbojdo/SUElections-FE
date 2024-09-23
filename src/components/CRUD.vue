<script setup lang="ts">
import { defineProps } from "vue";
import { deleteVoting } from "@/services/requests";

const props = defineProps({
  id: Number,
  path: String,
});

const emit = defineEmits(['deleted'])

const _delete = async (id) =>{
  await deleteVoting(id).then(()=>
    emit('deleted')
  )
}

</script>

<template>
  <div class="q-pa-md">
    <q-chip
      icon="info"
      size="sm"
      label="Info"
      color="blue-9"
      text-color="white"
    />
    <q-chip
      icon="edit"
      size="sm"
      label="Edit"
      color="orange-7"
      text-color="white"
    />
    <q-chip
      icon="delete"
      size="sm"
      label="Delete"
      color="red-5"
      text-color="white"
      clickable
      @click="_delete(props.id)"
    />
  </div>
</template>
