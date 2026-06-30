<template>
  <span :class="badgeClass">
    <span :class="dotClass" />
    {{ label }}
    <template v-if="timeHint"> · {{ timeHint }}</template>
  </span>
</template>

<script setup lang="ts">
import type { ScheduleDay } from '~/types/pool'

const props = defineProps<{ schedule: ScheduleDay[] | null }>()

const { t } = useI18n()

const open = computed(() => isOpenNow(props.schedule))
const entry = computed(() => getTodayEntry(props.schedule))

const label = computed(() =>
  open.value ? t('schedule.open_now') : t('schedule.closed_now')
)

const timeHint = computed(() => {
  if (!entry.value || entry.value.closed) return null
  if (open.value) return t('schedule.open_until', { time: entry.value.close })
  return null
})

const badgeClass = computed(() => [
  'inline-flex items-center gap-1.5 text-xs font-medium',
  open.value ? 'text-green-700' : 'text-gray-400',
])

const dotClass = computed(() => [
  'w-1.5 h-1.5 rounded-full shrink-0',
  open.value ? 'bg-green-500 animate-pulse' : 'bg-gray-300',
])
</script>
