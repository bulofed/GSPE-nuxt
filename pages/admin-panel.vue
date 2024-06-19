<template>
  <div>
    <h1>Panel Administrateur</h1>
    <ul>
      <li v-for="user in users" :key="user._id?.toString()">
        {{ user.username }} - Admin: {{ user.isAdmin ? 'Oui' : 'Non' }}
        <button @click="toggleAdmin(user)">Toggle Admin</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

import type { IUser } from '~/types';

const userStore = useUserStore();

const users = ref<IUser[]>([]);

onMounted(async () => {
  users.value = await userStore.fetchUsers();
});

const toggleAdmin = async (user: IUser) => {
  await userStore.toggleAdmin(user);
};
</script>