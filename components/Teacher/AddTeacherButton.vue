<template>
  <button
    @click="openForm"
    class="bg-blue-400 hover:bg-blue-500 transition-all duration-200 text-white font-bold py-2 px-4 rounded-full w-10/12 my-2"
  >
    Ajouter un enseignant
    <Icon name="uil:plus" size="20"/>
  </button>
</template>

<script lang="ts" setup>
import { useModalStore } from '~/stores/modal'
import TeacherModal from '~/components/Teacher/TeacherModal.vue'

const modalStore = useModalStore()

const openForm = () => {
  modalStore.setComponent(TeacherModal)
  modalStore.showModal()
}
</script>