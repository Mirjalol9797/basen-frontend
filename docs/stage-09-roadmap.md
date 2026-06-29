# Этап 9 — Roadmap разработки

## Принципы

- Каждая фаза завершается **рабочим результатом** — не незаконченным кодом
- Фазы 1–4 строго последовательны (фундамент)
- Фазы 5–9 можно вести параллельно
- Реальные данные заносим в **фазе 11** — не раньше
- Деплой после фазы 12

---

## Фаза 1 — Инициализация проекта
*Цель: рабочий пустой Nuxt 3 проект со всей конфигурацией*

- [ ] `npx nuxi@latest init basenuz-frontend`
- [ ] Установить все модули: tailwindcss, i18n, @nuxt/image, pinia, vueuse, sitemap, schema-org
- [ ] `tailwind.config.ts` — вставить Design Tokens из Этапа 3
- [ ] `nuxt.config.ts` — настроить по Этапу 4
- [ ] Файловая структура папок: `components/ui|layout|pool|catalog|map|home`
- [ ] `assets/css/main.css` — подключить Inter, глобальные стили
- [ ] `locales/ru.json`, `uz.json`, `en.json` — базовая структура i18n ключей
- [ ] `app.vue` — минимальная обёртка
- [ ] Проверка: `npm run dev` открывается без ошибок

**Итог:** голый проект, правильная структура, все зависимости установлены.

---

## Фаза 2 — TypeScript типы и Data Layer
*Цель: типизированные данные, рабочие composables с тестовыми данными*

- [ ] `types/pool.ts` — Pool, RawPool, PriceItem, ScheduleDay, Review, PoolFilters
- [ ] `types/category.ts`, `types/filter.ts`
- [ ] `data/categories.json` — 6 категорий по схеме Этапа 5
- [ ] `data/districts.json` — 12 районов Ташкента
- [ ] `data/pools.json` — **3–5 тестовых бассейна** (заглушки, реальные в фазе 11)
- [ ] `data/reviews.json` — тестовые отзывы
- [ ] `utils/normalizePool.ts`, `utils/formatPrice.ts`, `utils/isOpenNow.ts`, `utils/slugify.ts`
- [ ] `stores/pools.ts` — init(), normalizePool, watch(locale)
- [ ] `stores/filters.ts` — defaultFilters(), активные фильтры
- [ ] `stores/ui.ts` — isFilterDrawerOpen, isMapView
- [ ] `composables/usePools.ts` — filtered + sorted список
- [ ] `composables/usePool.ts` — один бассейн + похожие
- [ ] `composables/useFilters.ts` — логика фильтрации
- [ ] `composables/useSearch.ts` — клиентский поиск
- [ ] `composables/useSeo.ts` — мета-теги

**Итог:** вся логика данных работает, компоненты ещё не написаны.

---

## Фаза 3 — UI Атомы (`components/ui/`)
*Цель: полная библиотека базовых компонентов*

- [ ] `AppButton.vue` — 4 варианта (primary, secondary, ghost, telegram), 3 размера, loading, disabled
- [ ] `AppBadge.vue` — label, color, icon
- [ ] `AppRating.vue` — звёзды + счётчик
- [ ] `AppSkeleton.vue` — animated pulse placeholder
- [ ] `AppInput.vue` — с иконкой, clearable
- [ ] `AppSelect.vue` — dropdown список
- [ ] `AppToggle.vue` — переключатель
- [ ] `AppRangeSlider.vue` — диапазон цен
- [ ] `AppModal.vue` — с backdrop, Escape, размеры
- [ ] `AppDrawer.vue` — bottom sheet, overlay, анимация slide-up

**Итог:** все атомарные компоненты готовы и переиспользуются везде дальше.

---

## Фаза 4 — Layout
*Цель: рабочая оболочка сайта на всех устройствах*

- [ ] `layouts/default.vue` — header + main slot + footer
- [ ] `layouts/minimal.vue` — только main slot (для 404)
- [ ] `components/layout/AppHeader.vue` — лого, nav dropdown, поиск, язык
- [ ] `components/layout/AppFooter.vue` — навигация, копирайт
- [ ] `components/layout/AppBottomNav.vue` — 4 таба, только мобайл
- [ ] `components/layout/AppBreadcrumb.vue` — + BreadcrumbList schema
- [ ] Проверка адаптива: 390px / 768px / 1280px

**Итог:** открыв любую страницу — видим правильный header и footer.

---

## Фаза 5 — Pool-компоненты (`components/pool/`)
*Цель: все строительные блоки для детальной страницы*

- [ ] `PoolCard.vue` — variant: default, horizontal, compact
- [ ] `PoolGallery.vue` — hero grid (десктоп) + Swiper (мобайл) + AppModal
- [ ] `PoolSchedule.vue` — таблица + текущий день + isOpenNow
- [ ] `PoolPrices.vue` — таблица / карточки (мобайл)
- [ ] `PoolContact.vue` — сайдбар (десктоп) + sticky footer (мобайл)
- [ ] `PoolReviews.vue` — список + рейтинг-распределение
- [ ] `PoolSimilar.vue` — 4 карточки горизонтальный скролл

