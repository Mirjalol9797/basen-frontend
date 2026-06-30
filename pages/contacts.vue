<template>
  <div class="container py-10 sm:py-14 max-w-2xl">

    <!-- Header -->
    <div class="mb-10">
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{{ $t('contacts.title') }}</h1>
      <p class="text-gray-500 text-lg">{{ $t('contacts.subtitle') }}</p>
    </div>

    <!-- Description -->
    <p class="text-gray-600 leading-relaxed mb-10">{{ $t('contacts.desc') }}</p>

    <!-- Contact cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">

      <!-- Phone -->
      <a
        href="tel:+998916036765"
        class="group flex items-center gap-4 bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-200 border border-gray-100"
      >
        <div class="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
          <svg class="w-6 h-6 text-primary-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </div>
        <div>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{{ $t('contacts.phone_label') }}</p>
          <p class="text-base font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">+998 91 603-67-65</p>
        </div>
      </a>

      <!-- Telegram -->
      <a
        href="https://t.me/Mirjalol1210"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex items-center gap-4 bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-200 border border-gray-100"
      >
        <div class="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center shrink-0 group-hover:bg-sky-100 transition-colors">
          <svg class="w-6 h-6 text-sky-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.1 13.116l-2.94-.916c-.64-.203-.658-.64.135-.954l11.566-4.461c.537-.194 1.006.131.833.436z"/>
          </svg>
        </div>
        <div>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{{ $t('contacts.telegram_label') }}</p>
          <p class="text-base font-semibold text-gray-900 group-hover:text-sky-500 transition-colors">@Mirjalol1210</p>
        </div>
      </a>
    </div>

    <!-- Pool owners CTA -->
    <div class="bg-gradient-to-br from-primary-50 to-sky-50 rounded-2xl p-6 border border-primary-100">
      <h2 class="text-lg font-bold text-gray-900 mb-2">{{ $t('contacts.owners_title') }}</h2>
      <p class="text-gray-600 text-sm leading-relaxed mb-4">{{ $t('contacts.owners_text') }}</p>
      <a
        href="https://t.me/Mirjalol1210"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-150"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.1 13.116l-2.94-.916c-.64-.203-.658-.64.135-.954l11.566-4.461c.537-.194 1.006.131.833.436z"/>
        </svg>
        Написать в Telegram
      </a>
    </div>

  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

usePageSeo({
  title: t('contacts.meta_title'),
  description: t('contacts.meta_desc'),
  canonical: '/contacts',
})
</script>
