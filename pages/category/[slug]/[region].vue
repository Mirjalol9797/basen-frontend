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

      <!-- Same category in other regions -->
      <CategoryRegionLinks
        :pools="inCategory"
        :category-slug="slug"
        :category-name="category.name"
        :current-region="regionId"
      />

      <!-- Unique text for this category + region -->
      <div v-if="content" class="bg-white border-t border-gray-100">
        <div class="container py-8">
          <p class="text-sm text-gray-500 leading-relaxed">
            {{ content.intro }}
          </p>
          <div
            v-for="(section, i) in content.sections"
            :key="i"
            class="mt-6"
          >
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
        </div>
      </div>

      <!-- FAQ -->
      <div
        v-if="faqItems.length > 0"
        class="container py-8 border-t border-gray-100"
      >
        <h2 class="text-lg font-bold text-gray-900 mb-4">
          {{ $t("category.faq_title", { name: h1 }) }}
        </h2>
        <div class="space-y-2.5 max-w-3xl">
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
    </template>
  </div>
</template>

<script setup lang="ts">
import type { PoolCategory } from "~/types/pool";
import regionContent from "~/data/categoryRegionContent.json";

type FaqItem = { q: string; a: string };
type RegionContent = {
  intro: string;
  sections: { heading: string; body?: string; list?: string[] }[];
  faq?: FaqItem[];
};

const route = useRoute();
const { t, locale } = useI18n();
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

// Вся категория по стране — нужна блоку ссылок на другие регионы.
const inCategory = computed(() =>
  poolsStore.all.filter((p) => poolInCategory(p, slug as PoolCategory))
);

// Внутри одного региона порядок по региону смысла не имеет — сортируем по рейтингу.
const pools = computed(() =>
  inCategory.value
    .filter((p) => p.region === regionId)
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

// Уникальный текст заполнен не у всех комбинаций — страница без него
// показывает только список бассейнов.
const content = computed((): RegionContent | null => {
  const all = regionContent as unknown as Record<
    string,
    Record<string, Record<string, RegionContent>>
  >;
  return all[slug]?.[regionId]?.[locale.value] ?? null;
});

const faqItems = computed((): FaqItem[] => content.value?.faq ?? []);
const openFaqIndex = ref<number | null>(null);

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
    description: content.value?.intro ?? category.value.description,
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

  const scripts = [
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
  ];

  if (faqItems.value.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.value.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    };
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify(faqSchema),
      key: "schema-faq",
    });
  }

  useHead({ script: scripts });
});
</script>
