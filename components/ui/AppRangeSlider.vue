<template>
  <div>
    <div class="flex items-center justify-between mb-3 text-sm text-gray-600">
      <span>{{ formatPrice(localMin) }}</span>
      <span>{{ formatPrice(localMax) }}</span>
    </div>

    <div class="relative h-5 flex items-center">
      <div class="absolute w-full h-1.5 bg-gray-200 rounded-full" />

      <div
        class="absolute h-1.5 bg-primary-500 rounded-full"
        :style="{ left: leftPercent + '%', width: (rightPercent - leftPercent) + '%' }"
      />

      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="localMin"
        class="range-thumb absolute w-full appearance-none bg-transparent pointer-events-none"
        @input="onMinInput"
      />

      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="localMax"
        class="range-thumb absolute w-full appearance-none bg-transparent pointer-events-none"
        @input="onMaxInput"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  min: number
  max: number
  modelMin: number
  modelMax: number
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  step: 10000,
})

const emit = defineEmits<{
  'update:modelMin': [value: number]
  'update:modelMax': [value: number]
}>()

const localMin = ref(props.modelMin)
const localMax = ref(props.modelMax)

watch(() => props.modelMin, v => { localMin.value = v })
watch(() => props.modelMax, v => { localMax.value = v })

const range = computed(() => props.max - props.min)
const leftPercent = computed(() => ((localMin.value - props.min) / range.value) * 100)
const rightPercent = computed(() => ((localMax.value - props.min) / range.value) * 100)

function onMinInput(e: Event) {
  const v = Number((e.target as HTMLInputElement).value)
  if (v >= localMax.value) return
  localMin.value = v
  emit('update:modelMin', v)
}

function onMaxInput(e: Event) {
  const v = Number((e.target as HTMLInputElement).value)
  if (v <= localMin.value) return
  localMax.value = v
  emit('update:modelMax', v)
}
</script>

<style scoped>
.range-thumb::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #0284C7;
  border: 2px solid #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  cursor: pointer;
  pointer-events: all;
  position: relative;
  z-index: 1;
}
.range-thumb::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #0284C7;
  border: 2px solid #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  cursor: pointer;
  pointer-events: all;
}
.range-thumb:focus-visible::-webkit-slider-thumb {
  box-shadow: 0 0 0 3px rgba(2,132,199,0.3);
}
</style>
