<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white py-14 sm:py-20">
      <div class="container text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-sm mb-5">
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
          </svg>
          Basen.uz
        </div>
        <h1 class="text-3xl sm:text-4xl font-bold mb-3">{{ $t('about.title') }}</h1>
        <p class="text-primary-100 text-lg">{{ $t('about.subtitle') }}</p>
      </div>
    </section>

    <div class="container py-12 sm:py-16 space-y-16">

      <!-- Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="bg-white rounded-2xl shadow-card p-5 text-center"
        >
          <div class="text-3xl font-bold text-primary-600 mb-1">{{ stat.value }}</div>
          <div class="text-sm text-gray-500">{{ stat.label }}</div>
        </div>
      </div>

      <!-- What is basen.uz -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ $t('about.what_title') }}</h2>
          <p class="text-gray-600 leading-relaxed mb-5">{{ $t('about.what_text') }}</p>
          <h3 class="text-lg font-bold text-gray-900 mb-2">{{ $t('about.mission_title') }}</h3>
          <p class="text-gray-600 leading-relaxed">{{ $t('about.mission_text') }}</p>
        </div>

        <!-- Icon illustration -->
        <div class="flex justify-center lg:justify-end">
          <div class="w-64 h-64 rounded-4xl bg-gradient-to-br from-primary-100 to-aqua-100 flex items-center justify-center">
            <svg class="w-32 h-32 text-primary-400" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="30" width="60" height="32" rx="6" fill="currentColor" fill-opacity="0.2"/>
              <rect x="10" y="30" width="60" height="10" rx="4" fill="currentColor" fill-opacity="0.4"/>
              <path d="M10 47c5-3 10-3 15 0s10 3 15 0 10-3 15 0 10 3 15 0" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M10 54c5-3 10-3 15 0s10 3 15 0 10-3 15 0 10 3 15 0" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              <circle cx="40" cy="18" r="8" fill="currentColor" fill-opacity="0.3"/>
              <path d="M36 18h8M40 14v8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- How it works -->
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">{{ $t('about.how_title') }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            v-for="step in howSteps"
            :key="step.num"
            class="bg-white rounded-2xl shadow-card p-6 text-center"
          >
            <div class="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
              <component :is="step.icon" class="w-6 h-6 text-primary-600" />
            </div>
            <div class="w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center mx-auto mb-3">
              {{ step.num }}
            </div>
            <h3 class="font-bold text-gray-900 mb-2">{{ step.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ step.text }}</p>
          </div>
        </div>
      </div>

      <!-- For pool owners -->
      <div class="bg-gradient-to-br from-primary-600 to-primary-800 rounded-4xl p-8 sm:p-12 text-white text-center relative overflow-hidden">
        <div class="absolute -right-12 -top-12 w-48 h-48 bg-aqua-400/20 rounded-full pointer-events-none" />
        <div class="relative z-10">
          <h2 class="text-2xl sm:text-3xl font-bold mb-3">{{ $t('about.owners_title') }}</h2>
          <p class="text-primary-100 mb-7 max-w-lg mx-auto">{{ $t('about.owners_text') }}</p>
          <a
            href="https://t.me/basenuz"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-primary-700 font-semibold text-sm hover:bg-primary-50 transition-colors shadow-lg"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.01 9.47c-.148.67-.537.833-1.088.52l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.67 14.28l-2.95-.924c-.642-.2-.655-.642.134-.953l11.503-4.437c.534-.194 1.001.13.205.282z"/>
            </svg>
            {{ $t('about.owners_cta') }}
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'

const { t } = useI18n()
const localePath = useLocalePath()
const poolsStore = usePoolsStore()

usePageSeo({
  title: t('about.meta_title'),
  description: t('about.meta_desc'),
  canonical: '/about',
})

const stats = computed(() => [
  { value: (poolsStore.all.length || 50) + '+', label: t('about.stat_pools') },
  { value: '6',                                  label: t('about.stat_types') },
  { value: '11',                                 label: t('about.stat_districts') },
  { value: t('about.stat_free'),                 label: '' },
])

const SearchIcon = defineComponent({
  render: () => h('svg', { viewBox: '0 0 20 20', fill: 'currentColor' }, [
    h('path', { 'fill-rule': 'evenodd', d: 'M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z', 'clip-rule': 'evenodd' }),
  ]),
})

const InfoIcon = defineComponent({
  render: () => h('svg', { viewBox: '0 0 20 20', fill: 'currentColor' }, [
    h('path', { 'fill-rule': 'evenodd', d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z', 'clip-rule': 'evenodd' }),
  ]),
})

const PhoneIcon = defineComponent({
  render: () => h('svg', { viewBox: '0 0 20 20', fill: 'currentColor' }, [
    h('path', { d: 'M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' }),
  ]),
})

const howSteps = computed(() => [
  { num: 1, icon: SearchIcon, title: t('about.how_step1_title'), text: t('about.how_step1_text') },
  { num: 2, icon: InfoIcon,   title: t('about.how_step2_title'), text: t('about.how_step2_text') },
  { num: 3, icon: PhoneIcon,  title: t('about.how_step3_title'), text: t('about.how_step3_text') },
])
</script>
