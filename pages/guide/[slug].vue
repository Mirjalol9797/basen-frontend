<template>
  <div>
    <!-- 404 -->
    <div v-if="!guide" class="container py-24 text-center">
      <p class="text-6xl mb-4">📝</p>
      <h1 class="text-2xl font-bold text-gray-800 mb-2">
        {{ $t("guide.not_found") }}
      </h1>
      <p class="text-gray-400 mb-6">{{ $t("guide.not_found_desc") }}</p>
      <NuxtLink
        :to="localePath('/guide')"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
      >
        {{ $t("guide.back_to_guide") }}
      </NuxtLink>
    </div>

    <template v-else>
      <!-- Hero -->
      <section class="bg-gray-900 text-white py-12 sm:py-16">
        <div class="container">
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
              :to="localePath('/guide')"
              class="hover:text-white transition-colors"
              >{{ $t("nav.guide") }}</NuxtLink
            >
            <span>/</span>
            <span class="text-white">{{ guide.title }}</span>
          </nav>
          <h1 class="text-3xl sm:text-4xl font-bold">{{ guide.title }}</h1>

          <!-- Meta: dates + author -->
          <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4 text-sm text-white/60">
            <span>{{ $t('guide.published') }}: {{ publishedDate }}</span>
            <span v-if="updatedDate && updatedDate !== publishedDate">{{ $t('guide.updated') }}: {{ updatedDate }}</span>
            <span>{{ $t('guide.author') }}: {{ $t('guide.author_name') }}</span>
          </div>
        </div>
      </section>

      <div class="container py-8 sm:py-12">
        <!-- Intro -->
        <p class="text-gray-600 leading-relaxed">{{ guide.intro }}</p>

        <!-- Pools -->
        <h2 class="text-lg font-bold text-gray-900 mt-10 mb-4">
          {{ $t("guide.pools_in_guide") }}
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <PoolCard v-for="pool in pools" :key="pool.id" :pool="pool" />
        </div>

        <!-- Conclusion -->
        <p v-if="guide.conclusion" class="text-gray-600 leading-relaxed mt-8">
          {{ guide.conclusion }}
        </p>

        <!-- Internal links -->
        <div class="mt-10 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
          <NuxtLink
            :to="localePath('/catalog')"
            class="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-all duration-150"
          >
            {{ $t("nav.catalog") }}
          </NuxtLink>
          <NuxtLink
            v-for="cat in relatedCategories"
            :key="cat.id"
            :to="localePath(`/category/${cat.id}`)"
            class="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-all duration-150"
          >
            {{ cat.name }}
          </NuxtLink>
          <NuxtLink
            v-for="d in relatedDistricts"
            :key="d.id"
            :to="localePath(`/district/${d.id}`)"
            class="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-all duration-150"
          >
            {{ d.name }}
          </NuxtLink>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { t, locale } = useI18n();
const localePath = useLocalePath();
const poolsStore = usePoolsStore();
const { getGuideBySlug } = useGuides();
const { categories } = useCategories();
const { districts } = useDistricts();

const slug = route.params.slug as string;
const guide = computed(() => getGuideBySlug(slug));

const pools = computed(() => {
  if (!guide.value) return [];
  return guide.value.poolSlugs
    .map((s) => poolsStore.all.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => !!p);
});

const localeMap = { ru: "ru-RU", uz: "uz-UZ", en: "en-US" } as const;

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat(localeMap[locale.value as keyof typeof localeMap] ?? "ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));

const publishedDate = computed(() =>
  guide.value ? formatDate(guide.value.publishedAt) : ""
);
const updatedDate = computed(() =>
  guide.value?.updatedAt ? formatDate(guide.value.updatedAt) : null
);

const relatedCategories = computed(() => {
  const ids = new Set<string>(pools.value.map((p) => p.category));
  return categories.value.filter((c) => ids.has(c.id));
});

const relatedDistricts = computed(() => {
  const ids = new Set(
    pools.value.map((p) => p.district).filter((d): d is string => !!d)
  );
  return districts.value.filter((d) => ids.has(d.id));
});

const BASE_URL = "https://basen.uz";

watchEffect(() => {
  if (!guide.value) return;

  usePageSeo({
    title: `${guide.value.title} | Basen.uz`,
    description: guide.value.metaDescription,
    canonical: `/guide/${slug}`,
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: guide.value.title,
    description: guide.value.metaDescription,
    datePublished: guide.value.publishedAt,
    dateModified: guide.value.updatedAt ?? guide.value.publishedAt,
    url: `${BASE_URL}/guide/${slug}`,
    author: { "@type": "Organization", name: t("guide.author_name") },
    image: pools.value[0]?.gallery[0] ? `${BASE_URL}${pools.value[0].gallery[0]}` : `${BASE_URL}/og/default.jpg`,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("nav.home"), item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: t("nav.guide"),
        item: `${BASE_URL}/guide`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.value.title,
        item: `${BASE_URL}/guide/${slug}`,
      },
    ],
  };

  useHead({
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify(schema),
        key: "schema-article",
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
