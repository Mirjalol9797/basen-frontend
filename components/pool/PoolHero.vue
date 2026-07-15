<template>
  <div>
    <!-- Empty state -->
    <div
      v-if="gallery.length === 0"
      class="aspect-[16/7] rounded-2xl flex items-center justify-center bg-gradient-to-br"
      :class="placeholderClass"
    >
      <svg class="w-20 h-20 text-white/40" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 17c1.5 0 2.5-1 4-1s2.5 1 4 1 2.5-1 4-1 2.5 1 4 1v2c-1.5 0-2.5-1-4-1s-2.5 1-4 1-2.5-1-4-1-2.5 1-4 1v-2zm0-4c1.5 0 2.5-1 4-1s2.5 1 4 1 2.5-1 4-1 2.5 1 4 1v2c-1.5 0-2.5-1-4-1s-2.5 1-4 1-2.5-1-4-1-2.5 1-4 1v-2zM12 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-5 5l3 3h-2v3h4v-3h-2l3-3" />
      </svg>
    </div>

    <!-- Gallery -->
    <div v-else class="relative rounded-2xl overflow-hidden">
      <!-- Single photo -->
      <button
        v-if="gallery.length === 1"
        type="button"
        class="block w-full aspect-[16/7] cursor-zoom-in"
        @click="openLightbox(0)"
      >
        <FramedPhoto :src="gallery[0]" :alt="name" priority />
      </button>

      <!-- 2-4 photos: main + stacked side column -->
      <div v-else-if="gallery.length <= 4" class="flex gap-1 h-[260px] sm:h-[360px] md:h-[440px]">
        <button type="button" class="relative flex-[2] overflow-hidden cursor-zoom-in" @click="openLightbox(0)">
          <FramedPhoto :src="gallery[0]" :alt="name" priority />
        </button>
        <div class="flex flex-1 flex-col gap-1">
          <button
            v-for="(img, i) in gallery.slice(1)"
            :key="i"
            type="button"
            class="relative flex-1 overflow-hidden cursor-zoom-in group"
            @click="openLightbox(i + 1)"
          >
            <NuxtImg :src="img" :alt="`${name} ${i + 2}`" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" width="400" height="300" loading="lazy" />
          </button>
        </div>
      </div>

      <!-- 5+ photos: mosaic -->
      <div v-else class="grid grid-cols-4 grid-rows-2 gap-1 h-[260px] sm:h-[360px] md:h-[440px]">
        <button type="button" class="relative col-span-2 row-span-2 overflow-hidden cursor-zoom-in" @click="openLightbox(0)">
          <FramedPhoto :src="gallery[0]" :alt="name" priority />
        </button>
        <button
          v-for="(img, i) in gallery.slice(1, 5)"
          :key="i"
          type="button"
          class="relative overflow-hidden cursor-zoom-in group"
          @click="openLightbox(i + 1)"
        >
          <NuxtImg :src="img" :alt="`${name} ${i + 2}`" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" width="300" height="220" loading="lazy" />
          <div
            v-if="i === 3 && gallery.length > 5"
            class="absolute inset-0 bg-black/55 flex items-center justify-center text-white font-semibold text-lg"
          >
            +{{ gallery.length - 5 }}
          </div>
        </button>
      </div>

      <!-- Show all photos -->
      <button
        v-if="gallery.length > 0 && gallery.length <= 5"
        type="button"
        class="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-black/55 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-black/70 transition-colors"
        @click="openLightbox(0)"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M1 8a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 018.07 3h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0016.07 6H17a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V8zm13.5 3a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM10 14a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        </svg>
        {{ $t('common.all_photos', { count: gallery.length }) }}
      </button>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-[100] bg-black/95 flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          <!-- Top bar -->
          <div class="flex items-center justify-between px-4 sm:px-6 py-3 text-white shrink-0">
            <span class="text-sm text-white/70">{{ lightboxIdx + 1 }} / {{ gallery.length }}</span>
            <button type="button" class="p-2 rounded-full hover:bg-white/10 transition-colors" @click="closeLightbox">
              <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>

          <!-- Backdrop click to close -->
          <div class="absolute inset-0 -z-10" @click="closeLightbox" />

          <!-- Image + arrows -->
          <div class="relative flex-1 flex items-center justify-center px-2 sm:px-16 min-h-0">
            <button
              v-if="gallery.length > 1"
              type="button"
              class="absolute left-2 sm:left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              @click.stop="prev"
            >
              <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
              </svg>
            </button>

            <div class="relative w-full h-full flex items-center justify-center" @click.stop>
              <FramedPhoto :key="lightboxIdx" :src="gallery[lightboxIdx]" :alt="name" />
            </div>

            <button
              v-if="gallery.length > 1"
              type="button"
              class="absolute right-2 sm:right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              @click.stop="next"
            >
              <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <!-- Thumbnail strip -->
          <div v-if="gallery.length > 1" class="flex gap-2 px-4 py-3 overflow-x-auto shrink-0">
            <button
              v-for="(img, i) in gallery"
              :key="i"
              type="button"
              class="shrink-0 w-16 h-11 rounded-lg overflow-hidden ring-2 transition-all duration-150"
              :class="lightboxIdx === i ? 'ring-white' : 'ring-transparent opacity-50 hover:opacity-80'"
              @click.stop="lightboxIdx = i"
            >
              <NuxtImg :src="img" :alt="`${name} ${i + 1}`" class="w-full h-full object-cover" width="64" height="44" loading="lazy" />
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { PoolCategory } from '~/types/pool'

const props = defineProps<{
  gallery: string[]
  category: PoolCategory
  name: string
}>()

const placeholderClasses = {
  open:     'from-sky-400 to-blue-500',
  indoor:   'from-blue-500 to-indigo-700',
  children: 'from-cyan-400 to-teal-500',
  sport:    'from-blue-700 to-primary-900',
  hotel:    'from-violet-500 to-purple-700',
  aquapark: 'from-orange-400 to-amber-500',
} satisfies Record<PoolCategory, string>

const placeholderClass = computed(() => placeholderClasses[props.category])

const lightboxOpen = ref(false)
const lightboxIdx = ref(0)

function openLightbox(i: number) {
  lightboxIdx.value = i
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
}

function next() {
  lightboxIdx.value = (lightboxIdx.value + 1) % props.gallery.length
}

function prev() {
  lightboxIdx.value = (lightboxIdx.value - 1 + props.gallery.length) % props.gallery.length
}

watch(lightboxOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (!lightboxOpen.value) return
    if (e.key === 'Escape') closeLightbox()
    else if (e.key === 'ArrowRight') next()
    else if (e.key === 'ArrowLeft') prev()
  }
  document.addEventListener('keydown', onKey)
  onUnmounted(() => document.removeEventListener('keydown', onKey))
})
</script>
