<template>
  <div class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left sm:text-sm">
    <ComboboxInput
    v-model="reac.libelle"
    class="w-full h-10 py-3 pl-3 pr-10 text-sm leading-5 text-gray-900 bg-slate-100"
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
import type { IResource } from '~/types';
const props = defineProps({
  query: {
    type: Object as () => IResource,
    required: true
  }
})

const reac = ref(props.query)
</script>