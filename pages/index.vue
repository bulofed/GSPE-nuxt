<script lang="ts" setup>

import Teacher from "~/components/Teacher/Teacher.vue";
import Schedule from "~/components/Schedule/Schedule.vue";

definePageMeta({
  middleware: "auth"
})

const { data } = useAuth();
</script>

<template>
  <div class="flex items-center">
    <h1 class="text-xl font-bold">Bienvenue {{ (data?.user as any)?.username }}</h1>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
    <Schedule />
    <Teacher />
  </div>
</template>

<style></style>
