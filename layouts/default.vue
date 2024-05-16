<script lang="ts" setup>

import Header from '~/components/layout/navbar.vue'

</script>

<template>
    <div class="h-screen flex flex-col">
        <Header />
        <div class="flex items-center justify-center bg-gray-100 dark:bg-gray-800 flex-grow">
            <div class="p-5 rounded-xl bg-white flex-1 text-center border shadow-2xl mx-6 max-w-fit">
                <slot />
            </div>
        </div>
        <div id="modal"></div>
    </div>
</template>