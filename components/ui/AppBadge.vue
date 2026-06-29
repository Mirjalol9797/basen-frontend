<template>
  <span :class="classes">
    <component :is="icon" v-if="icon" class="shrink-0" :class="iconSize" />
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  color?: 'blue' | 'cyan' | 'green' | 'yellow' | 'red' | 'gray'
  size?: 'sm' | 'md'
  icon?: Component
}

const props = withDefaults(defineProps<Props>(), {
  color: 'blue',
  size: 'md',
})

const colors = {
  blue:   'bg-primary-50 text-primary-700',
  cyan:   'bg-cyan-50 text-cyan-700',
  green:  'bg-green-50 text-green-700',
  yellow: 'bg-yellow-50 text-yellow-700',
  red:    'bg-red-50 text-red-700',
  gray:   'bg-gray-100 text-gray-600',
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs gap-1 rounded-md',
  md: 'px-2.5 py-1 text-xs gap-1.5 rounded-lg',
}

const iconSize = computed(() => props.size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5')

const classes = computed(() => [
  'inline-flex items-center font-medium',
  colors[props.color],
  sizes[props.size],
])
</script>
