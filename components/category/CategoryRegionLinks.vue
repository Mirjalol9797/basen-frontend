<template>
  <div v-if="items.length > 1" class="container py-8 border-t border-gray-100">
    <h2 class="text-lg font-bold text-gray-900 mb-4">
      {{ $t("category.regions_title", { name: categoryName }) }}
    </h2>
    <div class="flex flex-wrap gap-2">
      <NuxtLink
        v-for="item in items"
        :key="item.id"
        :to="localePath(`/region/${item.id}`)"
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-colors duration-150"
      >
        {{ item.name }}
        <span class="text-xs text-gray-400">{{ item.count }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Pool } from "~/types/pool";

const props = defineProps<{
  /** Бассейны текущей категории — по ним считаются регионы и количество. */
  pools: Pool[];
  /** Название категории для заголовка блока. */
  categoryName: string;
}>();

const localePath = useLocalePath();
const { getRegionShort } = useRegions();

const poolsRef = computed(() => props.pools);
const { regionRank } = useRegionOrder(poolsRef);

// Регионы, где эта категория реально представлена, в том же порядке, что и
// список бассейнов выше. Ссылки ведут на страницу региона целиком; когда
// появятся страницы «категория × регион», они станут точнее.
const items = computed(() => {
  const counts = new Map<string, number>();
  for (const p of props.pools)
    counts.set(p.region, (counts.get(p.region) ?? 0) + 1);

  return [...counts.entries()]
    .map(([id, count]) => ({ id, count, name: getRegionShort(id) }))
    .sort(
      (a, b) =>
        (regionRank.value.get(a.id) ?? Number.MAX_SAFE_INTEGER) -
        (regionRank.value.get(b.id) ?? Number.MAX_SAFE_INTEGER)
    );
});
</script>
