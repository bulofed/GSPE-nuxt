<template>
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
            @click.stop="addLesson(resource)"
          >
            <Icon name="ic:baseline-menu-book" class="mr-2 text-indigo-300 size-5" :active="active"/>
            Ajouter une leçon
          </button>
        </MenuItem>
        <MenuItem as="div" v-slot="{ active }">
          <button
            class="group flex w-full items-center rounded-md px-2 py-2 text-sm"
            :class="active ? 'bg-indigo-400 text-white' : 'text-gray-900'"
            @click.stop="deleteResource(resource)"
          >
            <Icon name="ic:baseline-delete" class="mr-2 text-indigo-300 size-5" :active="active"/>
            Supprimer
          </button>
        </MenuItem>
      </div>
    </MenuItems>
  </Menu>
</template>

<script lang="ts" setup>
import type { ITeacher, IResource, ILesson } from '~/types'

import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem
} from '@headlessui/vue'

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

const deleteResource = async (resource: IResource) => {
  let teacher = await teacherStore.fetchTeacher(props.teacherId)
  let newTeacher: ITeacher = {
    ...teacher,
    resources: teacher.resources.filter(existingResource => existingResource._id?.toString() !== resource._id?.toString())
  }

  await teacherStore.updateTeacher(props.teacherId, newTeacher)
}

const addLesson = async (resource: IResource) => {
  let teacher = await teacherStore.fetchTeacher(props.teacherId)
  let newTeacher: ITeacher = {
    ...teacher,
    resources: teacher.resources.map(existingResource => {
      if (existingResource._id?.toString() === resource._id?.toString()) {
        return {
          ...existingResource,
          lessons: [
            ...existingResource.lessons,
            {
              name: '',
              hours: 1
            }
          ]
        }
      } else {
        return existingResource
      }
    })
  }

  await teacherStore.updateTeacher(props.teacherId, newTeacher)
}
</script>