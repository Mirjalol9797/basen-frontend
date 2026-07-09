<template>
  <section class="py-12 sm:py-16 bg-white">
    <div class="container">
      <div class="mb-8 text-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">{{ $t('home.why_us_title') }}</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div
          v-for="key in items"
          :key="key"
          class="flex items-center gap-3 p-4 rounded-2xl bg-primary-50/60"
        >
          <span class="shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center">
            <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
          </span>
          <span class="text-sm font-medium text-gray-800">{{ $t(`home.${key}`) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const items = ['why_us_1', 'why_us_2', 'why_us_3', 'why_us_4', 'why_us_5', 'why_us_6', 'why_us_7']
</script>
