<template>
  <div class="container py-6 sm:py-8">

    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">{{ $t('catalog.title') }}</h1>
    </div>

    <!-- Category links -->
    <CatalogCategoryLinks />

    <!-- Sort bar -->
    <CatalogSortBar :total="total" class="mb-5" />

    <!-- Inline filter panel -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out overflow-hidden"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-[800px] opacity-100"
      leave-active-class="transition-all duration-150 ease-in overflow-hidden"
      leave-from-class="max-h-[800px] opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div v-if="isFilterOpen" class="mb-5 bg-gray-50 rounded-2xl border border-gray-100 p-5">
        <CatalogFilters />
      </div>
    </Transition>

    <!-- Skeletons while loading -->
    <div
      v-if="loading"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
    >
      <PoolCardSkeleton v-for="i in 6" :key="i" />
    </div>

    <!-- Pool grid -->
    <template v-else>
      <div
        v-if="pools.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <PoolCard
          v-for="pool in pools"
          :key="pool.id"
          :pool="pool"
        />
      </div>
      <CatalogEmptyState v-else />
    </template>

  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const poolsStore = usePoolsStore()
const uiStore = useUiStore()
const { pools, total } = usePools()

const loading = computed(() => poolsStore.all.length === 0)

const isFilterOpen = computed({
  get: () => uiStore.isFilterDrawerOpen,
  set: (v) => v ? uiStore.openFilterDrawer() : uiStore.closeFilterDrawer(),
})

usePageSeo({
  title: t('catalog.meta_title', { count: 50 }),
  description: t('catalog.meta_desc'),
  canonical: '/catalog',
})
</script>
