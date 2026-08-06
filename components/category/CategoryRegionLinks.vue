<template>
  <div v-if="items.length > 1" class="container pt-5 pb-1 sm:pt-8 sm:pb-2">
    <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
      {{ $t("category.regions_title", { name: categoryName }) }}
    </h2>
    <div class="flex flex-wrap gap-1.5 sm:gap-2">
      <template v-for="item in items" :key="item.id">
        <!-- Текущий регион на комбо-странице: не ссылка, а метка -->
        <span
          v-if="item.id === currentRegion"
          class="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-full bg-primary-50 border border-primary-200 text-xs sm:text-sm font-medium text-primary-700"
        >
          {{ item.name }}
          <span class="text-[11px] sm:text-xs text-primary-400">{{
            item.count
          }}</span>
        </span>
        <NuxtLink
          v-else
          :to="localePath(item.to)"
          class="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-full bg-white border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-colors duration-150"
        >
          {{ item.name }}
          <span class="text-[11px] sm:text-xs text-gray-400">{{
            item.count
          }}</span>
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Pool } from "~/types/pool";

const props = defineProps<{
  /** Бассейны всей категории — по ним считаются регионы и количество. */
  pools: Pool[];
  /** Слаг категории: нужен, чтобы собрать адрес страницы «категория × регион». */
  categorySlug: string;
  /** Название категории для заголовка блока. */
  categoryName: string;
  /** На комбо-странице — её регион: показывается меткой, а не ссылкой. */
  currentRegion?: string;
}>();

const localePath = useLocalePath();
const { getRegionShort } = useRegions();

const poolsRef = computed(() => props.pools);
const { regionRank } = useRegionOrder(poolsRef);

// Регионы, где категория представлена, в том же порядке, что и список выше.
// Ссылка ведёт на страницу «категория × регион», если та существует, то есть
// если бассейнов набралось на порог, — иначе на страницу региона целиком.
const items = computed(() => {
  const counts = new Map<string, number>();
  for (const p of props.pools)
    counts.set(p.region, (counts.get(p.region) ?? 0) + 1);

  return [...counts.entries()]
    .map(([id, count]) => ({
      id,
      count,
      name: getRegionShort(id),
      to:
        count >= REGION_PAGE_MIN_POOLS
          ? `/category/${props.categorySlug}/${id}`
          : `/region/${id}`,
    }))
    .sort(
      (a, b) =>
        (regionRank.value.get(a.id) ?? Number.MAX_SAFE_INTEGER) -
        (regionRank.value.get(b.id) ?? Number.MAX_SAFE_INTEGER)
    );
});
</script>
