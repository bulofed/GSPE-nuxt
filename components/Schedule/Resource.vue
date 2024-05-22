<template>
  <li>
    <div class="flex justify-start py-2">
      <p class="text-left grow">{{ resource.name }}</p>
      <div class="flex flex-col grow">
        <div
          v-for="lesson in resource.lessons"
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
resource: {
  type: Object,
  default: () => ({})
}
})
</script>