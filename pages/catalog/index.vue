<template>
  <div class="container py-6 sm:py-8">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-1.5 text-sm text-gray-400 mb-4 flex-wrap">
      <NuxtLink
        :to="localePath('/')"
        class="hover:text-primary-600 transition-colors"
        >{{ $t("nav.home") }}</NuxtLink
      >
      <span>/</span>
      <span class="text-gray-600">{{ $t("nav.catalog") }}</span>
    </nav>

    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">
        {{ $t("catalog.title") }}
      </h1>
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
      <div
        v-if="isFilterOpen"
        class="mb-5 bg-gray-50 rounded-2xl border border-gray-100 p-5"
      >
        <CatalogFilters />
      </div>
    </Transition>

    <!-- Skeletons while loading -->
    <div
      v-if="loading"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <PoolCardSkeleton v-for="i in 6" :key="i" />
    </div>

    <!-- Pool grid -->
    <template v-else>
      <div
        v-if="pools.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <PoolCard v-for="pool in pools" :key="pool.id" :pool="pool" />
      </div>
      <CatalogEmptyState v-else />
    </template>

    <!-- FAQ -->
    <div class="mt-10 pt-8 border-t border-gray-100">
      <h2 class="text-lg font-bold text-gray-900 mb-4">
        {{ $t("catalog.faq_title") }}
      </h2>
      <div class="space-y-2.5">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="bg-white rounded-xl border border-gray-100 overflow-hidden"
        >
          <button
            type="button"
            class="w-full flex items-center justify-between gap-4 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors duration-150"
            :aria-expanded="openFaqIndex === index"
            @click="openFaqIndex = openFaqIndex === index ? null : index"
          >
            <span class="font-medium text-gray-900 text-sm leading-snug">{{
              item.q
            }}</span>
            <svg
              class="w-4 h-4 shrink-0 text-primary-600 transition-transform duration-200"
              :class="{ 'rotate-180': openFaqIndex === index }"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <div
            v-if="openFaqIndex === index"
            class="px-4 pb-3.5 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-3"
          >
            {{ item.a }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
const poolsStore = usePoolsStore();
const uiStore = useUiStore();
const { pools, total } = usePools();

const loading = computed(() => poolsStore.all.length === 0);

const isFilterOpen = computed({
  get: () => uiStore.isFilterDrawerOpen,
  set: (v) => (v ? uiStore.openFilterDrawer() : uiStore.closeFilterDrawer()),
});

usePageSeo({
  title: t("catalog.meta_title"),
  description: t("catalog.meta_desc"),
  canonical: "/catalog",
});

const faqItems = computed(() => [
  { q: t("catalog.faq.q1"), a: t("catalog.faq.a1") },
  { q: t("catalog.faq.q2"), a: t("catalog.faq.a2") },
  { q: t("catalog.faq.q3"), a: t("catalog.faq.a3") },
  { q: t("catalog.faq.q4"), a: t("catalog.faq.a4") },
]);
const openFaqIndex = ref<number | null>(null);

const BASE_URL = "https://basen.uz";

watchEffect(() => {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("catalog.title"),
    description: t("catalog.meta_desc"),
    url: `${BASE_URL}/catalog`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: total.value,
      itemListElement: pools.value.map((pool, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: pool.name,
        url: `${BASE_URL}/catalog/${pool.slug}`,
      })),
    },
  };

  const breadcrumbSchema = {
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
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.value.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  useHead({
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify(collectionSchema),
        key: "schema-collection",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema),
        key: "schema-breadcrumb",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(faqSchema),
        key: "schema-faq",
      },
    ],
  });
});
</script>
