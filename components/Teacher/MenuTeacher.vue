<template>
  <Menu ref="menu" as="div" class="relative inline-block justify-self-end">
    <MenuButton class="btn hover:bg-black/10" @click.stop="calculateMenuPos">
      <Icon name="ic:baseline-more-vert" size="20" />
    </MenuButton>
    <Teleport to="#popover">
      <MenuItems
        class="absolute mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none text-gray-900"
        :style="{ top: `${menuTop}px`, left: `${menuLeft}px` }"
      >
        <div class="p-1">
          <MenuItem v-slot="{ active }" as="div">
            <button
              class="menu-item"
              :class="
                active ? 'bg-indigo-400 text-white' : 'bg-white text-gray-900'
              "
              @click.stop="editTeacher"
            >
              <Icon
                name="ic:baseline-edit"
                class="mr-2 text-indigo-300 size-5"
                :active="active"
              />
              Modifier
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }" as="div">
            <button
              class="menu-item"
              :class="
                active ? 'bg-indigo-400 text-white' : 'bg-white text-gray-900'
              "
              @click.stop="deleteTeacher"
            >
              <Icon
                name="ic:baseline-delete"
                class="mr-2 text-indigo-300 size-5"
                :active="active"
              />
              Supprimer
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Teleport>
  </Menu>
</template>

<script lang="ts" setup>
import type { ITeacher } from '~/types'

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const menu = ref<InstanceType<typeof Menu> | null>(null)
const menuTop = ref(0)
const menuLeft = ref(0)

const emit = defineEmits(['edit-teacher'])

const calculateMenuPos = () => {
  if (!menu.value?.$el) return
  const rect = menu.value.$el.getBoundingClientRect()
  menuTop.value = rect.top + rect.height
  menuLeft.value = rect.left - 150
}

onMounted(async () => {
  calculateMenuPos()
})
const teacherStore = useTeacherStore()

const props = defineProps({
  teacher: {
    type: Object as () => ITeacher,
    required: true,
  },
})

const deleteTeacher = async () => {
  try {
    await teacherStore.deleteTeacher(props.teacher._id!.toString())
    calculateMenuPos()
    await teacherStore.fetchTeachers()
  } catch (error) {
    console.error('Failed to delete resource:', error)
  }
}

const editTeacher = () => {
  emit('edit-teacher')
  
}
</script>