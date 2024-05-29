<template>
  <li>
    <Disclosure v-slot="{ open }">
      <DisclosureButton
        class="w-full py-2 bg-slate-400 rounded-md border-b dark:border-slate-600 grid grid-cols-[40px_auto_40px] justify-stretch items-center gap-x-4 px-12 cursor-default text-slate-100"
        :class="resource.lessons.length > 0 && 'cursor-pointer justify-between'"
      >
        <Icon
          v-if="resource.lessons.length > 0"
          name="mdi:chevron-down"
          class="transition-all duration-200"
          :class="open && 'rotate-180 transform justify-self-start'"
          size="24"
        />
        <div class="flex gap-1 justify-between items-center col-start-2">
          <input
            v-model="res.name"
            type="text"
            class="input border-none"
            placeholder="Nom de la ressource"
            @click.stop
            @blur="updateResource(resource)"
            @keyup.enter="updateResource(resource)"
          >
          <p v-if="resource.lessons.length > 0" class="w-full text-slate-100 text-right">{{ totalHours }}h</p>
        </div>
        <MenuRessource :resource="resource" :teacherId="teacherId"/>
      </DisclosureButton>
      <Transition>
        <DisclosurePanel as="ul">
          <li
            v-for="lesson in resource.lessons"
            :key="lesson._id ? lesson._id.toString() : ''"
            class="flex gap-4 justify-between px-6 py-2"
          >
            <div class="flex flex-grow justify-around gap-1">
              <input
                v-model="lesson.name"
                type="text"
                class="input flex-grow text-gray-500 dark:text-gray-100"
                placeholder="Nom de la leçon"
                @blur="updateLesson(lesson)"
                @keyup.enter="updateLesson(lesson)"
              >
              <input
                v-model="lesson.hours"
                type="number"
                min="1"
                class="input flex-grow text-gray-500 dark:text-gray-100"
                placeholder="Durée"
                @blur="updateLesson(lesson)"
                @keyup.enter="updateLesson(lesson)"
              >
            </div>
            <DeleteButton class="hover:bg-black/10" @click="deleteLesson(lesson)"/>
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
  DisclosurePanel
} from '@headlessui/vue'

import DeleteButton from '~/components/elements/DeleteButton.vue'

import MenuRessource from './MenuRessource.vue';

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

const res = reactive(props.resource)

const totalHours = computed(() => {
  return props.resource.lessons.reduce((total, lesson) => total + lesson.hours, 0);
})

const updateResource = async (resource: IResource) => {
  const teacher = await teacherStore.fetchTeacher(props.teacherId)
  const newTeacher: ITeacher = {
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
  const teacher = await teacherStore.fetchTeacher(props.teacherId)
  const newTeacher: ITeacher = {
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

const deleteLesson = async (lesson: ILesson) => {
  const teacher = await teacherStore.fetchTeacher(props.teacherId)
  const newTeacher: ITeacher = {
    ...teacher,
    resources: teacher.resources.map(resource => {
      if (resource._id?.toString() === props.resource._id?.toString()) {
        return {
          ...resource,
          lessons: resource.lessons.filter(existingLesson => existingLesson._id?.toString() !== lesson._id?.toString())
        }
      } else {
        return resource
      }
    })
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

::placeholder {
  color: var(--slate-400);
}
</style>