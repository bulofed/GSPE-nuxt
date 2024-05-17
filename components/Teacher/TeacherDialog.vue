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
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
            Confirmer
        </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useRessourceModalStore } from '~/stores/ressourceModal'
import { useTeacherStore } from '~/stores/teacher'

const ressourceModalStore = useRessourceModalStore()
const teacherStore = useTeacherStore()

var firstname = ref('');
var lastname = ref('');
var action = ref('Ajouter')

onMounted(async () => {
  teacherStore.fetchTeachers()
  if (ressourceModalStore.teacher_id !== '') {
      await teacherStore.fetchTeacher(ressourceModalStore.teacher_id);
      action.value = 'Modifier';
      firstname.value = teacherStore.teacher.firstname;
      lastname.value = teacherStore.teacher.lastname;
  }
})

const confirm = async () => {

  const teacherData = {
      firstname: firstname.value,
      lastname: lastname.value,
      ressources: []
  }

  if (ressourceModalStore.teacher_id == '') {
      await teacherStore.createTeacher(teacherData);
  } else {
      await teacherStore.updateTeacher(ressourceModalStore.teacher_id, teacherData);
  }

  if (ressourceModalStore.teacher_id !== '') {
    ressourceModalStore.hideModal('editTeacher');
  } else {
    ressourceModalStore.hideModal('addTeacher');
  }
}
</script>