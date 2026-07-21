<template>
  <div>
    <!-- 404 -->
    <div v-if="!pool" class="container py-24 text-center">
      <p class="text-6xl mb-4">🏊</p>
      <h1 class="text-2xl font-bold text-gray-800 mb-2">{{ $t('errors.not_found') }}</h1>
      <p class="text-gray-400 mb-6">{{ $t('errors.not_found_desc') }}</p>
      <AppButton :tag="'NuxtLink'" :to="localePath('/catalog')" variant="primary">
        {{ $t('errors.go_catalog') }}
      </AppButton>
    </div>

    <template v-else>
      <!-- Hero -->
      <div class="container pt-5 pb-0">
        <PoolHero :gallery="pool.gallery" :category="pool.category" :name="pool.name" />
      </div>

      <div class="container py-6 sm:py-8">

        <!-- Breadcrumb -->
        <nav class="flex items-center gap-1.5 text-sm text-gray-400 mb-5 flex-wrap">
          <NuxtLink :to="localePath('/')" class="hover:text-gray-600 transition-colors">{{ $t('nav.home') }}</NuxtLink>
          <span>/</span>
          <NuxtLink :to="localePath('/catalog')" class="hover:text-gray-600 transition-colors">{{ $t('nav.catalog') }}</NuxtLink>
          <span>/</span>
          <span class="text-gray-600 truncate max-w-[200px]">{{ pool.name }}</span>
        </nav>

        <!-- Main grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <!-- ── Main content ── -->
          <div class="lg:col-span-2 space-y-8">

            <!-- Title + badges -->
            <div>
              <div class="flex flex-wrap items-center gap-2 mb-2">
                <AppBadge color="blue">{{ $t(`category.${pool.category}`) }}</AppBadge>
                <AppBadge v-if="pool.featured" color="yellow">★ Топ</AppBadge>
                <AppBadge :color="pool.season === 'summer' ? 'yellow' : 'cyan'">
                  {{ $t(`pool.season_${pool.season === 'summer' ? 'summer' : 'yearround'}`) }}
                </AppBadge>
              </div>
              <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{{ pool.name }}</h1>
              <p class="text-sm text-gray-400 mb-3">
                <NuxtLink v-if="pool.district" :to="localePath(`/district/${pool.district}`)" class="hover:text-primary-600 transition-colors">
                  {{ districtName }}
                </NuxtLink>
                <span v-else>{{ districtName }}</span>
              </p>
              <div class="flex items-center gap-4 flex-wrap">
                <AppDualRating :google="pool.ratingGoogle" :yandex="pool.ratingYandex" size="md" />
                <PoolStatusBadge :schedule="pool.schedule" />
              </div>
            </div>

            <!-- Description -->
            <section>
              <h2 class="section-title">{{ $t('common.description') }}</h2>
              <p class="text-gray-600 leading-relaxed">{{ pool.description }}</p>

              <!-- Pool specs -->
              <div v-if="pool.poolLength || pool.poolDepthMax" class="flex flex-wrap gap-4 mt-4">
                <div v-if="pool.poolLength" class="flex items-center gap-2 text-sm text-gray-500">
                  <svg class="w-4 h-4 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 15.024 4.708 17 6.586 17H16a1 1 0 000-2H6.586l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 6H6.28l-.31-1.243A1 1 0 005 4H3z" clip-rule="evenodd"/>
                  </svg>
                  <span>{{ $t('pool.pool_length') }}: <strong class="text-gray-700">{{ pool.poolLength }} {{ $t('pool.meters') }}</strong></span>
                </div>
                <div v-if="pool.poolDepthMin && pool.poolDepthMax" class="flex items-center gap-2 text-sm text-gray-500">
                  <svg class="w-4 h-4 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd"/>
                  </svg>
                  <span>{{ $t('pool.pool_depth') }}: <strong class="text-gray-700">{{ pool.poolDepthMin }}–{{ pool.poolDepthMax }} {{ $t('pool.meters') }}</strong></span>
                </div>
              </div>
            </section>

            <!-- Prices -->
            <section v-if="pool.prices.length > 0">
              <h2 class="section-title">{{ $t('common.prices') }}</h2>
              <div class="bg-white rounded-2xl shadow-card p-5">
                <PoolPrices :prices="pool.prices" />
              </div>
            </section>

            <!-- Schedule -->
            <section v-if="pool.schedule && pool.schedule.length > 0">
              <h2 class="section-title">{{ $t('common.schedule') }}</h2>
              <div class="bg-white rounded-2xl shadow-card p-4">
                <PoolSchedule :schedule="pool.schedule" />
              </div>
            </section>

            <!-- Services -->
            <section v-if="pool.services.length > 0">
              <h2 class="section-title">{{ $t('common.services') }}</h2>
              <PoolServices :services="pool.services" />
            </section>

          </div>

          <!-- ── Sidebar ── -->
          <div class="space-y-4">

            <!-- Pool map -->
            <div v-if="pool.coordinates.lat && pool.coordinates.lng" class="bg-white rounded-2xl shadow-card overflow-hidden">
              <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-50">
                <svg class="w-4 h-4 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm font-semibold text-gray-700">{{ $t('common.on_map') }}</span>
              </div>
              <ClientOnly>
                <PoolMap
                  :lat="pool.coordinates.lat"
                  :lng="pool.coordinates.lng"
                  :name="pool.name"
                />
              </ClientOnly>
            </div>

            <!-- Contacts card -->
            <div class="bg-white rounded-2xl shadow-card p-5 space-y-3 sticky top-20">

              <!-- Status + today hours -->
              <div class="flex items-center justify-between pb-3 border-b border-gray-50">
                <PoolStatusBadge :schedule="pool.schedule" />
                <span v-if="todayEntry && !todayEntry.closed" class="text-xs text-gray-400">
                  {{ todayEntry.open }} – {{ todayEntry.close }}
                </span>
              </div>

              <!-- Address -->
              <div class="flex items-start gap-2.5 text-sm text-gray-600">
                <svg class="w-4 h-4 text-gray-300 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clip-rule="evenodd" />
                </svg>
                <span>{{ pool.address }}</span>
              </div>

              <!-- Phone -->
              <a
                v-for="phone in pool.phone"
                :key="phone"
                :href="`tel:${phone.replace(/\s/g, '')}`"
                class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition-all duration-150"
              >
                <svg class="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {{ phone }}
              </a>

              <!-- Telegram -->
              <a
                v-for="tg in pool.telegram"
                :key="tg"
                :href="tg"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#0088cc] text-white text-sm font-medium hover:bg-[#0077b3] transition-colors duration-150"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.01 9.47c-.148.67-.537.833-1.088.52l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.67 14.28l-2.95-.924c-.642-.2-.655-.642.134-.953l11.503-4.437c.534-.194 1.001.13.205.282z"/>
                </svg>
                {{ $t('common.write_telegram') }}
              </a>

              <!-- Instagram -->
              <a
                v-if="pool.instagram"
                :href="pool.instagram"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white text-sm font-medium hover:opacity-90 transition-opacity duration-150"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.256 1.216.6 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.25a3.25 3.25 0 110-6.5 3.25 3.25 0 010 6.5zm5.25-8.688a1.163 1.163 0 100-2.325 1.163 1.163 0 000 2.325z"/>
                </svg>
                {{ $t('common.instagram') }}
              </a>

              <!-- Facebook -->
              <a
                v-if="pool.facebook"
                :href="pool.facebook"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#1877f2] text-white text-sm font-medium hover:bg-[#1565d8] transition-colors duration-150"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
                {{ $t('common.facebook') }}
              </a>

              <!-- Email -->
              <a
                v-if="pool.email"
                :href="`mailto:${pool.email}`"
                class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition-all duration-150"
              >
                <svg class="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                  <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                </svg>
                {{ pool.email }}
              </a>

              <!-- Website -->
              <a
                v-if="pool.website"
                :href="pool.website"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition-all duration-150"
              >
                <svg class="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16A8 8 0 0010 2zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.499.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd" />
                </svg>
                {{ $t('common.website') }}
              </a>

              <!-- Route -->
              <a
                :href="`https://maps.google.com/?q=${pool.coordinates.lat},${pool.coordinates.lng}`"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition-all duration-150"
              >
                <svg class="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                {{ $t('common.route') }}
              </a>
            </div>
          </div>
        </div>

        <!-- Other pools in the same region (only when there's no district-level grouping) -->
        <PoolRegionPools v-if="!pool.district" :pools="sameRegion" :region="pool.region" />

        <!-- Similar pools -->
        <PoolSimilar :pools="similar" />

        <!-- Other pools in the same district -->
        <PoolDistrictPools v-if="pool.district" :pools="sameDistrict" :district="pool.district" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()

const slug = computed(() => route.params.slug as string)
const { pool, similar, sameDistrict, sameRegion } = usePool(slug)
const { getDistrictName } = useDistricts()

const todayEntry = computed(() => pool.value ? getTodayEntry(pool.value.schedule) : null)
const districtName = computed(() => pool.value ? getDistrictName(pool.value.district) : '')

watchEffect(() => {
  if (pool.value) {
    usePoolSeo(pool.value)
  }
})
</script>

<style scoped>
.section-title {
  @apply text-lg font-bold text-gray-900 mb-4;
}
</style>
