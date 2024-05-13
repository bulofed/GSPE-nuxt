<script lang="ts" setup>

definePageMeta({
  middleware: "auth"
})

const { data, signOut } = useAuth();

async function handleLogout() {
  await signOut();
}
</script>

<template>
  <div class="flex items-center justify-between">
    <h1 class="text-xl font-bold">Bienvenue {{ (data?.user as any)?.username }}</h1>
    <button
      type="button"
      class="bg-red-500 hover:bg-red-600 transition-all duration-200 text-red-50 rounded-lg py-2 px-5"
      @click="handleLogout"
    >
      Déconnexion
    </button>
  </div>
</template>

<style></style>
