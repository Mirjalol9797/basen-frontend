<template>
  <div>
    <!-- 404 -->
    <div v-if="!category || !regionEntry" class="container py-24 text-center">
      <p class="text-6xl mb-4">🏊</p>
      <h1 class="text-2xl font-bold text-gray-800 mb-2">
        {{ $t("category.page_not_found") }}
      </h1>
      <p class="text-gray-400 mb-6">{{ $t("category.page_not_found_desc") }}</p>
      <NuxtLink
        :to="localePath('/catalog')"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
      >
        {{ $t("errors.go_catalog") }}
      </NuxtLink>
    </div>

    <template v-else>
      <!-- Hero -->
      <section
        class="text-white py-12 sm:py-16"
        :style="{
          background: `linear-gradient(135deg, ${category.color}cc, ${category.color}99)`,
        }"
      >
        <div class="container">
          <!-- Breadcrumb -->
          <nav
            class="flex items-center gap-1.5 text-sm text-white/70 mb-6 flex-wrap"
          >
            <NuxtLink
              :to="localePath('/')"
              class="hover:text-white transition-colors"
              >{{ $t("nav.home") }}</NuxtLink
            >
            <span>/</span>
            <NuxtLink
              :to="localePath('/catalog')"
              class="hover:text-white transition-colors"
              >{{ $t("nav.catalog") }}</NuxtLink
            >
            <span>/</span>
            <NuxtLink
              :to="localePath(`/category/${slug}`)"
              class="hover:text-white transition-colors"
              >{{ category.name }}</NuxtLink
            >
            <span>/</span>
            <span class="text-white">{{ regionShort }}</span>
          </nav>

          <h1 class="text-3xl sm:text-4xl font-bold mb-3">
            {{ h1 }}
          </h1>
          <div class="flex flex-wrap items-center gap-4 text-white/80">
            <span>{{ category.description }}</span>
            <span
              class="bg-white/20 px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ $t("category.page_found", { count: pools.length }) }}
            </span>
          </div>

          <div class="flex flex-wrap gap-2 mt-4">
            <NuxtLink
              :to="localePath(`/category/${slug}`)"
              class="px-3 py-1.5 text-sm rounded-lg border border-white/30 text-white/90 hover:bg-white hover:text-gray-900 transition-all duration-150"
            >
              {{ $t("category.region_all_link", { name: category.name }) }}
            </NuxtLink>
            <NuxtLink
              :to="localePath(`/region/${regionId}`)"
              class="px-3 py-1.5 text-sm rounded-lg border border-white/30 text-white/90 hover:bg-white hover:text-gray-900 transition-all duration-150"
            >
              {{ $t("region.hero_title", { name: regionShort }) }}
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Content -->
      <div class="container py-8">
        <!-- Empty state -->
        <div v-if="pools.length === 0" class="text-center py-16">
          <p class="text-4xl mb-4">🏊</p>
          <p class="text-gray-500 mb-4">{{ $t("common.no_results") }}</p>
          <NuxtLink
            :to="localePath(`/category/${slug}`)"
            class="text-primary-600 hover:text-primary-700 font-medium"
          >
            {{ $t("category.region_all_link", { name: category.name }) }}
          </NuxtLink>
        </div>

        <!-- Pool grid -->
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <PoolCard v-for="pool in pools" :key="pool.id" :pool="pool" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { PoolCategory } from "~/types/pool";

const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();
const poolsStore = usePoolsStore();
const { categories } = useCategories();
const { getRegionShort, getRegionHeading, getRegionById } = useRegions();

const slug = route.params.slug as string;
const regionId = route.params.region as string;

const category = computed(
  () => categories.value.find((c) => c.slug === slug) ?? null
);
const regionEntry = computed(() => getRegionById(regionId) ?? null);

const regionShort = computed(() => getRegionShort(regionId));

// Внутри одного региона порядок по региону смысла не имеет — сортируем по рейтингу.
const pools = computed(() =>
  poolsStore.all
    .filter(
      (p) => p.region === regionId && poolInCategory(p, slug as PoolCategory)
    )
    .sort((a, b) => avgRating(b) - avgRating(a))
);

// Падежи лежат в regions.json: ru — «Самарканда», uz — «Samarqanddagi»,
// en — «in Samarkand». Порядок слов задаёт шаблон локали.
const h1 = computed(() =>
  t("category.region_h1", {
    name: category.value?.name ?? "",
    region: getRegionHeading(regionId),
  })
);

watchEffect(() => {
  if (!category.value || !regionEntry.value) return;

  const BASE_URL = "https://basen.uz";
  const name = category.value.name;
  const region = getRegionHeading(regionId);
  const count = pools.value.length;

  usePageSeo({
    title: t("category.region_meta_title", { name, region }),
    description: t("category.region_meta_desc", { name, region, count }),
    canonical: `/category/${slug}/${regionId}`,
    // Комбинации ниже порога в sitemap не попадают и никуда не линкуются, но
    // если такой URL всё же найдут, он не должен уйти в индекс тонкой страницей.
    noindex: count < REGION_PAGE_MIN_POOLS,
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: h1.value,
    description: category.value.description,
    url: `${BASE_URL}/category/${slug}/${regionId}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: count,
      itemListElement: pools.value.map((pool, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: pool.name,
        url: `${BASE_URL}/catalog/${pool.slug}`,
      })),
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("nav.home"), item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: t("nav.catalog"),
        item: `${BASE_URL}/catalog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: name,
        item: `${BASE_URL}/category/${slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: regionShort.value,
        item: `${BASE_URL}/category/${slug}/${regionId}`,
      },
    ],
  };

  useHead({
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify(schema),
        key: "schema-category-region",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumb),
        key: "schema-breadcrumb",
      },
    ],
  });
});
</script>
