<template>
  <section class="py-12 sm:py-16">
    <div class="container">
      <div class="mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">{{ $t('home.faq_title') }}</h2>
      </div>

      <div class="space-y-2.5 max-w-3xl">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="bg-white rounded-xl border border-gray-100 overflow-hidden"
        >
          <button
            type="button"
            class="w-full flex items-center justify-between gap-4 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors duration-150"
            :aria-expanded="openIndex === index"
            @click="openIndex = openIndex === index ? null : index"
          >
            <span class="font-medium text-gray-900 text-sm leading-snug">{{ item.q }}</span>
            <svg
              class="w-4 h-4 shrink-0 text-primary-600 transition-transform duration-200"
              :class="{ 'rotate-180': openIndex === index }"
              viewBox="0 0 20 20" fill="currentColor"
            >
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
          <div v-if="openIndex === index" class="px-4 pb-3.5 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-3">
            {{ item.a }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ faqItems: { q: string; a: string }[] }>()

const openIndex = ref<number | null>(null)
</script>
