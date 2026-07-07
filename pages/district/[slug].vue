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
      <div v-if="seoText" class="bg-white border-b border-gray-100">
        <div class="container py-5">
          <p class="text-sm text-gray-500 leading-relaxed">
            {{ seoText }}
          </p>
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
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
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
    .sort((a, b) => b.rating - a.rating)
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

const districtSeoTextMap: Record<string, string> = {
  yunusabad:
    "Юнусабадский район — лидер по числу бассейнов в Ташкенте: здесь работают сразу три аквапарка («Аквалэнд», Water Park Tashkent и Ташкентский Аквапарк), а также бассейны при крупных отелях — Radisson Blu Tashkent и Wyndham, куда можно попасть не только гостям отеля. Для круглогодичных тренировок подойдёт крытый «Дворец водного спорта» с дорожками и подогревом воды. По району проходит Юнусабадская линия метро, поэтому большинство объектов легко добраться из любой части города. Юнусабад одинаково хорошо подходит и для активного отдыха с горками всей семьёй, и для спокойного плавания зимой в закрытом бассейне. Летом здесь особенно много вариантов для детей — горки и мелководье в аквапарках рассчитаны на разный возраст. Если вы ищете бассейн с полным набором услуг — кафе, парковка, спа — стоит начать поиск именно с этого района.",
  chilanzar:
    "Чиланзарский район — один из старейших и самых населённых спальных районов Ташкента, назван в честь одноимённой линии метро, которая делает бассейны района удобно доступными без машины. Здесь есть детский бассейн «Аквамир», аквапарк OASIS с горками для всей семьи, бассейн при гостинице «Мехнат», а также крытые комплексы Dubai Spa и Magic Galaxy для занятий в любую погоду. Благодаря плотной жилой застройке большинство объектов района находятся в шаговой доступности от жилых кварталов — удобно для регулярных тренировок и семейного отдыха по выходным без долгой дороги. Чиланзар подойдёт как родителям с маленькими детьми, так и тем, кто ищет крытый бассейн для плавания круглый год.",
  "mirzo-ulugbek":
    "Мирзо-Улугбекский район — крупный северо-восточный район Ташкента с несколькими профильными спортивными комплексами. Здесь работает «Олимпийский спорткомплекс» с бассейном для серьёзных тренировок, крытый аквапарк MONACO с подогреваемой водой круглый год, а также фитнес-бассейны Academy Athletica и МВЭС Inter Sport. Любителям спокойного отдыха у воды подойдёт lounge-формат бассейна «Мохито», а спортивно-оздоровительный комплекс Yoshlik — вариант для всей семьи. Район известен своими научными и учебными учреждениями, поэтому многие бассейны здесь ориентированы на регулярные занятия и абонементы, а не только на разовые посещения летом. Если нужен крытый бассейн с тренером или дорожками для плавания зимой — Мирзо-Улугбек один из лучших вариантов в городе.",
  yakkasaray:
    "Яккасарайский район — компактный центральный район Ташкента с посольствами и деловой застройкой, поэтому бассейны здесь тяготеют к премиальному сегменту. Бассейн пятизвёздочного отеля Grand Serena — закрытый, с джакузи и спа-зоной, доступен и внешним посетителям, не только постояльцам. Бассейн Garden Park — более демократичный открытый вариант для отдыха на свежем воздухе. Из-за центрального расположения добраться сюда легко из любой точки города, а расположение рядом с деловым центром делает район удобным выбором для тех, кто хочет совместить бассейн с рабочим днём или деловой встречей неподалёку.",
  sergeli:
    "Сергелийский район — активно растущий южный район Ташкента, куда несколько лет назад была продлена линия метро, что заметно упростило доступ к местным бассейнам. Здесь сосредоточено сразу три аквапарка — Atlantis, «Солнечный город» и Green Paradise — с горками и зонами для детей, а также открытые бассейны Astera Sea и Dos Hermanas by Alena для летнего отдыха. Район подходит семьям, которые ищут бюджетные и разнообразные варианты для отдыха на воде в тёплый сезон: большинство объектов работают с мая по сентябрь. Благодаря новой застройке инфраструктура вокруг бассейнов (парковки, кафе) в Сергели, как правило, современная.",
  mirobod:
    "Мирабадский район — один из центральных районов Ташкента, где сочетаются бизнес-отели и спортивная инфраструктура. Здесь работает аквапарк Limpopo, бассейны при отелях Lotte City Hotel Tashkent Palace и Grand Mir (Villa Grand), детский бассейн Born2swim с программами для малышей и Chekhov Sport Club для серьёзных тренировок. Центральное расположение делает район удобным как для туристов, живущих в отелях с бассейном, так и для местных жителей, которые ищут детский бассейн или спортивный клуб рядом с домом. В Мирабаде можно найти варианты на любой бюджет — от премиальных отельных бассейнов до доступных спортивных комплексов.",
  yashnabad:
    "Яшнободский район — восточный район Ташкента с несколькими открытыми бассейнами для летнего отдыха. Комплексы Paradise, TaoYuan и «Акапулько» предлагают террасы, зоны для детей и кафе — подойдут для семейного отдыха на выходных в тёплый сезон. Бассейн при отеле Le Grand De Plaza — вариант для тех, кто предпочитает более закрытую и спокойную атмосферу. Большинство бассейнов района сезонные и открываются с мая, поэтому лучше уточнять актуальный график перед поездкой зимой. Яшнобад — хороший выбор, если вы ищете открытый бассейн с рестораном для отдыха всей компанией.",
  bektemir:
    "Бектемирский район — южная окраина Ташкента с более просторной застройкой, из-за чего здесь особенно много крупных открытых бассейнов с террасами и зелёными зонами. Malibu Sun Club — один из самых популярных летних комплексов города с рестораном и лежаками, Grace Garden и развлекательный комплекс «АЛЕКС» предлагают похожий формат отдыха, а «Три пальмы» (Three Palms Beach Club) — вариант в стиле пляжного клуба. Все объекты района работают в летний сезон и рассчитаны на отдых на весь день — с едой, музыкой и зонами для детей, а не только на короткое посещение бассейна.",
  uchtepa:
    "Учтепинский район — западный район Ташкента, где пока представлен один крупный открытый бассейн, Azizbek City Pool, с классическим летним форматом отдыха. Выбор в районе меньше, чем в соседних Чиланзаре или Олмазоре, поэтому если ищете больше вариантов — стоит заглянуть и в каталог соседних районов. Мы регулярно добавляем новые объекты, и список бассейнов Учтепы будет пополняться.",
  shayhontohur:
    "Шайхонтохурский район — исторический центр Ташкента рядом с базаром Чорсу, где расположено несколько специализированных бассейнов. STUDIO 13 — детский бассейн с программами для малышей, Women Avenue — крытый комплекс, а спортивно-оздоровительный центр JAR подойдёт тем, кто ищет серьёзные тренировки и дорожки для плавания. Благодаря центральному расположению добраться сюда легко из любой части города, а разнообразие форматов — от детского до спортивного — делает район удобным выбором для конкретных задач, а не только для летнего отдыха.",
  almazar:
    "Олмазорский район — один из районов Ташкента, где каталог Basen.uz пока пополняется: актуальных бассейнов с полными данными здесь на данный момент нет. Если вы знаете бассейн в этом районе или являетесь его владельцем — напишите нам в Telegram, и мы добавим объект в каталог. А пока стоит заглянуть в соседние Чиланзарский или Юнусабадский районы — там представлен более широкий выбор открытых и крытых бассейнов.",
};

const seoText = computed(() => districtSeoTextMap[slug] ?? "");

watchEffect(() => {
  if (!district.value) return;

  const BASE_URL = "https://basen.uz";
  const nameForSeo = districtNameForTitle.value;
  const count = pools.value.length;

  usePageSeo({
    title: t("district.meta_title", { name: nameForSeo }),
    description: t("district.meta_desc", { name: nameForSeo, count }),
    canonical: `/district/${slug}`,
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

  useHead({
    script: [
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
    ],
  });
});
</script>
