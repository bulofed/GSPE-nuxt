<template>
  <Popover>
    <PopoverButton>
      <DeleteButton />
    </PopoverButton>
    <PopoverPanel class="absolute translate-y-2">
      <div class="absolute bg-white size-2 rotate-45 -translate-y-1 translate-x-[1.40rem]" />
      <div class="bg-white p-5 rounded-lg drop-shadow-lg">
        <div class="flex flex-col gap-4">
          <p class="text-center dark:text-slate-500">Supprimer cet enseignant ?</p>
          <div class="flex justify-center">
            <button
              @click="confirm"
              class="bg-red-400 hover:bg-red-500 transition-all duration-200 text-white font-bold py-2 px-10 rounded"
            >
              Oui
            </button>
          </div>
        </div>
      </div>
    </PopoverPanel>
  </Popover>
</template>

<script lang="ts" setup>

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

import DeleteButton from '~/components/elements/DeleteButton.vue'

const emits = defineEmits(['confirm'])

const confirm = () => {
  emits('confirm')
}
</script>