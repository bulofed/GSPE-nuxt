<template>
  <div>
    <h1 class="text-xl font-bold bg-blue-400 text-white py-2">Enseignants</h1>
    <div class="max-h-72 overflow-hidden overflow-y-auto">
      <TeacherCard
        v-for="teacher in teacherStore.teachers"
        :key="teacher._id.toString()"
        :teacher="teacher"
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