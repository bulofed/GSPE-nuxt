<template>
  <div class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
    <ComboboxInput
    class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
    @change="query = $event.target.value"
    placeholder="Rechercher une ressource"
    
    />
    <ComboboxButton
    class="absolute inset-y-0 right-0 flex items-center pr-2"
    >
      <Icon size="24" class="text-gray-400" name="flowbite:chevron-sort-outline" />
    </ComboboxButton>
  </div>
</template>

<script lang='ts' setup>
import { ComboboxInput, ComboboxButton } from '@headlessui/vue'
let query = inject('query')
</script>