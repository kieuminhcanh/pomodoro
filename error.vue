<script setup lang="ts">
  import type { NuxtError } from '#app'

  defineProps({
    error: Object as () => NuxtError
  })

  const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <UContainer>
    <UCard>
      <template #header>
        <h1 class="text-2xl">Error: {{ error?.statusCode }}</h1>
      </template>

      <p>{{ error?.message }}</p>

      <template #footer>
        <UButton @click="handleError" aria-label="Home">Back to Home</UButton>
      </template>
    </UCard>
  </UContainer>
</template>
