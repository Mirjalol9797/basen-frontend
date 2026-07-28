<template>
  <div>
    <!-- 404 -->
    <div v-if="!district" class="container py-24 text-center">
      <p class="text-6xl mb-4">🗺️</p>
      <h1 class="text-2xl font-bold text-gray-800 mb-2">
        {{ $t("district.not_found") }}
      </h1>
      <p class="text-gray-400 mb-6">{{ $t("district.not_found_desc") }}</p>
      <NuxtLink
        :to="localePath('/catalog')"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
      >
        {{ $t("district.see_catalog") }}
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
            <NuxtLink
              :to="localePath('/catalog')"
              class="hover:text-white transition-colors"
              >{{ $t("nav.catalog") }}</NuxtLink
            >
            <span>/</span>
            <span class="text-white">{{ districtName }}</span>
          </nav>

          <h1 class="text-3xl sm:text-4xl font-bold mb-3">
            {{ $t("district.hero_title", { name: districtNameForTitle }) }}
          </h1>
          <div class="flex flex-wrap items-center gap-4 text-primary-100">
            <span>{{ $t("district.hero_subtitle") }}</span>
            <span
              class="bg-white/15 px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ $t("district.found", { count: pools.length }) }}
            </span>
          </div>
        </div>
      </section>

      <!-- SEO text block -->
      <div v-if="guide" class="bg-white border-b border-gray-100">
        <div class="container py-5">
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
      </div>

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
            {{ $t("district.see_catalog") }}
          </NuxtLink>
        </div>

        <!-- Pool grid -->
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <PoolCard v-for="pool in pools" :key="pool.id" :pool="pool" />
        </div>

        <!-- Related guide articles -->
        <div v-if="relatedGuides.length > 0" class="mt-12">
          <h2 class="text-lg font-bold text-gray-900 mb-4">
            {{ $t("district.related_guides") }}
          </h2>
          <div class="flex flex-wrap gap-2">
            <NuxtLink
              v-for="g in relatedGuides"
              :key="g.slug"
              :to="localePath(`/guide/${g.slug}`)"
              class="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-all duration-150"
            >
              {{ g.title }}
            </NuxtLink>
          </div>
        </div>

        <!-- FAQ -->
        <div
          v-if="faqItems.length > 0"
          class="mt-12 pt-8 border-t border-gray-100"
        >
          <h2 class="text-lg font-bold text-gray-900 mb-4">
            {{ $t("district.faq_title", { name: districtName }) }}
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

        <!-- Footer link to other districts -->
        <div class="mt-12 pt-8 border-t border-gray-100">
          <h2 class="text-lg font-bold text-gray-900 mb-4">
            {{ $t("district.districts_title") }}
          </h2>
          <div class="flex flex-wrap gap-2">
            <NuxtLink
              v-for="d in otherDistricts"
              :key="d.id"
              :to="localePath(`/district/${d.id}`)"
              class="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-all duration-150"
            >
              {{ d.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import districtGuides from "~/data/districtGuides.json";
import districtFaq from "~/data/districtFaq.json";

const route = useRoute();
const { t, locale } = useI18n();
const localePath = useLocalePath();
const poolsStore = usePoolsStore();
const { districts, getDistrictName, getDistrictGenitive, getDistrictById } =
  useDistricts();

const slug = route.params.slug as string;
const districtEntry = computed(() => getDistrictById(slug));
const district = computed(() => districtEntry.value ?? null);

const districtName = computed(() => getDistrictName(slug));
const districtNameForTitle = computed(() => {
  if (locale.value === "ru") return getDistrictGenitive(slug);
  return getDistrictName(slug);
});

const pools = computed(() =>
  poolsStore.all
    .filter((p) => p.district === slug)
    .sort((a, b) => avgRating(b) - avgRating(a))
);

const otherDistricts = computed(() =>
  districts.value.filter((d) => d.id !== slug)
);

const { guides } = useGuides();

const relatedGuides = computed(() => {
  const districtPoolSlugs = new Set(pools.value.map((p) => p.slug));
  return guides.value.filter((g) =>
    g.poolSlugs.some((s) => districtPoolSlugs.has(s))
  );
});

// Цифры для текстов ниже считаются из каталога и подставляются в
// плейсхолдеры {count}, {priceFrom} и т. д. Раньше здесь лежала карта
// districtSeoTextMap с текстами, вписанными руками: они были только
// по-русски (то есть показывались и на /uz, и на /en) и успели разойтись
// с каталогом — упоминали бассейны, которых в нём нет.
const stats = computed(() =>
  buildAreaStats(pools.value, slug, locale.value, getDistrictName)
);

type AreaGuide = {
  intro: string;
  sections: { heading: string; body?: string; list?: string[] }[];
};

const guide = computed((): AreaGuide | null => {
  const raw = (districtGuides as Record<string, Record<string, AreaGuide>>)[
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
    (districtFaq as Record<string, Record<string, FaqItem[]>>)[slug]?.[
      locale.value
    ] ?? [];
  return raw.map((item) => ({
    q: interpolate(item.q, stats.value),
    a: interpolate(item.a, stats.value),
  }));
});

const openFaqIndex = ref<number | null>(null);

watchEffect(() => {
  if (!district.value) return;

  const BASE_URL = "https://basen.uz";
  const nameForSeo = districtNameForTitle.value;
  const count = pools.value.length;

  usePageSeo({
    title: t("district.meta_title", { name: nameForSeo }),
    description: t("district.meta_desc", { name: nameForSeo, count }),
    canonical: `/district/${slug}`,
    // Пустой район индексировать нечего — Google всё равно пометит страницу
    // как «просканирована, но не проиндексирована». Появится первый бассейн —
    // страница станет индексируемой сама.
    noindex: count === 0,
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("district.hero_title", { name: nameForSeo }),
    description: t("district.meta_desc", { name: nameForSeo, count }),
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
        name: districtName.value,
        item: `${BASE_URL}/district/${slug}`,
      },
    ],
  };

  const scripts = [
    {
      type: "application/ld+json",
      children: JSON.stringify(schema),
      key: "schema-district",
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
