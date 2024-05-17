<script lang="ts" setup>

import TeacherList from "~/components/Teacher/TeacherList.vue";
import Schedule from "~/components/Schedule/Schedule.vue";

definePageMeta({
  middleware: "auth"
})

const { data } = useAuth();
</script>

<template>
  <div class="flex justify-center">
    <h1 class="text-xl font-bold dark:text-slate-100 text-slate-500">Bienvenue {{ (data?.user as any)?.username }}</h1>
  </div>
  <div class="flex items-start content-start flex-col md:flex-row gap-4 mt-4">
    <Schedule />
    <TeacherList />
  </div>
</template>

<style></style>
