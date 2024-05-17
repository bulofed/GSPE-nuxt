<template>
  <div class="flex justify-between items-center space-x-5 align-center break-all">
    <div class="flex flex-col md:flex-row justify-start w-full gap-4">
      <h2 class="text-center md:text-left md:w-full">{{ teacher.firstname }}</h2>
      <h2 class="text-center md:text-left md:w-full">{{ teacher.lastname }}</h2>
    </div>
    <div class="flex flex-col md:flex-row justify-around gap-2">
      <EditButton
        @click="openForm(teacher._id.toString())"
        class="bg-blue-500 hover:bg-blue-600"
      />
      <Dialog :modalName="modal">
        <TeacherDialog />
      </Dialog>
      <ConfirmationDialog @confirm="deleteTeacher" />
    </div>
  </div>
</template>

<script lang="ts" setup>

import EditButton from '~/components/elements/EditButton.vue'
import ConfirmationDialog from '~/components/Teacher/ConfirmationDialog.vue'
import Dialog from '~/components/elements/Dialog.vue';

import { useTeacherStore } from '~/stores/teacher'
import { useRessourceModalStore } from '~/stores/ressourceModal'

import TeacherDialog from './TeacherDialog.vue';

const props = defineProps({
  teacher: {
    type: Object,
    default: () => ({})
  }
})

const teacherStore = useTeacherStore()
const ressourceModalStore = useRessourceModalStore()

const modal = 'editTeacher'

const openForm = (id: string = '') => {
  ressourceModalStore.setTeacherId(id)
  ressourceModalStore.showModal(modal)
}

const deleteTeacher = () => {
  teacherStore.deleteTeacher(props.teacher._id.toString())
}
</script>