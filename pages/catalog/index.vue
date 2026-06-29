<template>
  <div class="container py-6 sm:py-8">

    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">{{ $t('catalog.title') }}</h1>
    </div>

    <!-- Sort bar -->
    <CatalogSortBar :total="total" class="mb-5" />

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

    <!-- Filter drawer -->
    <AppDrawer
      v-model="isDrawerOpen"
      :title="$t('filter.title')"
    >
      <CatalogFilters />
      <template #footer>
        <AppButton
          variant="primary"
          size="lg"
          class="w-full"
          @click="isDrawerOpen = false"
        >
          {{ $t('common.found_count', { count: total }) }}
        </AppButton>
      </template>
    </AppDrawer>

  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const poolsStore = usePoolsStore()
const uiStore = useUiStore()
const { pools, total } = usePools()

const loading = computed(() => poolsStore.all.length === 0)

const isDrawerOpen = computed({
  get: () => uiStore.isFilterDrawerOpen,
  set: (v) => v ? uiStore.openFilterDrawer() : uiStore.closeFilterDrawer(),
})

usePageSeo({
  title: t('catalog.meta_title', { count: 50 }),
  description: t('catalog.meta_desc'),
  canonical: '/catalog',
})
</script>
