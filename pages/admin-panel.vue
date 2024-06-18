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

const users = ref<IUser[]>([]);

onMounted(async () => {
  const { data } = await useFetch('/api/user');
  users.value = data.value as IUser[];
});

const toggleAdmin = async (user: IUser) => {
  await fetch(`/api/users/${user._id}/toggle-admin`, {
    method: 'POST',
  });
  user.isAdmin = !user.isAdmin;
};
</script>