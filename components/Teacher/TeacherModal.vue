<template>
    <div 
        class="fixed inset-0 overflow-y-hidden bg-black bg-opacity-50 backdrop-blur-sm"
        @click.self="modalStore.hideModal"
    >
        <div 
            class="flex items-start justify-center min-h-screen mt-24 text-center"
            @click.self="modalStore.hideModal"
        >
            <div
                class="bg-white text-black rounded-lg text-center shadow-xl p-6 max-w-fit"
                role="dialog"
                aria-modal="true"
            >
                <div class="flex justify-center py-4 gap-4">
                    <TeacherForm />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { useModalStore } from '~/stores/modal';

import TeacherForm from './TeacherForm.vue'

const modalStore = useModalStore()

</script>