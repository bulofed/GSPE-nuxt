<template>
    <div class="flex flex-col items-center justify-center">
        <h1 class="text-2xl font-bold text-black">Ajouter un enseignant</h1>
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
                @click="addTeacher"
                type="button"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Ajouter
            </button>
        </form>
    </div>
</template>

<script setup>

import { useModal } from '~/composables/useModal';

const modal = useModal();

var firstname = ref('');
var lastname = ref('');

const emit = defineEmits(['fetchTeachers']);

const addTeacher = async () => {

const teacher = {
  firstname: firstname.value,
  lastname: lastname.value,
};

await $fetch('/api/teacher/add', {
  method: 'POST',
  body: JSON.stringify(teacher),
});

modal.hideModal();
emit('fetchTeachers');
}

</script>