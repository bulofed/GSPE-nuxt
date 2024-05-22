<template>
  <li>
    <Disclosure v-slot="{ open }">
      <DisclosureButton
        class="relative w-full py-2 bg-slate-400 rounded-md border-b border-slate-600"
        :class="resource.lessons.length == 0 && 'cursor-default'"
      >
        <Icon
          v-if="resource.lessons.length > 0"
          name="mdi:chevron-up"
          class="absolute inset-y-auto left-6 transition-all duration-200"
          :class="open && 'rotate-180 transform'"
          size="24"
        />
        <span>{{ resource.name }}</span>
      </DisclosureButton>
      <Transition>
        <DisclosurePanel as="ul">
          <li
            v-for="lesson in resource.lessons"
            :key="lesson._id ? lesson._id.toString() : ''"
            class="flex flex-row gap-1 justify-around px-6 py-2"
          >
            <input
              type="text"
              v-model="lesson.name"
              class="border border-gray-300 bg-transparent rounded flex-grow text-slate-100 focus:border-transparent focus:ring focus:ring-blue-500 focus:outline-none p-1"
              placeholder="Nom de la leçon"
              @blur="updateLesson(lesson)"
              @keyup.enter="updateLesson(lesson)"
            />
            <input
              type="number"
              v-model="lesson.hours"
              class="border border-gray-300 bg-transparent rounded flex-grow text-slate-100 focus:border-transparent focus:ring focus:ring-blue-500 focus:outline-none p-1"
              placeholder="Durée"
              @blur="updateLesson(lesson)"
              @keyup.enter="updateLesson(lesson)"
            />
          </li>
        </DisclosurePanel>
      </Transition>
    </Disclosure>
  </li>
</template>

<script lang="ts" setup>
import type { ITeacher, IResource, ILesson } from '~/types'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'

import { useTeacherStore } from '~/stores/teacher'

const teacherStore = useTeacherStore()

const props = defineProps({
resource: {
  type: Object as () => IResource,
  default: () => ({})
},
teacherId: {
  type: String,
  default: ''
}
})

const updateLesson = async (lesson: ILesson) => {
  let teacher = await teacherStore.fetchTeacher(props.teacherId)
  let newTeacher: ITeacher = {
    ...teacher,
    resources: teacher.resources.map(resource => {
      if (resource._id?.toString() === props.resource._id?.toString()) {
        return {
          ...resource,
          lessons: resource.lessons.map(existingLesson => {
            if (existingLesson._id?.toString() === lesson._id?.toString()) {
              return lesson
            } else {
              return existingLesson
            }
          })
        }
      } else {
        return resource
      }
    })
  }

  if (newTeacher == teacher) {
    return
  }
  
  await teacherStore.updateTeacher(props.teacherId, newTeacher)
}

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s cubic-bezier(0.1, 0.7, 1, 0.1);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>