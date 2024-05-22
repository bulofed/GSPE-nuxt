<template>
  <div class="flex flex-col items-center justify-center">
    <DialogTitle
      as="h2"
      class="text-2xl font-bold text-black"
    >
      Ajouter une ressource
    </DialogTitle>
    <div class="mt-5 w-full">
      <Combobox v-model="selectedResource">
        <ResourceSearchInput />
        <ResourceOptions :teacherId="props.teacherId"/>
      </Combobox>
    </div>

    <div class="mt-5 w-full">
      <button
        type="button"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 w-full rounded"
        @click="confirm"
      >
        Confirmer
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Combobox,
  DialogTitle
} from '@headlessui/vue'

import ResourceSearchInput from './ResourceSearchInput.vue'
import ResourceOptions from './ResourceOptions.vue'

let modalStore = useModalStore()
let teacherStore = useTeacherStore()

const props = defineProps({
  modalName: String,
  teacherId: String
})

if (!props.teacherId) {
  throw new Error('Teacher ID is required')
}

let missingResources = await teacherStore.fetchMissingResourcesForTeacher(props.teacherId)
let selectedResource = ref(missingResources.length > 0 ? missingResources[0] : '')

const query = ref('')
provide('query', query)

const confirm = async () => {
  if (!selectedResource.value || !props.teacherId) {
    return
  }
  await teacherStore.addResourceToTeacher(props.teacherId, selectedResource.value)
  if (props.modalName) {
    modalStore.hideModal(props.modalName)
  }
}
</script>