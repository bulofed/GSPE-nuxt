<template>
  <Disclosure v-slot="{ open }">
    <DisclosureButton
      class="w-full grid grid-cols-[64px_auto_64px] justify-stretch gap-x-4 py-2 bg-slate-500 rounded-md border-b dark:border-slate-600  items-center px-6 text-slate-100"
      :class="teacher.resources.length == 0 && 'cursor-default'"
    >
      <Icon
      v-if="teacher.resources.length > 0"
        name="mdi:chevron-down"
        :class="open && 'rotate-180 transform'"
        class="transition-all duration-200 justify-self-start h-min"
        size="24"
      />
      <div class="flex items-center col-start-2">
        <input
          type="text"
          v-model="teacher.firstname"
          class="input border-none flex-1"
          @click.stop
          @blur="teacherStore.updateTeacher(teacherId, teacher)"
          @keyup.enter="teacherStore.updateTeacher(teacherId, teacher)"
          placeholder="Nom de l'enseignant"
        />
        <input
          type="text"
          v-model="teacher.lastname"
          class="input border-none flex-1"
          @click.stop
          @blur="teacherStore.updateTeacher(teacherId, teacher)"
          @keyup.enter="teacherStore.updateTeacher(teacherId, teacher)"
          placeholder="Prénom de l'enseignant"
        />
        <p v-if="teacher.resources.length > 0" class="w-full text-right">{{ totalHours }}h</p>
      </div>
      <AddButton
        @click.stop="modalStore.showModal(modalId)"
        class="justify-self-end hover:bg-black/10"
      />
      <Dialog :modalName="modalId">
        <AddResourceModal :modalName="modalId" :teacherId="teacherId"/>
      </Dialog>
    </DisclosureButton>
    <DisclosurePanel class="dark:text-slate-100" as="ul">
      <Resource
        v-for="resource in teacher.resources"
        :key="resource._id ? resource._id.toString() : ''"
        :resource="resource"
        :teacherId="teacherId"
      />
    </DisclosurePanel>
  </Disclosure>
</template>

<script lang="ts" setup>
import type { ITeacher } from '~/types';

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/vue';

import Resource from './Resource.vue';
import AddResourceModal from './AddResourceModal.vue';
import AddButton from '~/components/elements/AddButton.vue';
import Dialog from '~/components/elements/Dialog.vue';

let modalStore = useModalStore()
let teacherStore = useTeacherStore()

const props = defineProps({
  teacher: {
    type: Object as () => ITeacher,
    default: () => ({})
  }
})

let teacherId = props.teacher._id ? props.teacher._id.toString() : ''
let modalId = ("Add Resource " + teacherId)

const totalHours = computed(() => {
  return props.teacher.resources.reduce((total, resource) => {
    return total + resource.lessons.reduce((total, lesson) => total + lesson.hours, 0)
  }, 0)
})
</script>