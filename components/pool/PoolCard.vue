<template>
  <NuxtLink
    :to="cardLink"
    class="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-2xl"
  >
    <article
      class="bg-white rounded-2xl shadow-card group-hover:shadow-card-hover transition-all duration-250 overflow-hidden h-full flex flex-col"
    >
      <!-- Image / Placeholder -->
      <div class="relative aspect-[4/3] overflow-hidden shrink-0">
        <NuxtImg
          v-if="pool.gallery[0]"
          :src="pool.gallery[0]"
          :alt="pool.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          width="400"
          height="300"
        />
        <div
          v-else
          class="w-full h-full flex items-center justify-center"
          :class="placeholderClass"
        >
          <svg
            class="w-14 h-14 text-white/50"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M3 17c1.5 0 2.5-1 4-1s2.5 1 4 1 2.5-1 4-1 2.5 1 4 1v2c-1.5 0-2.5-1-4-1s-2.5 1-4 1-2.5-1-4-1-2.5 1-4 1v-2zm0-4c1.5 0 2.5-1 4-1s2.5 1 4 1 2.5-1 4-1 2.5 1 4 1v2c-1.5 0-2.5-1-4-1s-2.5 1-4 1-2.5-1-4-1-2.5 1-4 1v-2zM12 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-5 5l3 3h-2v3h4v-3h-2l3-3"
            />
          </svg>
        </div>

        <!-- Featured badge -->
        <div v-if="pool.featured" class="absolute top-3 right-3">
          <span
            class="inline-flex items-center gap-1 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm"
          >
            <svg class="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
            Топ
          </span>
        </div>

        <!-- Category badge -->
        <div class="absolute bottom-3 left-3">
          <span
            class="inline-flex items-center bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2.5 py-1 rounded-lg shadow-sm"
          >
            {{ $t(`category.${pool.category}`) }}
          </span>
        </div>
      </div>

      <!-- Content -->
      <div class="p-4 flex flex-col flex-1">
        <!-- Name -->
        <h3
          class="min-h-11 font-semibold text-gray-900 line-clamp-2 leading-snug mb-2 group-hover:text-primary-700 transition-colors duration-150"
        >
          {{ pool.name }}
        </h3>

        <!-- Rating + status -->
        <div class="gap-1 flex flex-col mb-2">
          <AppDualRating
            :google="pool.ratingGoogle"
            :yandex="pool.ratingYandex"
            size="sm"
          />
          <PoolStatusBadge :schedule="pool.schedule" />
        </div>

        <!-- District / region -->
        <div
          v-if="locationName"
          class="flex items-center gap-1.5 text-sm text-gray-400 mb-1 min-h-5"
        >
          <svg
            class="w-3.5 h-3.5 shrink-0 text-gray-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="line-clamp-1">{{ locationName }}</span>
        </div>

        <!-- Price + season -->
        <div
          class="flex items-center mt-auto pt-2 border-t border-gray-50"
          :class="hasPrice ? 'justify-between' : 'justify-end'"
        >
          <div v-if="hasPrice" class="flex items-baseline gap-1">
            <span class="text-xs text-gray-400">{{ $t("price.from") }}</span>
            <span class="text-base font-bold text-primary-700">{{
              priceDisplay
            }}</span>
          </div>
          <span
            v-if="pool.season === 'summer'"
            class="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-medium"
          >
            {{ $t("pool.season_summer") }}
          </span>
          <span
            v-else
            class="text-xs text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full font-medium"
          >
            {{ $t("pool.season_yearround") }}
          </span>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Pool, PoolCategory } from "~/types/pool";

const props = defineProps<{ pool: Pool }>();

const localePath = useLocalePath();
const { getDistrictName } = useDistricts();
const { getRegionName } = useRegions();

const cardLink = computed(() => localePath(`/catalog/${props.pool.slug}`));
const locationName = computed(() => {
  if (props.pool.district) return getDistrictName(props.pool.district);
  if (props.pool.region !== "tashkent-city")
    return getRegionName(props.pool.region);
  return null;
});

const hasPrice = computed(() => minPrice(props.pool.prices) > 0);
const priceDisplay = computed(() => formatPrice(minPrice(props.pool.prices)));

const placeholderClasses = {
  open: "bg-gradient-to-br from-sky-400 to-blue-500",
  indoor: "bg-gradient-to-br from-blue-500 to-indigo-700",
  children: "bg-gradient-to-br from-cyan-400 to-teal-500",
  sport: "bg-gradient-to-br from-blue-700 to-primary-900",
  hotel: "bg-gradient-to-br from-violet-500 to-purple-700",
  aquapark: "bg-gradient-to-br from-orange-400 to-amber-500",
} satisfies Record<PoolCategory, string>;

const placeholderClass = computed(
  () => placeholderClasses[props.pool.category]
);
</script>
