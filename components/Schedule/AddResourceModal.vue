<template>
  <div class="flex flex-col items-center justify-center">
    <DialogTitle
      as="h2"
      class="text-2xl font-bold text-black"
    >
      Ajouter une ressource
    </DialogTitle>
    <div class="mt-2">
      <p 
      v-for="resource in resourceList"
      class="text-sm text-gray-500">
        {{ resource }}
      </p>
    </div>

    <div class="mt-4">
      <button
        type="button"
        class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        @click="hideModal"
      >
        Got it, thanks!
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
let modalStore = useModalStore()
let teacherStore = useTeacherStore()

const props = defineProps({
  modalName: String
})

const hideModal = () => {
  if (props.modalName) {
    modalStore.hideModal(props.modalName)
  }
}

let resourceList = await teacherStore.fetchAllTeachersResources()
</script>