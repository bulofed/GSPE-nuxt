<template>
  <div
    class="flex justify-between items-center align-center break-all"
  >
    <div class="flex flex-col md:flex-row justify-start w-full gap-1 mx-1">
      <input
        v-model="res.info.firstname"
        type="text"
        placeholder="Prénom"
        :readonly="!isEditing"
        class="text-center md:text-left md:w-full bg-transparent rounded-full py-1 px-2 focus:border-transparent focus:ring focus:ring-white/10 focus:outline-none"
        @blur="updateTeacher"
        @keyup.enter="updateTeacher"
      >
      <input
        v-model="res.info.lastname"
        type="text"
        placeholder="Nom"
        :readonly="!isEditing"
        class="text-center md:text-left md:w-full bg-transparent rounded-full py-1 px-2 focus:border-transparent focus:ring focus:ring-white/10 focus:outline-none"
        @blur="updateTeacher"
        @keyup.enter="updateTeacher"
      >
    </div>
    <MenuTeacher :teacher="props.teacher" @edit-teacher="isEditing = true" />
  </div>
</template>

<script lang="ts" setup>
import MenuTeacher from './MenuTeacher.vue'

import type { ITeacher } from '~/types'

const teacherStore = useTeacherStore()

const props = defineProps({
  teacher: {
    type: Object as () => ITeacher,
    required: true,
  },
})

const res = reactive(props.teacher)
const isEditing = ref(false)

const updateTeacher = () => {
  if (res.info.firstname == props.teacher.info.firstname && res.info.lastname == props.teacher.info.lastname) {
    return
  } 
  teacherStore.updateTeacher(res._id!.toString(), res)
}
</script>