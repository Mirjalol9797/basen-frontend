<template>
  <div class="relative w-full h-full overflow-hidden bg-gray-900 flex items-center justify-center">
    <!-- Blurred fill (hides letterbox edges, disguises low source resolution) -->
    <NuxtImg
      :src="src"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-50"
      loading="lazy"
    />
    <!-- Crisp foreground, shown at its natural size so it's never upscaled/blurred -->
    <NuxtImg
      :src="src"
      :alt="alt"
      class="relative z-10 max-w-full max-h-full w-auto h-auto object-contain"
      :priority="priority"
      :loading="priority ? undefined : 'lazy'"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt: string
  priority?: boolean
}>()
</script>
