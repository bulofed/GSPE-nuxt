<template>
  <div class="border rounded-xl text-center overflow-hidden dark:border-slate-900/50 bg-slate-100 dark:bg-slate-700 basis-2/3">
    <ModuleTitle>Planning</ModuleTitle>
    <Teacher
      v-for="teacher in teacherStore.teachers"
      :key="teacher._id!.toString()"
      :teacher="teacher"
    />
    <p class="text-right pr-4">Total heures: {{ totalHours }}h</p>
  </div>
</template>

<script lang="ts" setup>
import { useTeacherStore } from '~/stores/teacher'

import ModuleTitle from '../elements/ModuleTitle.vue';

import Teacher from './Teacher.vue'

import type { ITeacher } from '~/types'

const teacherStore = useTeacherStore()

onMounted(teacherStore.fetchTeachers)

function calculateTotalHours(teacher: ITeacher): number {
  let totalHours = 0;

  for (const resource of teacher.resources) {
    for (const lesson of resource.lessons) {
      totalHours += lesson.hours;
    }
  }

  return totalHours;
}

const totalHours = computed(() => {
  return teacherStore.teachers.reduce((total, teacher) => total + calculateTotalHours(teacher), 0)
})
</script>