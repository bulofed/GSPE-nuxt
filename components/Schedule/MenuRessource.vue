<template>
  <Menu ref="menu" as="div" class="relative inline-block justify-self-end">
    <MenuButton class="btn hover:bg-black/10" @click.stop="calculateMenuTop">
      <Icon name="ic:baseline-more-vert" size="20"/>
    </MenuButton>
    <Teleport to="#popover">
      <MenuItems
        class="absolute mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none text-gray-900"
        :style="{ top: `${menuTop}px`, left: `${menuLeft}px` }"
      >
        <div class="p-1">
          <MenuItem v-slot="{ active }" as="div">
            <button
              class="group flex w-full items-center rounded-md px-2 py-2 text-sm"
              :class="active ? 'bg-indigo-400 text-white' : 'bg-white text-gray-900'"
              @click.stop="addLesson(resource)"
            >
              <Icon name="ic:baseline-menu-book" class="mr-2 text-indigo-300 size-5" :active="active"/>
              Ajouter une leçon
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }" as="div">
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

const menu = ref<InstanceType<typeof Menu> | null>(null)
const menuTop = ref(0)
const menuLeft = ref(0)

onMounted(async () => {
  if (!menu.value?.$el) return
  const rect = menu.value.$el.getBoundingClientRect()
  menuTop.value = rect.top + rect.height
  menuLeft.value = rect.left
})

const calculateMenuTop = () => {
  if (!menu.value?.$el) return
  const rect = menu.value.$el.getBoundingClientRect()
  menuTop.value = rect.top + rect.height
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
  const teacher = await teacherStore.fetchTeacher(props.teacherId)
  const newTeacher: ITeacher = {
    ...teacher,
    resources: teacher.resources.filter(existingResource => existingResource._id?.toString() !== resource._id?.toString())
  }

  await teacherStore.updateTeacher(props.teacherId, newTeacher)
}

const addLesson = async (resource: IResource) => {
  const teacher = await teacherStore.fetchTeacher(props.teacherId)
  const newTeacher: ITeacher = {
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