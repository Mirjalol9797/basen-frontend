<template>
  <div class="flex h-[calc(100vh-4rem)] overflow-hidden">

    <!-- Sidebar (desktop) -->
    <div class="hidden lg:flex flex-col w-80 xl:w-96 shrink-0">
      <MapSidebar
        :pools="poolsStore.all"
        :active-pool-id="activePoolId"
        @pool-select="onPoolSelect"
      />
    </div>

    <!-- Map area -->
    <div class="flex-1 relative flex flex-col">

      <!-- Mobile top bar -->
      <div class="lg:hidden flex items-center gap-2 px-3 py-2 bg-white border-b border-gray-100 shadow-sm z-10">
        <button
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
          :class="mobileTab === 'map' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'"
          @click="mobileTab = 'map'"
        >
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.157 2.175a1.5 1.5 0 00-1.147 0l-4.084 1.69A1.5 1.5 0 002 5.251v10.877a1.5 1.5 0 002.074 1.386l3.51-1.452 4.26 1.763a1.5 1.5 0 001.146 0l4.083-1.69A1.5 1.5 0 0018 14.748V3.873a1.5 1.5 0 00-2.073-1.386l-3.51 1.452-4.26-1.764zM7.5 4.683l5 2.07v8.564l-5-2.07V4.683zm-1.5.583L3.5 6.17v8.615l2.5-1.035V5.266zm8.5 8.551l-2.5 1.034V5.266l2.5-1.034v9.585z" clip-rule="evenodd" />
          </svg>
          Карта
        </button>
        <button
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
          :class="mobileTab === 'list' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'"
          @click="mobileTab = 'list'"
        >
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" clip-rule="evenodd" />
          </svg>
          Список
          <span class="text-xs bg-white/30 px-1.5 rounded-full">{{ poolsStore.all.length }}</span>
        </button>
      </div>

      <!-- Mobile list panel -->
      <div
        v-if="mobileTab === 'list'"
        class="lg:hidden flex-1 overflow-hidden"
      >
        <MapSidebar
          :pools="poolsStore.all"
          :active-pool-id="activePoolId"
          @pool-select="onPoolSelectMobile"
        />
      </div>

      <!-- Leaflet map -->
      <div
        class="flex-1"
        :class="{ 'hidden lg:block': mobileTab === 'list' }"
      >
        <ClientOnly>
          <MapView
            :pools="poolsStore.all"
            :active-pool-id="activePoolId"
            @pool-click="onPoolSelect"
          />
          <template #fallback>
            <div class="w-full h-full flex items-center justify-center bg-gray-100">
              <div class="text-center">
                <div class="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-3" />
                <p class="text-sm text-gray-500">{{ $t('common.loading') }}</p>
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { Pool } from '~/types/pool'

const { t } = useI18n()
const poolsStore = usePoolsStore()

const activePoolId = ref<string | null>(null)
const mobileTab = ref<'map' | 'list'>('map')

const onPoolSelect = (pool: Pool) => {
  activePoolId.value = pool.id
}

const onPoolSelectMobile = (pool: Pool) => {
  activePoolId.value = pool.id
  mobileTab.value = 'map'
}

usePageSeo({
  title: 'Карта бассейнов Ташкента — найти ближайший бассейн | Basen.uz',
  description: 'Бассейны в Ташкенте и Узбекистане на карте. Найдите бассейн рядом с вами — адрес, цены 2026 и расписание. Кликните на маркер для деталей.',
  canonical: '/map',
})
</script>