---

## Фаза 6 — Главная страница (`pages/index.vue`)
*Цель: полностью рабочая главная*

- [ ] `HomeHero.vue` — фон, H1, AppInput, быстрые теги
- [ ] `HomeCategories.vue` — 6 плиток
- [ ] `HomeSeasonal.vue` — динамика по месяцу
- [ ] `HomePopular.vue` — featured бассейны
- [ ] `HomeMapPreview.vue` — превью + кнопка
- [ ] `HomeStats.vue` — 3 цифры
- [ ] `pages/index.vue` — собрать все блоки, SEO meta, Schema WebSite

---

## Фаза 7 — Каталог и Детальная страница
*Цель: основные рабочие страницы продукта*

**Каталог:**
- [ ] `CatalogFilters.vue` — все фильтры, instant apply
- [ ] `CatalogSort.vue`
- [ ] `CatalogGrid.vue` — skeleton + empty state + пагинация
- [ ] `pages/catalog/index.vue` — layout desktop/mobile, URL sync фильтров, SEO

**Детальная:**
- [ ] `pages/catalog/[slug].vue` — двухколоночный layout, все pool-компоненты, SEO, Schema LocalBusiness

---

## Фаза 8 — Карта (`pages/map.vue`)
*Цель: рабочая интерактивная карта*

- [ ] Установить `maplibre-gl`
- [ ] `MapView.vue` — ClientOnly, тайлы OSM, fitBounds
- [ ] `MapMarker.vue` — кастомные иконки по категории
- [ ] `MapPopup.vue` — bottom sheet (мобайл) / overlay (десктоп)
- [ ] `pages/map.vue` — геолокация, фильтры-теги, кнопка "Список"

---

## Фаза 9 — Оставшиеся страницы
- [ ] `pages/category/[type].vue` — hero + CatalogGrid + SEO-текст + Schema ItemList
- [ ] `pages/search.vue` — строка + результаты + noindex
- [ ] `pages/about.vue`
- [ ] `pages/faq.vue` — аккордеон + Schema FAQPage
- [ ] `pages/[...slug].vue` — 404 с иллюстрацией

---

## Фаза 10 — SEO-слой
- [ ] `useSeo.ts` — применить на всех страницах
- [ ] Schema.org на каждом типе страниц (LocalBusiness, ItemList, FAQPage, BreadcrumbList)
- [ ] hreflang — проверить автогенерацию nuxt-i18n
- [ ] `public/robots.txt`
- [ ] `sitemap.xml` — настроить `@nuxtjs/sitemap` с динамическими маршрутами
- [ ] OG-изображения для главной и категорий (1200×630)
- [ ] Проверка: Google Rich Results Test на каждую схему

---

## Фаза 11 — Реальные данные
*Цель: заполнить каталог настоящими бассейнами Ташкента*

- [ ] Собрать данные на **20–30 бассейнов** (название, адрес, телефон, Telegram, координаты)
- [ ] Сфотографировать или собрать фото (мин. 3 фото на объект)
- [ ] Заполнить реальные цены и расписание
- [ ] Написать описания (можно русский, узбекский — приоритет)
- [ ] Добавить координаты в `pools.json`
- [ ] Тестовые отзывы (3–5 на каждый бассейн)
- [ ] Проверить все slug — уникальность, транслитерация

**Источники данных:** pools.uz (названия), 2GIS, Yandex Карты, звонки.

---

## Фаза 12 — Полировка и Pre-launch
- [ ] Анимации: card hover, page transitions, drawer
- [ ] Все empty states и error states
- [ ] Проверить все 3 языка (ru / uz / en)
- [ ] Cross-browser: Chrome, Safari, Firefox
- [ ] Mobile-тестирование: Android Chrome, Safari iOS
- [ ] PageSpeed Insights mobile ≥ 90
- [ ] Все изображения → WebP, с alt-тестами
- [ ] Прогнать SEO-чеклист из Этапа 8
- [ ] Подключить Google Search Console
- [ ] `npm run build` + `npm run preview` — финальная проверка

---

## Сводная таблица фаз

| Фаза | Что делаем | Приоритет |
|------|-----------|-----------|
| 1 | Инициализация + конфиг | Критично |
| 2 | Типы + Data Layer | Критично |
| 3 | UI Атомы | Критично |
| 4 | Layout | Критично |
| 5 | Pool-компоненты | Высокий |
| 6 | Главная | Высокий |
| 7 | Каталог + Детальная | Высокий |
| 8 | Карта | Средний |
| 9 | Остальные страницы | Средний |
| 10 | SEO-слой | Высокий |
| 11 | Реальные данные | Критично перед деплоем |
| 12 | Полировка + Pre-launch | Критично перед деплоем |

---

**Этап 9 завершён. Всё проектирование завершено.**
Готов начать Фазу 1 — инициализацию проекта. Подтверждаешь старт разработки?
