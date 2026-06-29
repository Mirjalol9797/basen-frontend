<template>
  <div class="relative">
    <div v-if="$slots.icon || icon" class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
      <slot name="icon">
        <component :is="icon" class="w-4 h-4" />
      </slot>
    </div>

    <input
      v-bind="$attrs"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClasses"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <button
      v-if="clearable && modelValue"
      type="button"
      class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
      @click="$emit('update:modelValue', '')"
    >
      <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  icon?: Component
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  size: 'md',
})

defineEmits<{ 'update:modelValue': [value: string] }>()
defineOptions({ inheritAttrs: false })

const hasLeftIcon = computed(() => !!(useSlots().icon || props.icon))

const sizes = {
  sm: 'py-1.5 text-sm',
  md: 'py-2.5 text-sm',
  lg: 'py-3 text-base',
}

const inputClasses = computed(() => [
  'w-full rounded-xl border bg-white transition-colors duration-150',
  'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0',
  'disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed',
  hasLeftIcon.value ? 'pl-9' : 'pl-4',
  props.clearable ? 'pr-9' : 'pr-4',
  sizes[props.size],
  props.error
    ? 'border-red-300 focus:border-red-400 focus:ring-red-200'
    : 'border-gray-200 focus:border-primary-400 focus:ring-primary-100',
])
</script>
