<template>
  <Disclosure v-slot="{ open }">
    <DisclosureButton class="grid grid-cols-3 p-2 w-full bg-slate-200 dark:bg-slate-600 border-b border-slate-100 dark:border-slate-700 rounded-md dark:text-slate-200 font-medium items-center">
      <Icon
        name="mdi:chevron-up"
        :class="open && 'rotate-180 transform'"
        class="transition-all duration-200 mr-auto"
        size="24"
      />
      <h2>{{ teacher.firstname }} {{ teacher.lastname }}</h2>
      <div class="ml-auto">
        <AddButton @click.stop="modalStore.showModal(modalId)" class="text-slate-600 dark:text-white"/>
        <Dialog :modalName="modalId">
          <AddResourceModal :modalName="modalId" :teacherId="teacher._id"/>
        </Dialog>
      </div>
    </DisclosureButton>
    <DisclosurePanel class="dark:text-slate-200 px-4">
      <ul class="my-2">
        <Resource
          v-for="resource in teacher.resources"
          :key="resource._id.toString()"
          :resource="resource"
        />
      </ul>
    </DisclosurePanel>
  </Disclosure>
</template>

<script lang="ts" setup>
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

const props = defineProps({
  teacher: {
    type: Object,
    default: () => ({})
  }
})

let teacherId = props.teacher._id.toString()
let modalId = ("Add Resource " + teacherId)
</script>