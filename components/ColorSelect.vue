<template>
  <USelectMenu v-model="color" :options="options" placeholder="Select a color" searchable
    searchable-placeholder="Search color" option-attribute="text" by="value" :search-attributes="['text']">
    <template #leading>
      <UIcon name="i-heroicons-swatch-solid" class="w-5 h-5" :class="color?.value ? `text-${color.value}-500` : ''" />
    </template>
    <template #label>
      <span class="block truncate capitalize">{{ color?.value || 'Select color' }}</span>
    </template>
    <template #option="{ option }">
      <span class="h-3 w-3 rounded-full " :style="{ backgroundColor: option.hex }" />
      <span class="capitalize">{{ option.text }}</span>
    </template>
  </USelectMenu>
</template>

<script setup lang="ts">
  import tailwindColors from '#tailwind-config/theme/colors'

  const props = defineProps({
    colors: {
      type: Array as PropType<string[]>,
    },
  })

  const options = computed(() => !props.colors ? useAppConfig().ui.colors
    .filter(color => color !== 'primary')
    .map(color => ({
      value: color,
      text: color,
      hex: (tailwindColors as any)[color][useColorMode().value === 'dark' ? 400 : 500]
    }))
    : props.colors.map(color => ({
      value: color,
      text: color,
      hex: (tailwindColors as any)[color][useColorMode().value === 'dark' ? 400 : 500]
    })))

  const color = defineModel({
    type: Object,
  })
</script>
