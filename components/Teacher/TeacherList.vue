<template>
  <div>
    <div class="grid grid-cols-3 items-center bg-blue-400 text-white p-2">
      <h1 class="col-start-2 text-center text-xl font-bold grow">Enseignants</h1>
      <AddButton
        class="ml-auto"
        @click="openForm"
      />
    </div>
    <div class="max-h-72 overflow-auto mx-5">
      <TeacherCard
        v-for="teacher in teacherStore.teachers"
        :key="teacher._id.toString()"
        :teacher="teacher"
        class="py-2 border-b border-gray-200 dark:border-slate-600"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useModalStore } from '~/stores/modal'
import TeacherModal from '~/components/Teacher/TeacherModal.vue'
import TeacherCard from './TeacherCard.vue'
import AddButton from '~/components/elements/AddButton.vue'

const modalStore = useModalStore()

const openForm = () => {
  modalStore.setComponent(TeacherModal)
  modalStore.teacher_id = ''
  modalStore.showModal()
}

import { useTeacherStore } from '~/stores/teacher'

const teacherStore = useTeacherStore()

onMounted(teacherStore.fetchTeachers)
</script>