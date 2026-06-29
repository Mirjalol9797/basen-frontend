<template>
  <div :class="classes" :style="style" />
</template>

<script setup lang="ts">
interface Props {
  variant?: 'text' | 'rect' | 'circle'
  width?: string
  height?: string
  rounded?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'rect',
})

const base = 'animate-pulse bg-gray-200'

const variantClass = computed(() => ({
  text:   'rounded h-4',
  rect:   'rounded-xl',
  circle: 'rounded-full',
}[props.variant]))

const classes = computed(() => [
  base,
  variantClass.value,
  props.rounded,
])

const style = computed(() => ({
  width:  props.width,
  height: props.height,
}))
</script>
