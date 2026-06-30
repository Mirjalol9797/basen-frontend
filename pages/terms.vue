<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-br from-gray-800 via-gray-900 to-primary-900 text-white py-12 sm:py-16">
      <div class="container text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm mb-5">
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
          </svg>
          Basen.uz
        </div>
        <h1 class="text-3xl sm:text-4xl font-bold mb-3">{{ $t('terms.title') }}</h1>
        <p class="text-gray-300 text-base">{{ $t('terms.updated') }}</p>
      </div>
    </section>

    <div class="container py-10 sm:py-14 max-w-3xl">
      <div class="space-y-8">

        <!-- Section 1 -->
        <section class="bg-white rounded-2xl shadow-card p-6 sm:p-8">
          <SectionHeading num="1" :title="$t('terms.s1_title')" />
          <p class="text-gray-600 leading-relaxed text-sm">{{ $t('terms.s1_text') }}</p>
        </section>

        <!-- Section 2 -->
        <section class="bg-white rounded-2xl shadow-card p-6 sm:p-8">
          <SectionHeading num="2" :title="$t('terms.s2_title')" />
          <p class="text-gray-600 leading-relaxed text-sm">{{ $t('terms.s2_text') }}</p>
        </section>

        <!-- Section 3: accuracy — highlighted -->
        <section class="bg-white rounded-2xl shadow-card p-6 sm:p-8">
          <SectionHeading num="3" :title="$t('terms.s3_title')" />
          <div class="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-blue-500 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
              </svg>
              <p class="text-blue-700 text-sm leading-relaxed">{{ $t('terms.s3_text') }}</p>
            </div>
          </div>
        </section>

        <!-- Section 4 -->
        <section class="bg-white rounded-2xl shadow-card p-6 sm:p-8">
          <SectionHeading num="4" :title="$t('terms.s4_title')" />
          <p class="text-gray-600 leading-relaxed text-sm">{{ $t('terms.s4_text') }}</p>
        </section>

        <!-- Section 5 -->
        <section class="bg-white rounded-2xl shadow-card p-6 sm:p-8">
          <SectionHeading num="5" :title="$t('terms.s5_title')" />
          <p class="text-gray-600 leading-relaxed text-sm">{{ $t('terms.s5_text') }}</p>
        </section>

        <!-- Section 6 -->
        <section class="bg-white rounded-2xl shadow-card p-6 sm:p-8">
          <SectionHeading num="6" :title="$t('terms.s6_title')" />
          <p class="text-gray-600 leading-relaxed text-sm">{{ $t('terms.s6_text') }}</p>
        </section>

        <!-- Section 7 -->
        <section class="bg-white rounded-2xl shadow-card p-6 sm:p-8">
          <SectionHeading num="7" :title="$t('terms.s7_title')" />
          <p class="text-gray-600 leading-relaxed text-sm">{{ $t('terms.s7_text') }}</p>
        </section>

        <!-- Section 8 -->
        <section class="bg-white rounded-2xl shadow-card p-6 sm:p-8">
          <SectionHeading num="8" :title="$t('terms.s8_title')" />
          <p class="text-gray-600 leading-relaxed text-sm">{{ $t('terms.s8_text') }}</p>
        </section>

        <!-- Section 9 -->
        <section class="bg-white rounded-2xl shadow-card p-6 sm:p-8">
          <SectionHeading num="9" :title="$t('terms.s9_title')" />
          <p class="text-gray-600 leading-relaxed text-sm">{{ $t('terms.s9_text') }}</p>
        </section>

        <!-- Section 10: Contact CTA -->
        <section class="bg-gradient-to-br from-primary-50 to-sky-50 rounded-2xl border border-primary-100 p-6 sm:p-8">
          <SectionHeading num="10" :title="$t('terms.s10_title')" />
          <p class="text-gray-600 text-sm mb-4">{{ $t('terms.s10_text') }}</p>
          <NuxtLink
            :to="localePath('/contacts')"
            class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-150"
          >
            <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {{ $t('terms.contact_link') }}
          </NuxtLink>
        </section>

        <!-- Also see privacy -->
        <div class="text-center text-sm text-gray-400">
          {{ $t('privacy.title') }}:
          <NuxtLink :to="localePath('/privacy')" class="text-primary-600 hover:underline ml-1">
            basen.uz/privacy →
          </NuxtLink>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

usePageSeo({
  title: t('terms.meta_title'),
  description: t('terms.meta_desc'),
  canonical: '/terms',
})

const SectionHeading = defineComponent({
  props: { num: String, title: String },
  render() {
    return h('h2', { class: 'text-lg font-bold text-gray-900 mb-3 flex items-center gap-2' }, [
      h('span', {
        class: 'w-7 h-7 rounded-lg bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center shrink-0',
      }, this.num),
      this.title,
    ])
  },
})
</script>
