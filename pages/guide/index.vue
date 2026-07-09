<template>
  <div>
    <!-- Hero -->
    <section class="bg-gray-900 text-white py-14 sm:py-20">
      <div class="container text-center">
        <h1 class="text-3xl sm:text-4xl font-bold mb-3">{{ $t('guide.title') }}</h1>
        <p class="text-gray-300 text-lg">{{ $t('guide.subtitle') }}</p>
      </div>
    </section>

    <div class="container py-12 sm:py-16">
      <!-- Empty state -->
      <div v-if="guides.length === 0" class="text-center py-16">
        <p class="text-4xl mb-4">📝</p>
        <p class="text-gray-700 font-semibold mb-1">{{ $t('guide.empty_title') }}</p>
        <p class="text-gray-500 mb-6">{{ $t('guide.empty_desc') }}</p>
        <NuxtLink
          :to="localePath('/catalog')"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
        >
          {{ $t('guide.see_catalog') }}
        </NuxtLink>
      </div>

      <!-- Guide cards -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <NuxtLink
          v-for="g in guides"
          :key="g.slug"
          :to="localePath(`/guide/${g.slug}`)"
          class="group block bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-200 p-6 border border-gray-100"
        >
          <h2 class="font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {{ g.title }}
          </h2>
          <p class="text-sm text-gray-500 leading-relaxed mb-4">{{ g.excerpt }}</p>
          <span class="text-sm font-semibold text-primary-600">{{ $t('guide.read_more') }} →</span>
        </NuxtLink>
      </div>

      <!-- FAQ -->
      <div class="mt-14 pt-10 border-t border-gray-100">
        <h2 class="text-lg font-bold text-gray-900 mb-4">{{ $t('guide.faq_title') }}</h2>
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
              <span class="font-medium text-gray-900 text-sm leading-snug">{{ item.q }}</span>
              <svg
                class="w-4 h-4 shrink-0 text-primary-600 transition-transform duration-200"
                :class="{ 'rotate-180': openFaqIndex === index }"
                viewBox="0 0 20 20" fill="currentColor"
              >
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
              </svg>
            </button>
            <div v-if="openFaqIndex === index" class="px-4 pb-3.5 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-3">
              {{ item.a }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { guides } = useGuides()

usePageSeo({
  title: t('guide.meta_title'),
  description: t('guide.meta_desc'),
  canonical: '/guide',
})

const faqItems = computed(() => [
  { q: t('guide.faq.q1'), a: t('guide.faq.a1') },
  { q: t('guide.faq.q2'), a: t('guide.faq.a2') },
  { q: t('guide.faq.q3'), a: t('guide.faq.a3') },
])
const openFaqIndex = ref<number | null>(null)

const BASE_URL = 'https://basen.uz'

watchEffect(() => {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('guide.title'),
    description: t('guide.meta_desc'),
    url: `${BASE_URL}/guide`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: guides.value.length,
      itemListElement: guides.value.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: g.title,
        url: `${BASE_URL}/guide/${g.slug}`,
      })),
    },
  }

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: t('guide.title'),
    description: t('guide.meta_desc'),
    url: `${BASE_URL}/guide`,
    blogPost: guides.value.map(g => ({
      '@type': 'BlogPosting',
      headline: g.title,
      description: g.excerpt,
      url: `${BASE_URL}/guide/${g.slug}`,
      datePublished: g.publishedAt,
      dateModified: g.updatedAt ?? g.publishedAt,
      author: { '@type': 'Organization', name: t('guide.author_name') },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('nav.home'), item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: t('nav.guide'), item: `${BASE_URL}/guide` },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.value.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  useHead({
    script: [
      { type: 'application/ld+json', children: JSON.stringify(collectionSchema), key: 'schema-collection' },
      { type: 'application/ld+json', children: JSON.stringify(blogSchema), key: 'schema-blog' },
      { type: 'application/ld+json', children: JSON.stringify(breadcrumbSchema), key: 'schema-breadcrumb' },
      { type: 'application/ld+json', children: JSON.stringify(faqSchema), key: 'schema-faq' },
    ],
  })
})
</script>
