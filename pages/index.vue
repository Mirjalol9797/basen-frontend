<template>
  <div>
    <HomeHero />
    <HomeCategories />
    <HomeTopRated />
    <HomeRegions />
    <HomeRegionPools />
    <HomeFeatured />
    <HomeLatest />
    <HomeWhyUs />
    <HomeMapBanner />
    <HomeGuides />
    <HomeFaq :faq-items="faqItems" />

    <!-- SEO text (RU only for now) -->
    <section
      v-if="hasSeoText"
      class="py-12 sm:py-16 bg-white border-t border-gray-100"
    >
      <div class="container">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          {{ $t("home.seo_title") }}
        </h2>
        <div class="space-y-5 text-sm text-gray-500 leading-relaxed">
          <p>{{ $t("home.seo_intro") }}</p>

          <h3 class="text-base font-bold text-gray-900 pt-2">
            {{ $t("home.seo_h_types") }}
          </h3>
          <p>{{ $t("home.seo_types") }}</p>

          <template v-if="seoExpanded">
            <h3 class="text-base font-bold text-gray-900 pt-2">
              {{ $t("home.seo_h_catalog") }}
            </h3>
            <p>{{ $t("home.seo_catalog") }}</p>

            <h3 class="text-base font-bold text-gray-900 pt-2">
              {{ $t("home.seo_h_choose") }}
            </h3>
            <p>{{ $t("home.seo_choose") }}</p>

            <h3 class="text-base font-bold text-gray-900 pt-2">
              {{ $t("home.seo_h_services") }}
            </h3>
            <p>{{ $t("home.seo_services") }}</p>

            <h3 class="text-base font-bold text-gray-900 pt-2">
              {{ $t("home.seo_h_map") }}
            </h3>
            <p>{{ $t("home.seo_map") }}</p>

            <p>{{ $t("home.seo_outro") }}</p>
          </template>
        </div>

        <button
          v-if="!seoExpanded"
          type="button"
          class="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          @click="seoExpanded = true"
        >
          {{ $t("common.show_more") }}
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

usePageSeo({
  title: t("home.meta_title"),
  description: t("home.meta_desc"),
  canonical: "/",
});

const hasSeoText = computed(() => t("home.seo_title") !== "home.seo_title");
const seoExpanded = ref(false);

const faqItems = computed(() => [
  { q: t("home.faq.q1"), a: t("home.faq.a1") },
  { q: t("home.faq.q2"), a: t("home.faq.a2") },
  { q: t("home.faq.q3"), a: t("home.faq.a3") },
  { q: t("home.faq.q4"), a: t("home.faq.a4") },
  { q: t("home.faq.q5"), a: t("home.faq.a5") },
]);

const BASE_URL = "https://basen.uz";

watchEffect(() => {
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
        children: JSON.stringify(faqSchema),
        key: "schema-home-faq",
      },
    ],
  });
});
</script>
