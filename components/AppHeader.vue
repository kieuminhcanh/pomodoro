<script lang="ts" setup>
  const appSettings = useSettingsStore()
</script>

<template>
  <header class="fixed top-0 right-0 z-40">
    <nav class="flex flex-wrap items-center justify-end mx-auto p-4">
      <UButton icon="i-heroicons-cog-8-tooth" color="gray" variant="ghost" @click="appSettings.toggleDrawer()" />
    </nav>
  </header>


</template>
