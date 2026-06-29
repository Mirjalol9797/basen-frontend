<template>
  <div class="flex flex-col items-center justify-center py-20 text-center">
    <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
      <svg class="w-10 h-10 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
      </svg>
    </div>
    <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ $t('common.no_results') }}</h3>
    <p class="text-sm text-gray-400 mb-6 max-w-xs">{{ $t('common.no_results_desc') }}</p>
    <AppButton variant="secondary" @click="reset()">
      {{ $t('common.reset_filters') }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
const { reset } = useFilters()
</script>
