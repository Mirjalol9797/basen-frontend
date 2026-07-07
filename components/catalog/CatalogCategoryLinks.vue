<template>
  <div class="mb-6 -mx-4 sm:mx-0 overflow-x-auto">
    <div class="flex gap-2 px-4 sm:px-0 sm:flex-wrap">
      <NuxtLink
        v-for="cat in categories"
        :key="cat.id"
        :to="localePath(`/category/${cat.id}`)"
        class="flex items-center gap-2 shrink-0 whitespace-nowrap px-4 py-2.5 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-colors duration-150"
      >
        <svg
          class="w-4 h-4 shrink-0"
          :style="{ color: cat.color }"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path :d="categoryIconPaths[cat.icon] ?? categoryIconPaths.default" />
        </svg>
        {{ cat.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { categories } = useCategories()
</script>
