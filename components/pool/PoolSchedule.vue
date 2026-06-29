<template>
  <div class="space-y-1">
    <div
      v-for="entry in schedule"
      :key="entry.day"
      class="flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors"
      :class="entry.day === todayKey
        ? 'bg-primary-50 font-semibold'
        : 'hover:bg-gray-50'"
    >
      <div class="flex items-center gap-2">
        <span
          class="w-1.5 h-1.5 rounded-full shrink-0"
          :class="entry.day === todayKey ? 'bg-primary-500' : 'bg-transparent'"
        />
        <span :class="entry.day === todayKey ? 'text-primary-700' : 'text-gray-700'">
          {{ $t(`schedule.${entry.day}`) }}
        </span>
        <span v-if="entry.day === todayKey" class="text-xs text-primary-400 font-normal">
          ({{ $t('common.today') }})
        </span>
      </div>
      <span
        :class="entry.closed
          ? 'text-red-400'
          : entry.day === todayKey ? 'text-primary-700' : 'text-gray-500'"
      >
        {{ entry.closed ? $t('schedule.closed') : `${entry.open} – ${entry.close}` }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ScheduleDay } from '~/types/pool'

defineProps<{ schedule: ScheduleDay[] }>()

const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const
const todayKey = DAYS[new Date().getDay()]
</script>
