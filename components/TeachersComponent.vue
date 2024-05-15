<script lang="ts" setup>

import type { ITeacher } from '~/types';
import { fetchTeachers } from '~/composables/teacherServices';

import { useModalStore } from '~/stores/modal';

import TeacherModal from './TeacherModal.vue';
import TeacherList from './TeacherList.vue';

const modalStore = useModalStore();

const teachers = ref<ITeacher[]>([])

const loadTeachers = async () => {
  teachers.value = await fetchTeachers();
};

onMounted(loadTeachers);

</script>

<template>
  <div class="border rounded-xl text-center overflow-hidden">
    <TeacherList :teachers="teachers" />
    <Teleport to="#modal">
      <Transition>
        <TeacherModal
          v-if="modalStore.show"
          @close="modalStore.hideModal"
          @fetch-teachers="loadTeachers"
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