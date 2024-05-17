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
        <AddButton @click.stop="ressourceModalStore.showModal"/>
        <Dialog>
          <DialogTitle
            as="h3"
            class="text-lg font-medium leading-6 text-gray-900"
          >
            Payment successful
          </DialogTitle>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
              Your payment has been successfully submitted. We’ve sent you
              an email with all of the details of your order.
            </p>
          </div>

          <div class="mt-4">
            <button
              type="button"
              class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              @click="ressourceModalStore.hideModal"
            >
              Got it, thanks!
            </button>
          </div>
        </Dialog>
      </div>
    </DisclosureButton>
    <DisclosurePanel class="dark:text-slate-200 px-4">
      <ul>
        <Ressource
          v-for="ressource in teacher.ressources"
          :key="ressource._id.toString()"
          :ressource="ressource"
        />
      </ul>
    </DisclosurePanel>
  </Disclosure>
</template>

<script lang="ts" setup>
import { Disclosure, DisclosureButton, DisclosurePanel, DialogTitle } from '@headlessui/vue';

import Ressource from './Ressource.vue';
import AddButton from '~/components/elements/AddButton.vue';
import Dialog from '~/components/elements/Dialog.vue';

import type { ITeacher } from '~/types'

import { useRessourceModalStore } from '~/stores/ressourceModal'

const ressourceModalStore = useRessourceModalStore()

const props = defineProps({
teacher: {
  type: Object as () => ITeacher,
  default: () => ({})
}
})
</script>