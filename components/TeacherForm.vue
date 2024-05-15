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

const modal = useModalStore();

var firstname = ref('');
var lastname = ref('');
let teacher = ref(null);
var action = ref('Ajouter')

const emit = defineEmits(['fetchTeachers']);

const fetchTeacher = async (id) => {

    const response = await $fetch(`/api/teacher/${id}`, {
        method: 'GET',
    });
    teacher.value = response.teacher;
}

onMounted(async () => {
    if (modal.teacher_id !== '') {
        await fetchTeacher(modal.teacher_id);
        action.value = 'Modifier';
        firstname.value = teacher.value.firstname;
        lastname.value = teacher.value.lastname;
    }
})

const confirm = async () => {

    const url = teacher.value && teacher.value._id ? `/api/teacher/${modal.teacher_id.value}` : '/api/teacher/add';
    const method = teacher.value && teacher.value._id ? 'PUT' : 'POST';

    const teacherData = {
        firstname: firstname.value,
        lastname: lastname.value,
    }

    await $fetch(url, {
        method: method,
        body: JSON.stringify(teacherData),
    });

    modal.hideModal();
    emit('fetchTeachers');
}

</script>