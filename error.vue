<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <LayoutAppHeader />

    <main class="flex-1 flex items-center justify-center px-4 py-16">
      <div class="text-center max-w-md">

        <!-- Pool SVG illustration -->
        <div class="w-32 h-32 mx-auto mb-6 rounded-4xl bg-gradient-to-br from-primary-100 to-aqua-100 flex items-center justify-center">
          <svg class="w-16 h-16 text-primary-400" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="28" width="48" height="22" rx="5" fill="currentColor" fill-opacity="0.2"/>
            <path d="M8 38c4-3 8-3 12 0s8 3 12 0 8-3 12 0 8 3 12 0" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M8 45c4-3 8-3 12 0s8 3 12 0 8-3 12 0 8 3 12 0" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="32" cy="16" r="8" fill="currentColor" fill-opacity="0.25"/>
            <path d="M32 11v10M27 16h10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        </div>

        <!-- Status code -->
        <div class="text-7xl sm:text-8xl font-bold text-primary-200 mb-2 tabular-nums leading-none">
          {{ error?.statusCode ?? 404 }}
        </div>

        <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          {{ error?.statusCode === 500 ? 'Ошибка сервера' : $t('errors.not_found') }}
        </h1>
        <p class="text-gray-400 mb-8">
          {{ error?.statusCode === 500 ? 'Что-то пошло не так. Попробуйте позже.' : $t('errors.not_found_desc') }}
        </p>

        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <NuxtLink
            :to="localePath('/')"
            class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold text-sm hover:bg-primary-700 transition-colors"
            @click="clearError"
          >
            <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clip-rule="evenodd" />
            </svg>
            {{ $t('errors.go_home') }}
          </NuxtLink>

          <NuxtLink
            :to="localePath('/catalog')"
            class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-100 transition-colors"
            @click="clearError"
          >
            {{ $t('errors.go_catalog') }}
          </NuxtLink>
        </div>
      </div>
    </main>

    <LayoutAppFooter />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError | null
}>()

const localePath = useLocalePath()

const clearError = () => useError().value = null
</script>
