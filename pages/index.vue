<script lang="ts" setup>

import TeacherModule from "~/components/Teacher/TeacherModule.vue";
import ScheduleModule from "~/components/Schedule/ScheduleModule.vue";

definePageMeta({
  middleware: "auth"
})

const { data } = useAuth();

useSeoMeta({
  title: 'GSPE',
})

useHead({
  htmlAttrs: {
    lang: 'fr'
  },
})
</script>

<template>
  <div class="flex justify-center">
    <h1 class="text-xl font-bold dark:text-slate-100 text-slate-500">Bienvenue {{ (data?.user as any)?.username }}</h1>
  </div>
  <div class="flex items-start content-start flex-col md:flex-row gap-4 mt-4">
    <ScheduleModule />
    <TeacherModule />
  </div>
</template>

<style></style>
