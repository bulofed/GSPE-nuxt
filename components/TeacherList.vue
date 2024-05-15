<template>
    <div>
        <h1 class="text-xl font-bold bg-blue-400 text-white py-2">Enseignants</h1>
        <div v-for="teacher in teacherStore.teachers" :key="teacher._id.toString()">
            <div class="flex justify-between mx-5 my-2 items-center">
                <div class="flex justify-start w-full gap-4">
                    <h2 class="w-full text-left">{{ teacher.firstname }}</h2>
                    <h2 class="w-full text-left">{{ teacher.lastname }}</h2>
                </div>
                <div class="flex justify-around gap-2">
                    <EditButton @click="openEditForm(teacher._id.toString())"/>
                    <DeleteButton @click="teacherStore.deleteTeacher(teacher._id.toString())"/>
                </div>
            </div>
        </div>
        <button
            @click="openCreateForm"
            class="bg-blue-400 hover:bg-blue-500 transition-all duration-200 text-white font-bold py-2 px-4 rounded w-10/12 my-2"
        >
            Ajouter un enseignant
            <Icon name="uil:plus" size="20"/>
        </button>
    </div>
</template>
  
<script lang="ts" setup>

import { useModalStore } from '~/stores/modal';
import { useTeacherStore } from '~/stores/teacher';

import TeacherModal from './TeacherModal.vue';
import DeleteButton from './DeleteButton.vue';
import EditButton from './EditButton.vue';

const modalStore = useModalStore();
const teacherStore = useTeacherStore();

onMounted(teacherStore.fetchTeachers);

const openCreateForm = () => {
    modalStore.setComponent(TeacherModal);
    modalStore.setTeacherId('');
    modalStore.showModal();
};

const openEditForm = (id: string) => {
    modalStore.setComponent(TeacherModal);
    modalStore.setTeacherId(id);
    modalStore.showModal();
};
</script>