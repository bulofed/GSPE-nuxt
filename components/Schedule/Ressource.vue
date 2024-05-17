<template>
  <li>
    <div class="flex justify-start">
      <p class="text-left grow">{{ ressource.name }}</p>
      <div class="flex flex-col grow">
        <div
          v-for="lesson in ressource.lessons"
          :key="lesson._id.toString()"
          class="flex flex-row justify-between"
        >
          <p>{{ lesson.name }}</p>
          <p>{{  lesson.hours }}h</p>
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
const props = defineProps({
ressource: {
  type: Object,
  default: () => ({})
}
})
</script>