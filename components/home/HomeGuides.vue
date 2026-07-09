<template>
  <section v-if="guides.length > 0" class="py-12 sm:py-16 bg-white">
    <div class="container">
      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">{{ $t('home.guides_title') }}</h2>
          <p class="text-gray-500 mt-1">{{ $t('home.guides_subtitle') }}</p>
        </div>
        <NuxtLink
          :to="localePath('/guide')"
          class="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          {{ $t('common.show_all') }}
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
          </svg>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <NuxtLink
          v-for="g in latestGuides"
          :key="g.slug"
          :to="localePath(`/guide/${g.slug}`)"
          class="group block bg-gray-50 rounded-2xl hover:shadow-card-hover transition-all duration-200 p-5 border border-gray-100"
        >
          <h3 class="font-bold text-gray-900 mb-2 text-sm leading-snug group-hover:text-primary-600 transition-colors">
            {{ g.title }}
          </h3>
          <p class="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-3">{{ g.excerpt }}</p>
          <span class="text-xs font-semibold text-primary-600">{{ $t('guide.read_more') }} →</span>
        </NuxtLink>
      </div>

      <!-- Mobile "show all" -->
      <div class="mt-8 text-center sm:hidden">
        <NuxtLink
          :to="localePath('/guide')"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-primary-200 text-primary-700 font-medium text-sm hover:bg-primary-50 transition-colors"
        >
          {{ $t('common.show_all') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { guides } = useGuides()

const latestGuides = computed(() => guides.value.slice(0, 4))
</script>
