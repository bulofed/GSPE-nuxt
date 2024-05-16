<template>
  <button
    @click="openForm"
    class="bg-blue-400 hover:bg-blue-500 transition-all duration-200 text-white font-bold py-2 px-10 rounded-full m-2"
  >
  <Icon name="uil:plus" size="20"/>
    Ajouter un enseignant
  </button>
</template>

<script lang="ts" setup>
import { useModalStore } from '~/stores/modal'
import TeacherModal from '~/components/Teacher/TeacherModal.vue'

const modalStore = useModalStore()

const openForm = () => {
  modalStore.setComponent(TeacherModal)
  modalStore.teacher_id = ''
  modalStore.showModal()
}
</script>