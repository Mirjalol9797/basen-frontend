<template>
  <div>
    <template v-for="(item, i) in rendered" :key="i">
      <!-- Section header (top-level, e.g. one price sheet of a swim school) -->
      <h3
        v-if="item.kind === 'section'"
        class="text-sm font-bold text-gray-900 pt-5 first:pt-0 mb-1"
      >
        {{ $t(item.title!) }}
      </h3>
      <!-- Group header (sub-group within a section, e.g. a membership type) -->
      <h4
        v-else-if="item.kind === 'group'"
        class="text-xs font-semibold uppercase tracking-wide text-gray-400 pt-3 mb-0.5"
      >
        {{ $t(item.title!) }}
      </h4>
      <!-- Price row -->
      <div
        v-else
        class="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
      >
        <span class="text-sm text-gray-600">{{ $t(item.price!.key) }}</span>
        <span class="text-sm font-semibold text-gray-900 tabular-nums">
          {{ formatPrice(item.price!.amount, item.price!.currency) }}
        </span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { PriceItem } from '~/types/pool'

const props = defineProps<{ prices: PriceItem[] }>()

type RenderItem =
  | { kind: 'section'; title: string }
  | { kind: 'group'; title: string }
  | { kind: 'row'; price: PriceItem }

// Walk the list once, emitting a section/group header whenever it changes so a
// long price list reads as titled blocks. Pools without section/group render as
// a plain flat list.
const rendered = computed<RenderItem[]>(() => {
  const out: RenderItem[] = []
  let curSection: string | undefined
  let curGroup: string | undefined
  for (const price of props.prices) {
    if (price.section && price.section !== curSection) {
      curSection = price.section
      curGroup = undefined
      out.push({ kind: 'section', title: price.section })
    }
    if (price.group && price.group !== curGroup) {
      curGroup = price.group
      out.push({ kind: 'group', title: price.group })
    }
    out.push({ kind: 'row', price })
  }
  return out
})
</script>
