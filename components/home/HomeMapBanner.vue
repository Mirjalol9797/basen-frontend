<template>
  <section class="py-12 sm:py-16 bg-gray-50">
    <div class="container">
      <div class="relative overflow-hidden rounded-4xl bg-gradient-to-br from-primary-700 via-primary-800 to-aqua-600 px-8 py-12 sm:px-12 sm:py-16 text-white">

        <!-- Decorative circles -->
        <div class="absolute -right-16 -top-16 w-64 h-64 bg-aqua-400/20 rounded-full pointer-events-none" />
        <div class="absolute -left-8 -bottom-8 w-48 h-48 bg-primary-900/30 rounded-full pointer-events-none" />
        <div class="absolute right-1/3 top-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />

        <div class="relative z-10 flex flex-col sm:flex-row items-center gap-8 sm:gap-12">

          <!-- Map icon -->
          <div class="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/15 border border-white/25 flex items-center justify-center">
            <svg class="w-10 h-10 sm:w-12 sm:h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 6l-6 3v12l6-3m0-12l6 3m-6-3v12m6-9l6-3v12l-6 3m0-12v12" />
            </svg>
          </div>

          <!-- Text -->
          <div class="text-center sm:text-left flex-1">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs mb-3 border border-white/20">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Интерактивная карта
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold mb-2">{{ $t('home.map_preview_title') }}</h2>
            <p class="text-primary-100 text-sm sm:text-base">
              Найдите ближайший бассейн — просматривайте на карте с фильтрами по типу и режиму работы
            </p>
          </div>

          <!-- CTA -->
          <NuxtLink
            :to="localePath('/map')"
            class="shrink-0 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-primary-700 font-semibold text-sm hover:bg-primary-50 transition-colors duration-150 shadow-lg"
          >
            <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.157 2.175a1.5 1.5 0 00-1.147 0l-4.084 1.69A1.5 1.5 0 002 5.251v10.877a1.5 1.5 0 002.074 1.386l3.51-1.452 4.26 1.763a1.5 1.5 0 001.146 0l4.083-1.69A1.5 1.5 0 0018 14.748V3.873a1.5 1.5 0 00-2.073-1.386l-3.51 1.452-4.26-1.764zM7.5 4.683l5 2.07v8.564l-5-2.07V4.683zm-1.5.583L3.5 6.17v8.615l2.5-1.035V5.266zm8.5 8.551l-2.5 1.034V5.266l2.5-1.034v9.585z" clip-rule="evenodd" />
            </svg>
            {{ $t('home.map_preview_btn') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
