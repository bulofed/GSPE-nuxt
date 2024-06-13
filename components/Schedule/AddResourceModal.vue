<template>
  <div class="flex flex-col items-center justify-center">
    <DialogTitle
      as="h2"
      class="text-2xl font-bold text-black"
    >
      Ajouter une ressource
    </DialogTitle>
    <div class="mt-5 w-full flex items-start">
      <Combobox v-if="!isAdding" v-model="ressource">
        <div class="flex flex-col flex-grow">
          <ResourceSearchInput :query="selectedResource.libelle" />
          <ResourceOptions :teacherId="props.teacherId" @update:query="updateQuery" />
        </div>
      </Combobox>
      <div v-else class="flex-1 space-y-2">
        <input
          v-model="nomRessource"
          class="border border-gray-300 rounded p-2 h-10 w-full"
          placeholder="Nom de la ressource"
        >
        <input
          v-model="libelleResource"
          class="border border-gray-300 rounded p-2 h-10 w-full"
          placeholder="Libelle de la ressource"
        >
      </div>
      <EditButton
        v-if="!isAdding"
        class="ml-2 text-slate-600 hover:bg-black/10"
        @click="isAdding = !isAdding"
      />
      <SearchButton
        v-else
        class="ml-2 text-slate-600 hover:bg-black/10"
        @click="isAdding = !isAdding"
      />
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

import EditButton from '~/components/elements/EditButton.vue';
import SearchButton from '~/components/elements/SearchButton.vue';

import ResourceSearchInput from './ResourceSearchInput.vue'
import ResourceOptions from './ResourceOptions.vue'

import type { IResource } from '~/types';

const modalStore = useModalStore()
const teacherStore = useTeacherStore()

const props = defineProps({
  modalName: {
    type: String,
    required: true
  },
  teacherId: {
    type: String,
    required: true
  }
})

if (!props.teacherId) {
  throw new Error('Teacher ID is required')
}

const selectedResource = ref<IResource>({
  name: '',
  libelle: '',
  lessons: []
})

const nomRessource = ref('')
const libelleResource = ref('')

const ressource = computed(() => ({
  name: nomRessource.value,
  libelle: libelleResource.value,
  lessons: []
}))

provide('query', ressource.value.name)

const isAdding = ref(false)

const confirm = async () => {
  if (!props.teacherId || !props.modalName) {
    return
  }

  if (ressource.value.name.length > 0 && ressource.value.libelle.length > 0) {
    await teacherStore.addResourceToTeacher(props.teacherId, ressource.value)
  } else if (selectedResource.value) {
    await teacherStore.addResourceToTeacher(props.teacherId, selectedResource.value)
  }

  modalStore.hideModal(props.modalName)
}

const updateQuery = (libelle: string) => {
  selectedResource.value.libelle = libelle;
};
</script>