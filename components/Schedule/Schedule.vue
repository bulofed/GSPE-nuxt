<script lang="ts" setup>

import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  } from '@headlessui/vue'

import { useTeacherStore } from '~/stores/teacher'

const teacherStore = useTeacherStore()

onMounted(teacherStore.fetchTeachers)
</script>

<template>
  <div class="border rounded-xl text-center overflow-hidden dark:border-slate-900/50 bg-slate-100 dark:bg-slate-700 basis-2/3">
    <h1 class="text-xl font-bold p-4 w-full bg-blue-400 text-white">Planning</h1>
    <div v-for="teacher in teacherStore.teachers" :key="teacher._id.toString()">
      <Disclosure v-slot="{ open }">
        <DisclosureButton class="grid grid-cols-3 p-2 w-full bg-slate-200 dark:bg-slate-600 border-b border-slate-100 dark:border-slate-700 rounded-md dark:text-slate-200 font-medium">
          <Icon
            name="mdi:chevron-down"
            :class="open && 'rotate-180 transform'"
            class="transition-all duration-200 mr-auto"
            size="24"
          />
          <h2>{{ teacher.firstname }} {{ teacher.lastname }}</h2>
        </DisclosureButton>
        <DisclosurePanel class="dark:text-slate-200 px-4">
          <ul>
            <li v-for="ressource in teacher.ressources" :key="ressource._id.toString()">
              <div class="flex justify-start">
                <p class="text-left grow">{{ ressource.name }}</p>
                <div class="flex flex-col grow">
                  <div
                    v-for="lesson in ressource.lessons"
                    :key="lesson._id.toString()"
                    class="flex flex-row justify-between"
                  >
                    <p>{{ lesson.name }}</p>
                    <p>{{  lesson.hours }}h</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>

<style scoped>
</style>