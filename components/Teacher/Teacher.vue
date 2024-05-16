<script lang="ts" setup>

import { useModalStore } from '~/stores/modal';

import TeacherModal from './TeacherModal.vue';
import TeacherList from './TeacherList.vue';

const modalStore = useModalStore();

</script>

<template>
  <div class="border rounded-xl text-center overflow-auto max-w-sm dark:border-slate-900/50 bg-slate-100 dark:bg-slate-700">
    <TeacherList />
    <Teleport to="#modal">
      <Transition>
        <TeacherModal
          v-if="modalStore.show"
          @close="modalStore.hideModal"
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