<template>
  <footer class="bg-primary-900 text-white mt-auto">
    <div class="container py-10">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <!-- Brand -->
        <div>
          <NuxtLink :to="localePath('/')" class="flex items-center gap-2 mb-3">
            <div
              class="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-aqua-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M3 17c1.5 0 2.5-1 4-1s2.5 1 4 1 2.5-1 4-1 2.5 1 4 1v2c-1.5 0-2.5-1-4-1s-2.5 1-4 1-2.5-1-4-1-2.5 1-4 1v-2zm0-4c1.5 0 2.5-1 4-1s2.5 1 4 1 2.5-1 4-1 2.5 1 4 1v2c-1.5 0-2.5-1-4-1s-2.5 1-4 1-2.5-1-4-1-2.5 1-4 1v-2zM12 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-5 5l3 3h-2v3h4v-3h-2l3-3"
                />
              </svg>
            </div>
            <span class="text-lg font-bold"
              >Basen<span class="text-aqua-400">.uz</span></span
            >
          </NuxtLink>
          <p class="text-sm text-primary-200 leading-relaxed">
            {{ $t("home.hero_subtitle") }}
          </p>
        </div>

        <!-- Navigation -->
        <div>
          <h3
            class="text-sm font-semibold text-white mb-3 uppercase tracking-wide"
          >
            {{ $t("nav.catalog") }}
          </h3>
          <ul class="space-y-2">
            <li v-for="link in footerLinks" :key="link.key">
              <NuxtLink
                :to="localePath(link.to)"
                class="text-sm text-primary-200 hover:text-white transition-colors duration-150"
              >
                {{ $t(link.label) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Info -->
        <div>
          <h3
            class="text-sm font-semibold text-white mb-3 uppercase tracking-wide"
          >
            {{ $t("nav.about") }}
          </h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink
                :to="localePath('/about')"
                class="text-sm text-primary-200 hover:text-white transition-colors duration-150"
              >
                {{ $t("about.title") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                :to="localePath('/faq')"
                class="text-sm text-primary-200 hover:text-white transition-colors duration-150"
              >
                {{ $t("faq.title") }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <p class="text-xs text-primary-300">
          © {{ currentYear }} Basen.uz —
          <span>лучший каталог бассейнов Ташкента</span>
        </p>
        <div class="flex items-center gap-0.5 bg-white/10 rounded-lg p-0.5">
          <NuxtLink
            v-for="loc in availableLocales"
            :key="loc.code"
            :to="switchLocalePath(loc.code)"
            class="px-2.5 py-1 rounded-md text-xs font-semibold transition-all duration-150"
            :class="
              locale === loc.code
                ? 'bg-white text-slate-600'
                : 'text-primary-200 hover:text-white'
            "
          >
            {{ loc.code.toUpperCase() }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const currentYear = new Date().getFullYear();

const footerLinks = [
  { key: "catalog", to: "/catalog", label: "nav.catalog" },
  { key: "map", to: "/map", label: "nav.map" },
];

const availableLocales = computed(
  () => locales.value as { code: string; name: string }[]
);
</script>
