<template>
  <div
    class="flex justify-between items-center space-x-5 align-center break-all"
  >
    <div class="flex flex-col md:flex-row justify-start w-full gap-4">
      <h2 class="text-center md:text-left md:w-full">
        {{ teacher.firstname }}
      </h2>
      <h2 class="text-center md:text-left md:w-full">{{ teacher.lastname }}</h2>
    </div>
    <MenuTeacher :teacher="props.teacher" />
  </div>
</template>

<script lang="ts" setup>
import MenuTeacher from './MenuTeacher.vue'

import type { ITeacher } from '~/types'

const props = defineProps({
  teacher: {
    type: Object as () => ITeacher,
    required: true,
  },
})
</script>
