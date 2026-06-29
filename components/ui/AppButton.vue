<template>
  <component
    :is="tag"
    :class="classes"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <span v-if="loading" class="inline-flex items-center justify-center">
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    </span>
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'telegram'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  tag?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  tag: 'button',
})

const base = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

const variants = {
  primary:   'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-700 focus-visible:ring-primary-500',
  secondary: 'bg-primary-50 text-primary-700 hover:bg-primary-100 active:bg-primary-100 focus-visible:ring-primary-400',
  ghost:     'bg-transparent text-primary-600 hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-primary-400',
  telegram:  'bg-[#0088cc] text-white hover:bg-[#0077b3] active:bg-[#006699] focus-visible:ring-[#0088cc]',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
}

const classes = computed(() => [base, variants[props.variant], sizes[props.size]])
</script>
