<template>
    <div class="flex flex-col items-center justify-center">
        <h1 class="text-2xl font-bold text-black">{{ action }} un enseignant</h1>
        <form class="flex flex-col gap-4 mt-4">
            <input
                v-model="firstname"
                type="text"
                placeholder="Prénom"
                class="border border-gray-300 p-2 rounded"
            />
            <input
                v-model="lastname"
                type="text"
                placeholder="Nom"
                class="border border-gray-300 p-2 rounded"
            />
            <button
                @click="confirm"
                type="button"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Confirmer
            </button>
        </form>
    </div>
</template>

<script setup>

import { useModalStore } from '~/stores/modal';
import { useTeacherStore } from '~/stores/teacher';

const modalStore = useModalStore();
const teacherStore = useTeacherStore();

var firstname = ref('');
var lastname = ref('');
var action = ref('Ajouter')

const emit = defineEmits(['fetchTeachers']);

onMounted(async () => {
    if (modalStore.teacher_id !== '') {
        await teacherStore.fetchTeacher(modalStore.teacher_id);
        action.value = 'Modifier';
        firstname.value = teacherStore.teacher.firstname;
        lastname.value = teacherStore.teacher.lastname;
    }
})

const confirm = async () => {

    const teacherData = {
        firstname: firstname.value,
        lastname: lastname.value,
    }

    if (modalStore.teacher_id == '') {
        await teacherStore.createTeacher(teacherData);
    } else {
        await teacherStore.updateTeacher(modalStore.teacher_id, teacherData);
    }

    modalStore.hideModal();
    emit('fetchTeachers');
}

</script>