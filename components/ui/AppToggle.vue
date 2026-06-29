<template>
  <button
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :disabled="disabled"
    :class="trackClasses"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span :class="thumbClasses" />
  </button>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  disabled?: boolean
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

defineEmits<{ 'update:modelValue': [value: boolean] }>()

const trackSize = computed(() => props.size === 'sm'
  ? 'w-8 h-5'
  : 'w-11 h-6'
)

const thumbSize = computed(() => props.size === 'sm'
  ? 'w-3.5 h-3.5'
  : 'w-4 h-4'
)

const thumbTranslate = computed(() => {
  if (props.size === 'sm') return props.modelValue ? 'translate-x-3.5' : 'translate-x-0.5'
  return props.modelValue ? 'translate-x-5' : 'translate-x-1'
})

const trackClasses = computed(() => [
  'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
  'disabled:opacity-50 disabled:cursor-not-allowed',
  trackSize.value,
  props.modelValue ? 'bg-primary-600' : 'bg-gray-200',
])

const thumbClasses = computed(() => [
  'pointer-events-none inline-block rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out',
  'translate-y-0',
  thumbSize.value,
  thumbTranslate.value,
])
</script>
