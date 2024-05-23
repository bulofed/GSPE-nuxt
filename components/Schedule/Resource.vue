<template>
  <li>
    <Disclosure v-slot="{ open }">
      <DisclosureButton
        class="w-full py-2 bg-slate-400 rounded-md border-b border-slate-600 grid grid-cols-3 justify-center items-center px-12 cursor-default text-slate-100"
        :class="resource.lessons.length > 0 && 'cursor-pointer justify-between'"
      >
        <Icon
          v-if="resource.lessons.length > 0"
          name="mdi:chevron-up"
          class="transition-all duration-200"
          :class="open && 'rotate-180 transform justify-self-start'"
          size="24"
        />
        <input
          type="text"
          v-model="resource.name"
          class="input border-none col-start-2"
          @click.stop
          @blur="updateResource(resource)"
          @keyup.enter="updateResource(resource)"
          placeholder="Nom de la ressource"
        />
        <Menu as="div" class="relative inline-block justify-self-end">
          <MenuButton class="btn hover:bg-black/10">
            <Icon name="ic:baseline-more-vert" size="20"/>
          </MenuButton>
          <MenuItems
            class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-10 text-gray-900"
          >
            <div class="p-1">
              <MenuItem as="div" v-slot="{ active }">
                <button
                  class="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                  :class="active ? 'bg-indigo-400 text-white' : 'text-gray-900'"
                  @click="deleteResource(resource)"
                >
                  <Icon name="ic:baseline-delete" class="mr-2 text-indigo-300 size-5" :active="active"/>
                  Supprimer
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
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
  Menu,
  MenuButton,
  MenuItems,
  MenuItem
} from '@headlessui/vue'

import AddButton from '~/components/elements/AddButton.vue'

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

const deleteResource = async (resource: IResource) => {
  let teacher = await teacherStore.fetchTeacher(props.teacherId)
  let newTeacher: ITeacher = {
    ...teacher,
    resources: teacher.resources.filter(existingResource => existingResource._id?.toString() !== resource._id?.toString())
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