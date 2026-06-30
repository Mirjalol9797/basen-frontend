<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-br from-gray-800 via-gray-900 to-primary-900 text-white py-12 sm:py-16">
      <div class="container text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm mb-5">
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
          </svg>
          Basen.uz
        </div>
        <h1 class="text-3xl sm:text-4xl font-bold mb-3">{{ $t('privacy.title') }}</h1>
        <p class="text-gray-300 text-base">{{ $t('privacy.updated') }}</p>
      </div>
    </section>

    <div class="container py-10 sm:py-14 max-w-3xl">
      <div class="space-y-8">

        <!-- Section 1 -->
        <section class="bg-white rounded-2xl shadow-card p-6 sm:p-8">
          <h2 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center shrink-0">1</span>
            {{ $t('privacy.s1_title') }}
          </h2>
          <p class="text-gray-600 leading-relaxed text-sm">{{ $t('privacy.s1_text') }}</p>
        </section>

        <!-- Section 2 -->
        <section class="bg-white rounded-2xl shadow-card p-6 sm:p-8">
          <h2 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center shrink-0">2</span>
            {{ $t('privacy.s2_title') }}
          </h2>
          <p class="text-gray-600 leading-relaxed text-sm mb-5">{{ $t('privacy.s2_text') }}</p>

          <div class="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <h3 class="text-sm font-semibold text-amber-800 mb-1.5 flex items-center gap-1.5">
              <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a.75.75 0 01.75.75v.258a33.186 33.186 0 016.668 1.718.75.75 0 11-.499 1.416A32.016 32.016 0 0010 4.5c-2.29 0-4.554.27-6.919.642A.75.75 0 012.582 3.71a33.217 33.217 0 016.668-1.718V2.75A.75.75 0 0110 2zM4.42 6.032c-.462.148-.94.298-1.42.448v6.518c0 .957 1.51 1.844 4 2.32V14c0-.828.672-1.5 1.5-1.5h3c.828 0 1.5.672 1.5 1.5v1.318c2.49-.476 4-1.363 4-2.32V6.48a47.81 47.81 0 01-1.42-.448A3 3 0 0113 8.5H7a3 3 0 01-2.58-2.468z" />
              </svg>
              {{ $t('privacy.s2_cookie_title') }}
            </h3>
            <p class="text-amber-700 text-sm leading-relaxed">{{ $t('privacy.s2_cookie_text') }}</p>
          </div>
        </section>

        <!-- Section 3 -->
        <section class="bg-white rounded-2xl shadow-card p-6 sm:p-8">
          <h2 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center shrink-0">3</span>
            {{ $t('privacy.s3_title') }}
          </h2>
          <p class="text-gray-600 text-sm mb-4">{{ $t('privacy.s3_text') }}</p>

          <ul class="space-y-3">
            <li class="flex items-start gap-3 text-sm text-gray-600">
              <svg class="w-4 h-4 mt-0.5 text-primary-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              <span><strong class="text-gray-800">OpenStreetMap / Leaflet</strong> — {{ $t('privacy.s3_maps') }}</span>
            </li>
            <li class="flex items-start gap-3 text-sm text-gray-600">
              <svg class="w-4 h-4 mt-0.5 text-primary-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
              </svg>
              <span><strong class="text-gray-800">Google Fonts</strong> — {{ $t('privacy.s3_fonts') }}</span>
            </li>
            <li class="flex items-start gap-3 text-sm text-gray-600">
              <svg class="w-4 h-4 mt-0.5 text-primary-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <span><strong class="text-gray-800">Яндекс.Метрика / Google Analytics</strong> — {{ $t('privacy.s3_analytics') }}</span>
            </li>
          </ul>
        </section>

        <!-- Section 4 -->
        <section class="bg-white rounded-2xl shadow-card p-6 sm:p-8">
          <h2 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center shrink-0">4</span>
            {{ $t('privacy.s4_title') }}
          </h2>
          <p class="text-gray-600 leading-relaxed text-sm">{{ $t('privacy.s4_text') }}</p>
        </section>

        <!-- Section 5 -->
        <section class="bg-white rounded-2xl shadow-card p-6 sm:p-8">
          <h2 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center shrink-0">5</span>
            {{ $t('privacy.s5_title') }}
          </h2>
          <p class="text-gray-600 leading-relaxed text-sm">{{ $t('privacy.s5_text') }}</p>
        </section>

        <!-- Section 6 -->
        <section class="bg-white rounded-2xl shadow-card p-6 sm:p-8">
          <h2 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center shrink-0">6</span>
            {{ $t('privacy.s6_title') }}
          </h2>
          <p class="text-gray-600 leading-relaxed text-sm">{{ $t('privacy.s6_text') }}</p>
        </section>

        <!-- Section 7 -->
        <section class="bg-white rounded-2xl shadow-card p-6 sm:p-8">
          <h2 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center shrink-0">7</span>
            {{ $t('privacy.s7_title') }}
          </h2>
          <p class="text-gray-600 leading-relaxed text-sm">{{ $t('privacy.s7_text') }}</p>
        </section>

        <!-- Section 8: Contact -->
        <section class="bg-gradient-to-br from-primary-50 to-sky-50 rounded-2xl border border-primary-100 p-6 sm:p-8">
          <h2 class="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center shrink-0">8</span>
            {{ $t('privacy.s8_title') }}
          </h2>
          <p class="text-gray-600 text-sm mb-4">{{ $t('privacy.s8_text') }}</p>
          <NuxtLink
            :to="localePath('/contacts')"
            class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-150"
          >
            <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {{ $t('privacy.contact_link') }}
          </NuxtLink>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

usePageSeo({
  title: t('privacy.meta_title'),
  description: t('privacy.meta_desc'),
  canonical: '/privacy',
})
</script>
