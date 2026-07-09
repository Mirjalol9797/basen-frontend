<template>
  <div>
    <!-- 404 -->
    <div v-if="!category" class="container py-24 text-center">
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
            <span class="text-white">{{ category.name }}</span>
          </nav>

          <h1 class="text-3xl sm:text-4xl font-bold mb-3">
            {{ $t("category.page_h1", { name: category.name }) }}
          </h1>
          <div class="flex flex-wrap items-center gap-4 text-white/80">
            <span>{{ category.description }}</span>
            <span
              class="bg-white/20 px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ $t("category.page_found", { count: pools.length }) }}
            </span>
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
            :to="localePath('/catalog')"
            class="text-primary-600 hover:text-primary-700 font-medium"
          >
            {{ $t("errors.go_catalog") }}
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

      <!-- SEO text block -->
      <div class="bg-white border-t border-gray-100">
        <div class="container py-8 max-w-3xl">
          <template v-if="guide">
            <p class="text-sm text-gray-500 leading-relaxed">
              {{ guide.intro }}
            </p>
            <div v-for="(section, i) in guide.sections" :key="i" class="mt-6">
              <h2 class="text-base font-bold text-gray-900 mb-2">
                {{ section.heading }}
              </h2>
              <p
                v-if="section.body"
                class="text-sm text-gray-500 leading-relaxed"
              >
                {{ section.body }}
              </p>
              <ul
                v-if="section.list"
                class="text-sm text-gray-500 leading-relaxed space-y-1.5 list-disc pl-5"
              >
                <li v-for="(item, j) in section.list" :key="j">{{ item }}</li>
              </ul>
            </div>
          </template>
          <p v-else class="text-sm text-gray-500 leading-relaxed">
            {{ seoText }}
          </p>
        </div>
      </div>

      <!-- Other categories -->
      <div class="container py-8 border-t border-gray-100">
        <h2 class="text-lg font-bold text-gray-900 mb-4">
          {{ $t("category.other_categories") }}
        </h2>
        <div class="flex flex-wrap gap-2">
          <NuxtLink
            v-for="c in otherCategories"
            :key="c.id"
            :to="localePath(`/category/${c.id}`)"
            class="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-all duration-150"
          >
            {{ c.name }}
          </NuxtLink>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { PoolCategory } from "~/types/pool";
import categoryGuides from "~/data/categoryGuides.json";

const route = useRoute();
const { t, locale } = useI18n();
const localePath = useLocalePath();
const poolsStore = usePoolsStore();
const { categories } = useCategories();

const slug = route.params.slug as string;
const category = computed(
  () => categories.value.find((c) => c.slug === slug) ?? null
);

const pools = computed(() =>
  poolsStore.all
    .filter((p) => p.category === (slug as PoolCategory))
    .sort((a, b) => b.rating - a.rating)
);

const otherCategories = computed(() =>
  categories.value.filter((c) => c.id !== slug)
);

const seoText = computed(() => {
  const key = `category.seo_text.${slug}`;
  const text = t(key);
  return text === key ? category.value?.description ?? "" : text;
});

type CategoryGuide = {
  intro: string;
  sections: { heading: string; body?: string; list?: string[] }[];
};

const guide = computed((): CategoryGuide | null => {
  const guides = categoryGuides as Record<
    string,
    Record<string, CategoryGuide>
  >;
  return guides[slug]?.[locale.value] ?? null;
});

watchEffect(() => {
  if (!category.value) return;

  const BASE_URL = "https://basen.uz";
  const name = category.value.name;
  const count = pools.value.length;

  usePageSeo({
    title: t("category.page_meta_title", { name, count }),
    description: t("category.page_meta_desc", { name, count }),
    canonical: `/category/${slug}`,
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${name} Ташкента`,
    description: category.value.description,
    numberOfItems: count,
    itemListElement: pools.value.map((pool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: pool.name,
      url: `${BASE_URL}/catalog/${pool.slug}`,
    })),
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
    ],
  };

  useHead({
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify(schema),
        key: "schema-category",
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
