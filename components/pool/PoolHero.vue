<template>
  <div>
    <!-- Main image -->
    <div class="relative aspect-[16/7] overflow-hidden bg-gray-100 rounded-2xl">
      <NuxtImg
        v-if="activeImage"
        :src="activeImage"
        :alt="name"
        class="w-full h-full object-cover"
        width="1200"
        height="525"
        priority
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center bg-gradient-to-br"
        :class="placeholderClass"
      >
        <svg class="w-20 h-20 text-white/40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 17c1.5 0 2.5-1 4-1s2.5 1 4 1 2.5-1 4-1 2.5 1 4 1v2c-1.5 0-2.5-1-4-1s-2.5 1-4 1-2.5-1-4-1-2.5 1-4 1v-2zm0-4c1.5 0 2.5-1 4-1s2.5 1 4 1 2.5-1 4-1 2.5 1 4 1v2c-1.5 0-2.5-1-4-1s-2.5 1-4 1-2.5-1-4-1-2.5 1-4 1v-2zM12 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-5 5l3 3h-2v3h4v-3h-2l3-3" />
        </svg>
      </div>

      <!-- Photo count badge -->
      <div v-if="gallery.length > 0" class="absolute bottom-3 right-3">
        <span class="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
          <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M1 8a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 018.07 3h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0016.07 6H17a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V8zm13.5 3a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM10 14a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
          </svg>
          {{ $t('common.all_photos', { count: gallery.length }) }}
        </span>
      </div>
    </div>

    <!-- Thumbnails -->
    <div v-if="gallery.length > 1" class="flex gap-2 mt-2 overflow-x-auto pb-1">
      <button
        v-for="(img, i) in gallery"
        :key="i"
        type="button"
        class="shrink-0 w-20 h-14 rounded-xl overflow-hidden ring-2 transition-all duration-150"
        :class="activeIdx === i ? 'ring-primary-500' : 'ring-transparent opacity-70 hover:opacity-100'"
        @click="activeIdx = i"
      >
        <NuxtImg
          :src="img"
          :alt="`${name} ${i + 1}`"
          class="w-full h-full object-cover"
          width="80"
          height="56"
          loading="lazy"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PoolCategory } from '~/types/pool'

const props = defineProps<{
  gallery: string[]
  category: PoolCategory
  name: string
}>()

const activeIdx = ref(0)
const activeImage = computed(() => props.gallery[activeIdx.value] ?? null)

const placeholderClasses = {
  open:     'from-sky-400 to-blue-500',
  indoor:   'from-blue-500 to-indigo-700',
  children: 'from-cyan-400 to-teal-500',
  sport:    'from-blue-700 to-primary-900',
  hotel:    'from-violet-500 to-purple-700',
  aquapark: 'from-orange-400 to-amber-500',
} satisfies Record<PoolCategory, string>

const placeholderClass = computed(() => placeholderClasses[props.category])
</script>
