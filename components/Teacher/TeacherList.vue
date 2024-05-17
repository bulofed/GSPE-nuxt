<template>
  <div class="border rounded-xl text-center overflow-auto dark:border-slate-900/50 bg-slate-100 dark:bg-slate-700 basis-1/3">
    <div class="grid grid-cols-3 items-center bg-blue-400 text-white p-2">
      <h1 class="col-start-2 text-center text-xl font-bold grow">Enseignants</h1>
      <div class="ml-auto">
        <AddButton @click="openForm()" />
        <Dialog :modalName="modal">
          <TeacherDialog />
        </Dialog>
      </div>
    </div>
    <div class="max-h-72 overflow-auto mx-5">
      <TeacherCard
        v-for="teacher in teacherStore.teachers"
        :key="teacher._id ? teacher._id.toString() : ''"
        :teacher="teacher"
        class="py-2 border-b border-gray-200 dark:border-slate-600"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRessourceModalStore } from '~/stores/ressourceModal'
import { useTeacherStore } from '~/stores/teacher'

import TeacherCard from './TeacherCard.vue'
import TeacherDialog from './TeacherDialog.vue';
import AddButton from '~/components/elements/AddButton.vue'
import Dialog from '~/components/elements/Dialog.vue';

const ressourceModalStore = useRessourceModalStore()
const teacherStore = useTeacherStore()

const modal = 'addTeacher'

const openForm = (id: string = '') => {
  ressourceModalStore.setTeacherId(id)
  ressourceModalStore.showModal(modal)
}

</script>