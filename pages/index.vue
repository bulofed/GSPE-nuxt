<script lang="ts" setup>

import Teacher from "~/components/Teacher/Teacher.vue";
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
    <Teacher />
  </div>
</template>

<style></style>
