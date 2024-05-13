<template>
  <div class="h-screen flex items-center justify-center bg-gray-100">
    <div
      class="p-5 rounded-xl bg-white flex-1 text-center border shadow-2xl"
      :class="maxWidthClass"
    >
      <NuxtPage />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    maxWidthClass() {
      switch (this.$route.name) {
        case 'login':
        case 'register':
          return 'max-w-2xl';
        case 'index':
          return 'max-w-screen-2xl mx-5';
        default:
          return '';
      }
    },
  },
};
</script>