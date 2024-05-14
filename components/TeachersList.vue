<script lang="ts" setup>

import type { ITeacher } from '~/types';
import { useModal } from '~/composables/useModal';

import TeacherModal from './TeacherModal.vue';

const modal = useModal();

const teachers = ref<ITeacher[]>([])

const fetchTeachers = async () => {
  const response = await $fetch('/api/teacher/all-teachers', {
      method: 'GET',
    });
    teachers.value = response.teachers as any;
}

onMounted(async () => {
  await fetchTeachers();
})

const openCreateForm = () => {
  modal.component.value = markRaw(TeacherModal);
  modal.showModal();
  modal.teacher_id.value = '';
}

const openEditForm = (id: string) => {
  modal.component.value = markRaw(TeacherModal);
  modal.showModal();
  modal.teacher_id.value = id;
}

const deleteTeacher = async (id: string) => {
  await $fetch(`/api/teacher/${id}`, {
    method: 'DELETE',
  });

  // Re-fetch the teachers after deleting one
  const response = await $fetch('/api/teacher/all-teachers', {
    method: 'GET',
  });
  teachers.value = response.teachers as any;
}

</script>

<template>
  <div class="border rounded-xl text-center overflow-hidden">
    <h1 class="text-xl font-bold bg-blue-400 text-white py-2">Liste des enseignants</h1>
    <div
      v-for="teacher in teachers" :key="teacher._id.toString()"
    >
      <div class="flex justify-between mx-5 my-2 items-center">
        <div class="flex justify-start w-full gap-4">
          <h2>{{ teacher.firstname }}</h2>
          <h2>{{ teacher.lastname }}</h2>
        </div>
        <div class="flex justify-around gap-2">
          <button @click="openEditForm(teacher._id.toString())" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Icon name="uil:edit" size="20"/>
          </button>
          <button @click="deleteTeacher(teacher._id.toString())" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            <Icon name="uil:trash-alt" size="20"/>
          </button>
        </div>
      </div>
    </div>
    <button @click="openCreateForm" class="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded w-10/12 my-2">
      Ajouter un enseignant
      <Icon name="uil:plus" size="20"/>
    </button>
    <Teleport to="#modal">
      <Transition>
        <TeacherModal
          v-if="modal.show.value" @close="modal.hideModal()"
          @fetch-teachers="fetchTeachers"
        />
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.v-enter-active, .v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from, .v-leave-to {
  opacity: 0;
}

</style>