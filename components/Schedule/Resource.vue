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
          class="absolute inset-y-0 my-auto left-6 transition-all duration-200"
          :class="open && 'rotate-180 transform'"
          size="24"
        />
        <input
          type="text"
          v-model="resource.name"
          class="input flex-grow border-none"
          @click.stop
          @blur="updateResource(resource)"
          @keyup.enter="updateResource(resource)"
          placeholder="Nom de la ressource"
        />
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
              class="input flex-grow"
              @blur="updateLesson(lesson)"
              @keyup.enter="updateLesson(lesson)"
              placeholder="Nom de la leçon"
            />
            <input
              type="number"
              min="1"
              v-model="lesson.hours"
              class="input flex-grow"
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

const updateResource = async (resource: IResource) => {
  let teacher = await teacherStore.fetchTeacher(props.teacherId)
  let newTeacher: ITeacher = {
    ...teacher,
    resources: teacher.resources.map(existingResource => {
      if (existingResource._id?.toString() === resource._id?.toString()) {
        return resource
      } else {
        return existingResource
      }
    })
  }

  if (newTeacher == teacher) {
    return
  }

  await teacherStore.updateTeacher(props.teacherId, newTeacher)
}

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