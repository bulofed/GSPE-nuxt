<template>
  <div>
    <h1 class="text-xl font-bold bg-blue-400 text-white py-2">Enseignants</h1>
    <div class="max-h-72 overflow-auto mx-5">
      <TeacherCard
        v-for="teacher in teacherStore.teachers"
        :key="teacher._id.toString()"
        :teacher="teacher"
        class="py-2 border-b border-gray-200 dark:border-slate-600"
      />
    </div>
    <AddTeacherButton />
  </div>
</template>

<script lang="ts" setup>

import { useTeacherStore } from '~/stores/teacher'

import TeacherCard from './TeacherCard.vue'
import AddTeacherButton from './AddTeacherButton.vue'

const teacherStore = useTeacherStore()

onMounted(teacherStore.fetchTeachers)
</script>