<template>
  <div v-if="items.length > 0" class="mt-12 pt-8 border-t border-gray-100">
    <h2 class="text-lg font-bold text-gray-900 mb-4">
      {{ $t("region.categories_title", { name: regionHeading }) }}
    </h2>
    <div class="flex flex-wrap gap-2">
      <NuxtLink
        v-for="item in items"
        :key="item.id"
        :to="localePath(`/category/${item.id}/${regionId}`)"
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-colors duration-150"
      >
        {{ item.title }}
        <span class="text-xs text-gray-400">{{ item.count }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Pool } from "~/types/pool";

const props = defineProps<{
  /** Бассейны региона — по ним считается, какие категории набрали на страницу. */
  pools: Pool[];
  regionId: string;
}>();

const { t } = useI18n();
const localePath = useLocalePath();
const { categories } = useCategories();
const { getRegionHeading } = useRegions();

const regionHeading = computed(() => getRegionHeading(props.regionId));

// Категории, у которых в этом регионе есть собственная страница: тот же порог,
// что и в nuxt.config, поэтому ссылка никогда не ведёт на несуществующий адрес.
const items = computed(() => {
  const counts = new Map<string, number>();
  for (const p of props.pools)
    for (const c of poolCategories(p)) counts.set(c, (counts.get(c) ?? 0) + 1);

  return categories.value
    .map((c) => ({ id: c.id, name: c.name, count: counts.get(c.id) ?? 0 }))
    .filter((c) => c.count >= REGION_PAGE_MIN_POOLS)
    .sort((a, b) => b.count - a.count)
    .map((c) => ({
      ...c,
      title: t("category.region_h1", {
        name: c.name,
        region: regionHeading.value,
      }),
    }));
});
</script>
