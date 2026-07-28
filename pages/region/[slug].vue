<template>
  <div>
    <!-- 404 -->
    <div v-if="!region" class="container py-24 text-center">
      <p class="text-6xl mb-4">🗺️</p>
      <h1 class="text-2xl font-bold text-gray-800 mb-2">
        {{ $t("region.not_found") }}
      </h1>
      <p class="text-gray-400 mb-6">{{ $t("region.not_found_desc") }}</p>
      <NuxtLink
        :to="localePath('/catalog')"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
      >
        {{ $t("region.see_catalog") }}
      </NuxtLink>
    </div>

    <template v-else>
      <!-- Hero -->
      <section
        class="bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white py-12 sm:py-16"
      >
        <div class="container">
          <!-- Breadcrumb -->
          <nav
            class="flex items-center gap-1.5 text-sm text-primary-200 mb-6 flex-wrap"
          >
            <NuxtLink
              :to="localePath('/')"
              class="hover:text-white transition-colors"
              >{{ $t("nav.home") }}</NuxtLink
            >
            <span>/</span>
            <span class="text-white">{{ regionName }}</span>
          </nav>

          <h1 class="text-3xl sm:text-4xl font-bold mb-3">
            {{ $t("region.hero_title", { name: regionNameForTitle }) }}
          </h1>
          <div class="flex flex-wrap items-center gap-4 text-primary-100">
            <span>{{ $t("region.hero_subtitle") }}</span>
            <span
              class="bg-white/15 px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ $t("region.found", { count: pools.length }) }}
            </span>
          </div>
        </div>
      </section>

      <!-- Content -->
      <div class="container py-8">
        <!-- Filters -->
        <div
          v-if="pools.length > 0"
          class="bg-white rounded-2xl shadow-card p-4 mb-6 space-y-4"
        >
          <!-- Categories -->
          <div>
            <p
              class="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2"
            >
              {{ $t("filter.type") }}
            </p>
            <div class="flex flex-wrap gap-1.5">
              <button
                v-for="cat in CATEGORIES"
                :key="cat"
                type="button"
                class="px-3 py-1.5 rounded-xl border text-sm font-medium transition-all duration-150"
                :class="
                  selectedCategories.includes(cat)
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:text-primary-600'
                "
                @click="toggleCategory(cat)"
              >
                {{ $t(`category.${cat}`) }}
              </button>
            </div>
          </div>

          <!-- District select (only Tashkent City) -->
          <div v-if="isTashkentCity">
            <p
              class="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2"
            >
              {{ $t("filter.district") }}
            </p>
            <select
              v-model="selectedDistrict"
              class="w-full sm:w-64 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 cursor-pointer"
            >
              <option :value="null">{{ $t("filter.all_districts") }}</option>
              <option v-for="d in districts" :key="d.id" :value="d.id">
                {{ d.name }}
              </option>
            </select>
          </div>

          <!-- Season + Reset -->
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex gap-2">
              <button
                v-for="s in SEASONS"
                :key="s.value"
                type="button"
                class="px-3 py-1.5 rounded-xl border text-sm font-medium transition-all duration-150"
                :class="
                  selectedSeason === s.value
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:text-primary-600'
                "
                @click="toggleSeason(s.value)"
              >
                {{ s.label }}
              </button>
            </div>
            <button
              v-if="hasActiveFilters"
              type="button"
              class="text-sm text-red-500 hover:text-red-600 font-medium"
              @click="resetFilters"
            >
              {{ $t("filter.reset") }}
            </button>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="filteredPools.length === 0" class="text-center py-16">
          <p class="text-4xl mb-4">🏊</p>
          <p class="text-gray-500 mb-4">{{ $t("common.no_results") }}</p>
          <button
            v-if="hasActiveFilters"
            class="text-primary-600 hover:text-primary-700 font-medium"
            @click="resetFilters"
          >
            {{ $t("common.reset_filters") }}
          </button>
          <NuxtLink
            v-else
            :to="localePath('/catalog')"
            class="text-primary-600 hover:text-primary-700 font-medium"
          >
            {{ $t("region.see_catalog") }}
          </NuxtLink>
        </div>

        <!-- Pool grid -->
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <PoolCard v-for="pool in filteredPools" :key="pool.id" :pool="pool" />
        </div>

        <!-- SEO text -->
        <div v-if="guide" class="mt-12 pt-8 border-t border-gray-100">
          <p class="text-sm text-gray-500 leading-relaxed">{{ guide.intro }}</p>
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
        </div>

        <!-- FAQ -->
        <div
          v-if="faqItems.length > 0"
          class="mt-12 pt-8 border-t border-gray-100"
        >
          <h2 class="text-lg font-bold text-gray-900 mb-4">
            {{ $t("region.faq_title", { name: regionName }) }}
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

        <!-- Other regions -->
        <div class="mt-12 pt-8 border-t border-gray-100">
          <h2 class="text-lg font-bold text-gray-900 mb-4">
            {{ $t("region.regions_title") }}
          </h2>
          <div class="flex flex-wrap gap-2">
            <NuxtLink
              v-for="r in otherRegions"
              :key="r.id"
              :to="localePath(`/region/${r.id}`)"
              class="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-all duration-150"
            >
              {{ r.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { PoolCategory } from "~/types/pool";
import regionGuides from "~/data/regionGuides.json";
import regionFaq from "~/data/regionFaq.json";

const route = useRoute();
const { t, locale } = useI18n();
const localePath = useLocalePath();
const poolsStore = usePoolsStore();
const { regions, getRegionName, getRegionGenitive, getRegionById } =
  useRegions();
const { districts, getDistrictName } = useDistricts();

const slug = route.params.slug as string;
const region = computed(() => getRegionById(slug) ?? null);

const regionName = computed(() => getRegionName(slug));
const regionNameForTitle = computed(() => {
  if (locale.value === "ru") return getRegionGenitive(slug);
  return getRegionName(slug);
});

const pools = computed(() =>
  poolsStore.all
    .filter((p) => p.region === slug)
    .sort((a, b) => avgRating(b) - avgRating(a))
);

const otherRegions = computed(() => regions.value.filter((r) => r.id !== slug));

const isTashkentCity = computed(() => slug === "tashkent-city");

// Local filters
const CATEGORIES: PoolCategory[] = [
  "open",
  "indoor",
  "children",
  "sport",
  "hotel",
  "aquapark",
];
const SEASONS = computed(() => [
  { value: "summer", label: t("filter.season_summer") },
  { value: "year-round", label: t("filter.season_yearround") },
]);

const selectedCategories = ref<PoolCategory[]>([]);
const selectedSeason = ref<string | null>(null);
const selectedDistrict = ref<string | null>(null);

const hasActiveFilters = computed(
  () =>
    selectedCategories.value.length > 0 ||
    selectedSeason.value !== null ||
    selectedDistrict.value !== null
);

function toggleCategory(cat: PoolCategory) {
  const idx = selectedCategories.value.indexOf(cat);
  if (idx > -1) selectedCategories.value.splice(idx, 1);
  else selectedCategories.value.push(cat);
}

function toggleSeason(val: string) {
  selectedSeason.value = selectedSeason.value === val ? null : val;
}

function resetFilters() {
  selectedCategories.value = [];
  selectedSeason.value = null;
  selectedDistrict.value = null;
}

// Цифры для текстов ниже. Считаются по всем бассейнам региона, а не по
// отфильтрованным: текст описывает регион целиком и не должен меняться,
// когда пользователь щёлкает фильтры.
const stats = computed(() =>
  buildAreaStats(pools.value, slug, locale.value, getDistrictName)
);

type RegionGuide = {
  intro: string;
  sections: { heading: string; body?: string; list?: string[] }[];
};

const guide = computed((): RegionGuide | null => {
  const raw = (regionGuides as Record<string, Record<string, RegionGuide>>)[
    slug
  ]?.[locale.value];
  if (!raw) return null;
  const fill = (s: string) => interpolate(s, stats.value);
  return {
    intro: fill(raw.intro),
    sections: raw.sections.map((s) => ({
      heading: fill(s.heading),
      ...(s.body && { body: fill(s.body) }),
      ...(s.list && { list: s.list.map(fill) }),
    })),
  };
});

type FaqItem = { q: string; a: string };

const faqItems = computed((): FaqItem[] => {
  const raw =
    (regionFaq as Record<string, Record<string, FaqItem[]>>)[slug]?.[
      locale.value
    ] ?? [];
  return raw.map((item) => ({
    q: interpolate(item.q, stats.value),
    a: interpolate(item.a, stats.value),
  }));
});

const openFaqIndex = ref<number | null>(null);

const filteredPools = computed(() => {
  let result = pools.value;
  if (selectedCategories.value.length > 0)
    result = result.filter((p) =>
      poolCategories(p).some((c) => selectedCategories.value.includes(c))
    );
  if (selectedSeason.value)
    result = result.filter((p) => p.season === selectedSeason.value);
  if (selectedDistrict.value)
    result = result.filter((p) => p.district === selectedDistrict.value);
  return result;
});

watchEffect(() => {
  if (!region.value) return;

  const BASE_URL = "https://basen.uz";
  const nameForSeo = regionNameForTitle.value;
  const count = pools.value.length;

  usePageSeo({
    title: t("region.meta_title", { name: nameForSeo }),
    description: t("region.meta_desc", { name: nameForSeo, count }),
    canonical: `/region/${slug}`,
    // Пустой регион индексировать нечего — Google всё равно пометит страницу
    // как «просканирована, но не проиндексирована». Появится первый бассейн —
    // страница станет индексируемой сама.
    noindex: count === 0,
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("region.hero_title", { name: nameForSeo }),
    description: t("region.meta_desc", { name: nameForSeo, count }),
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
        name: regionName.value,
        item: `${BASE_URL}/region/${slug}`,
      },
    ],
  };

  const scripts = [
    {
      type: "application/ld+json",
      children: JSON.stringify(schema),
      key: "schema-region",
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
