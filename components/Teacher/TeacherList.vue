<template>
  <div>
    <div class="grid grid-cols-3 items-center bg-blue-400 text-white p-2">
      <h1 class="col-start-2 text-center text-xl font-bold grow">Enseignants</h1>
      <AddTeacherButton class="ml-auto"/>
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

import { useTeacherStore } from '~/stores/teacher'

import TeacherCard from './TeacherCard.vue'
import AddTeacherButton from './AddTeacherButton.vue'

const teacherStore = useTeacherStore()

onMounted(teacherStore.fetchTeachers)
</script>