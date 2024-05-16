<template>
  <div class="flex justify-between mx-5 my-2 items-center gap-5">
    <div class="flex justify-start w-full gap-4">
      <h2 class="w-full text-left">{{ teacher.firstname }}</h2>
      <h2 class="w-full text-left">{{ teacher.lastname }}</h2>
    </div>
    <div class="flex justify-around gap-2">
      <EditButton @click="openForm(teacher._id.toString())"/>
      <ConfirmationDialog @confirm="deleteTeacher" />
    </div>
  </div>
</template>

<script lang="ts" setup>

import EditButton from '~/components/elements/EditButton.vue'
import ConfirmationDialog from '~/components/elements/ConfirmationDialog.vue'

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