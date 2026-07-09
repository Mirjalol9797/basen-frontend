<template>
  <section class="py-12 sm:py-16 bg-white">
    <div class="container">
      <div class="mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">{{ $t('home.top_rated_title') }}</h2>
        <p class="text-gray-500 mt-1">{{ $t('home.top_rated_subtitle') }}</p>
      </div>
    </div>

    <div class="relative">
      <!-- Prev/next (desktop) -->
      <button
        type="button"
        class="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-card items-center justify-center text-gray-500 hover:text-primary-600 transition-colors"
        :aria-label="$t('common.show_all')"
        @click="scrollBy(-1)"
      >
        <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 010 1.06L8.832 10l3.958 3.71a.75.75 0 11-1.02 1.1l-4.5-4.25a.75.75 0 010-1.1l4.5-4.25a.75.75 0 011.02.02z" clip-rule="evenodd" />
        </svg>
      </button>
      <button
        type="button"
        class="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-card items-center justify-center text-gray-500 hover:text-primary-600 transition-colors"
        :aria-label="$t('common.show_all')"
        @click="scrollBy(1)"
      >
        <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 010-1.06L11.168 10 7.21 6.29a.75.75 0 111.02-1.1l4.5 4.25a.75.75 0 010 1.1l-4.5 4.25a.75.75 0 01-1.02-.02z" clip-rule="evenodd" />
        </svg>
      </button>

      <div
        ref="scroller"
        class="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 sm:px-6 lg:px-8 pb-2"
      >
        <div
          v-for="(pool, i) in topPools"
          :key="pool.id"
          class="relative shrink-0 w-64 sm:w-72 snap-start"
        >
          <span
            class="absolute -top-2 -left-2 z-10 w-8 h-8 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center shadow-card"
          >
            {{ i + 1 }}
          </span>
          <PoolCard :pool="pool" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const poolsStore = usePoolsStore()

const topPools = computed(() =>
  [...poolsStore.all]
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, 10)
)

const scroller = ref<HTMLElement | null>(null)

const scrollBy = (dir: 1 | -1) => {
  scroller.value?.scrollBy({ left: dir * 300, behavior: 'smooth' })
}
</script>
