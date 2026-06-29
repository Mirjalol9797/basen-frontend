<template>
  <div>
    <!-- Hero -->
    <section class="bg-gray-900 text-white py-14 sm:py-20">
      <div class="container text-center">
        <h1 class="text-3xl sm:text-4xl font-bold mb-3">{{ $t('faq.title') }}</h1>
        <p class="text-gray-300 text-lg">{{ $t('faq.subtitle') }}</p>
      </div>
    </section>

    <div class="container py-12 sm:py-16 max-w-3xl mx-auto">

      <!-- FAQ Items -->
      <div class="space-y-3">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="bg-white rounded-2xl shadow-card overflow-hidden"
        >
          <button
            class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors duration-150"
            :aria-expanded="openIndex === index"
            @click="toggle(index)"
          >
            <span class="font-semibold text-gray-900 text-sm sm:text-base leading-snug">
              {{ item.q }}
            </span>
            <span
              class="shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center transition-transform duration-200"
              :class="{ 'rotate-180 bg-primary-600': openIndex === index }"
            >
              <svg
                class="w-3.5 h-3.5 transition-colors"
                :class="openIndex === index ? 'text-white' : 'text-primary-600'"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
              </svg>
            </span>
          </button>

          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-96"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 max-h-96"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-if="openIndex === index" class="overflow-hidden">
              <p class="px-6 pb-5 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                {{ item.a }}
              </p>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Still have questions -->
      <div class="mt-12 bg-primary-50 rounded-2xl p-8 text-center border border-primary-100">
        <div class="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 5.25a2.75 2.75 0 00-2.75-2.75h-8.5A2.75 2.75 0 004 5.25v5.5a2.75 2.75 0 002.75 2.75H8.5v2.5a.75.75 0 001.28.53l2.97-2.97h2.5A2.75 2.75 0 0018 10.75v-5.5z" clip-rule="evenodd" />
          </svg>
        </div>
        <h2 class="font-bold text-gray-900 mb-2">Остались вопросы?</h2>
        <p class="text-sm text-gray-500 mb-5">Напишите нам — ответим быстро</p>
        <a
          href="https://t.me/basenuz"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0088cc] text-white text-sm font-semibold hover:bg-[#0077b3] transition-colors"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.01 9.47c-.148.67-.537.833-1.088.52l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.67 14.28l-2.95-.924c-.642-.2-.655-.642.134-.953l11.503-4.437c.534-.194 1.001.13.205.282z"/>
          </svg>
          Telegram
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

usePageSeo({
  title: t('faq.meta_title'),
  description: t('faq.meta_desc'),
  canonical: '/faq',
})

const faqItems = computed(() => [
  { q: t('faq.q1'), a: t('faq.a1') },
  { q: t('faq.q2'), a: t('faq.a2') },
  { q: t('faq.q3'), a: t('faq.a3') },
  { q: t('faq.q4'), a: t('faq.a4') },
  { q: t('faq.q5'), a: t('faq.a5') },
  { q: t('faq.q6'), a: t('faq.a6') },
])

const openIndex = ref<number | null>(0)

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>
