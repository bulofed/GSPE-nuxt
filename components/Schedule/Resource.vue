<template>
  <li>
    <Disclosure v-slot="{ open }">
      <DisclosureButton
        v-if="resource"
        class="w-full py-2 bg-slate-200 dark:bg-slate-500 rounded-md border-b border-slate-100 dark:border-slate-600 grid grid-cols-[40px_auto_40px] justify-stretch items-center gap-x-4 px-12 cursor-default text-slate-500 dark:text-slate-100"
        :class="resource.lessons.length > 0 && 'cursor-pointer justify-between'"
      >
        <Icon
          v-if="resource.lessons.length > 0"
          name="mdi:chevron-right"
          class="transition-all duration-200"
          :class="open && 'rotate-90 transform justify-self-start'"
          size="24"
        />
        <div class="flex gap-1 justify-between items-center col-start-2">
          <div class="flex gap-1">
            <input
              v-model="res!.name"
              type="text"
              class="input border-none text-slate-500 dark:text-slate-100"
              placeholder="Nom de la ressource"
              @click.stop
              @blur="updateResource(resource)"
              @keyup.enter="updateResource(resource)"
            >
            <input
              v-model="res!.libelle"
              type="text"
              class="input border-none text-slate-500 dark:text-slate-100"
              placeholder="Libelle de la ressource"
              @click.stop
              @blur="updateResource(resource)"
              @keyup.enter="updateResource(resource)"
            >
          </div>
          <p
            v-if="resource.lessons.length > 0"
            class="w-full text-slate-500 dark:text-slate-100 text-right"
          >
            {{ totalHours }}h
          </p>
        </div>
        <MenuRessource v-if="resource && props.isAdmin" :resource="resource" :teacherId="teacherId" />
      </DisclosureButton>
      <DisclosureButton
        v-else
        class="w-full py-2 bg-slate-200 dark:bg-slate-500 rounded-md border-b border-slate-100 dark:border-slate-600 grid grid-cols-[40px_auto_40px] items-center cursor-pointer justify-between gap-x-4 px-12 text-slate-500 dark:text-slate-100"
      >
        <Icon
          name="mdi:chevron-right"
          class="transition-all duration-200"
          :class="open && 'rotate-90 transform justify-self-start'"
          size="24"
        />
        <div class="flex gap-1 justify-between items-center col-start-2">
          <div class="flex gap-1">
            <input
              v-model="resourceInfo!.resource.name"
              type="text"
              class="input border-none text-slate-500 dark:text-slate-100"
              placeholder="Nom de la ressource"
              @click.stop
              @blur="updateResource(resource)"
              @keyup.enter="updateResource(resource)"
            >
            <input
              v-model="resourceInfo!.resource.libelle"
              type="text"
              class="input border-none text-slate-500 dark:text-slate-100"
              placeholder="Libelle de la ressource"
              @click.stop
              @blur="updateResource(resource)"
              @keyup.enter="updateResource(resource)"
            >
          </div>
          <p
            class="w-full text-slate-500 dark:text-slate-100 text-right"
          >
            {{ totalHours }}h
          </p>
        </div>
      </DisclosureButton>
      <Transition>
        <DisclosurePanel v-if="resource" as="ul">
          <li
            v-for="lesson in resource.lessons"
            :key="lesson._id!.toString()"
            class="flex gap-4 justify-between px-6 py-2"
          >
            <div class="flex flex-grow justify-around gap-1">
              <input
                v-model="lesson.name"
                type="text"
                placeholder="Nom de la leçon"
                class="input flex-grow text-gray-500 dark:text-gray-100"
                @blur="updateLesson(lesson)"
                @keyup.enter="updateLesson(lesson)"
              >
              <input
                v-model="lesson.hours"
                type="number"
                min="1"
                placeholder="Durée (en heure)"
                class="input flex-grow text-gray-500 dark:text-gray-100"
                @blur="updateLesson(lesson)"
                @keyup.enter="updateLesson(lesson)"
              >
            </div>
            <DeleteButton
              v-if="props.isAdmin"
              class="hover:bg-black/10"
              @click="deleteLesson(lesson)"
            />
          </li>
        </DisclosurePanel>
        <DisclosurePanel v-else class="dark:text-slate-100" as="ul">
          <template v-if="teacherId && resourceInfo!.teacherInfo">
            <li>{{ resourceInfo!.teacherInfo.firstname }} {{ resourceInfo!.teacherInfo.lastname }}</li>
          </template>
        </DisclosurePanel>
      </Transition>
    </Disclosure>
  </li>
</template>

<script lang="ts" setup>
import type { ITeacher, IResource, ILesson, IResourceInfo } from '~/types'

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
  required: false,
  default: () => ({
    _id: '',
    name: '',
    libelle: '',
    lessons: []
  })
},
resourceInfo: {
  type: Object as () => IResourceInfo,
  required: false,
  default: () => ({})
},
teacherId: {
  type: String,
  required: false,
  default: ''
},
isAdmin: {
  type: Boolean,
  default: false
}
})

const res = props.resource ? reactive(props.resource) : null;
const resourceInfo = props.resourceInfo ? reactive(props.resourceInfo) : null;

const totalHours = computed(() => {
  return props.resource?.lessons.reduce((total, lesson) => total + lesson.hours, 0) || 0;
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

// const totalHoursByTeacher = (teacherFirstname: string, teacherLastname: string) => {
//   return (props.resource.lessons as ILessonWithTeacher[])
//     .filter(lesson => lesson.teacher.firstname === teacherFirstname && lesson.teacher.lastname === teacherLastname)
//     .reduce((total, lesson) => total + lesson.hours, 0);
// };

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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: none;
}
</style>