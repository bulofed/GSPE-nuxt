<template>
  <Menu as="div" class="relative inline-block justify-self-end" ref="menu">
    <MenuButton class="btn hover:bg-black/10" @click.stop="calculateMenuTop">
      <Icon name="ic:baseline-more-vert" size="20"/>
    </MenuButton>
    <Teleport to="#popover">
      <MenuItems
        class="absolute mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none text-gray-900"
        :style="{ top: `${menuTop}px`, left: `${menuLeft}px` }"
      >
        <div class="absolute left-4 -top-1 rotate-45 size-3 bg-white -10"/>
        <div class="p-1">
          <MenuItem as="div" v-slot="{ active }">
            <button
              class="group flex w-full items-center rounded-md px-2 py-2 text-sm"
              :class="active ? 'bg-indigo-400 text-white' : 'bg-white text-gray-900'"
              @click.stop="addLesson(resource)"
            >
              <Icon name="ic:baseline-menu-book" class="mr-2 text-indigo-300 size-5" :active="active"/>
              Ajouter une leçon
            </button>
          </MenuItem>
          <MenuItem as="div" v-slot="{ active }">
            <button
              class="group flex w-full items-center rounded-md px-2 py-2 text-sm"
              :class="active ? 'bg-indigo-400 text-white' : 'bg-white text-gray-900'"
              @click.stop="deleteResource(resource)"
            >
              <Icon name="ic:baseline-delete" class="mr-2 text-indigo-300 size-5" :active="active"/>
              Supprimer
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Teleport>
  </Menu>
</template>

<script lang="ts" setup>
import type { ITeacher, IResource } from '~/types'

import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem
} from '@headlessui/vue'

const menu = ref<any>(null)
let menuTop = 0
let menuLeft = 0

onMounted(async () => {
  if (!menu.value?.$el) return
  menuTop = menu.value.$el.offsetTop + menu.value.$el.offsetHeight;
  menuLeft = menu.value.$el.offsetLeft;
})

const calculateMenuTop = () => {
  if (!menu.value?.$el) return
  menuTop = menu.value.$el.offsetTop + menu.value.$el.offsetHeight;
}

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