<template>
  <header class="flex justify-between w-full bg-gray-200 dark:bg-gray-900 px-5 py-2">
    <NuxtLink to="/">
      <div class="flex justify-center bg-white rounded-lg p-2 w-20">
        <img
          src="~/assets/logo_iut.png"
          alt="Logo IUT"
          class="w-12"
        />
      </div>
    </NuxtLink>
    <div class="flex items-center gap-1">
      <button class="p-2" @click="setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')">
        <Icon name="uil:sun" size="24" class="text-gray-500 dark:text-white"/>
      </button>
      <LogoutButton v-if="data?.user" />
    </div>
  </header>
</template>

<script setup lang="ts">
import LogoutButton from '~/components/elements/LogoutButton.vue'

const { data } = useAuth();

const user = useState('user')

const setColorTheme = (newTheme: string) => {
  useColorMode().preference = newTheme
}
</script>