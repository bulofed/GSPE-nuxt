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
      <ConfirmationDialog @confirm="deleteTeacher" />
    </div>
  </div>
</template>

<script lang="ts" setup>

import EditButton from '~/components/elements/EditButton.vue'
import ConfirmationDialog from '~/components/Teacher/ConfirmationDialog.vue'

import { useModalStore } from '~/stores/modal'
import { useTeacherStore } from '~/stores/teacher'

import TeacherModal from './TeacherModal.vue';

const props = defineProps({
  teacher: {
    type: Object,
    default: () => ({})
  }
})

const modalStore = useModalStore()
const teacherStore = useTeacherStore()

const openForm = (id: string) => {
  modalStore.setComponent(TeacherModal)
  modalStore.setTeacherId(id)
  modalStore.showModal()
}

const deleteTeacher = () => {
  teacherStore.deleteTeacher(props.teacher._id.toString())
}
</script>