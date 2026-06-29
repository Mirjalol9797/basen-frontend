<template>
  <div class="relative">
    <select
      :value="modelValue"
      :disabled="disabled"
      :class="selectClasses"
      v-bind="$attrs"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-if="placeholder" value="" disabled :selected="!modelValue">
        {{ placeholder }}
      </option>
      <option
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
      >
        {{ opt.label }}
      </option>
    </select>

    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
      <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface SelectOption {
  value: string
  label: string
}

interface Props {
  modelValue?: string
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

defineEmits<{ 'update:modelValue': [value: string] }>()
defineOptions({ inheritAttrs: false })

const sizes = {
  sm: 'py-1.5 text-sm',
  md: 'py-2.5 text-sm',
  lg: 'py-3 text-base',
}

const selectClasses = computed(() => [
  'w-full appearance-none rounded-xl border border-gray-200 bg-white pl-4 pr-9 transition-colors duration-150',
  'text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:border-primary-400 focus:ring-primary-100',
  'disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed',
  sizes[props.size],
])
</script>
