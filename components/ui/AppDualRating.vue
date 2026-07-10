<template>
  <div class="inline-flex items-center gap-3 flex-wrap">
    <div class="inline-flex items-center gap-1">
      <svg class="shrink-0" :class="starSize" viewBox="0 0 20 20" fill="#FBBF24">
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>
      <span :class="valueClass">{{ google.toFixed(1) }}</span>
      <span :class="labelClass" class="text-[#4285F4]">{{ $t('common.google') }}</span>
    </div>
    <div class="inline-flex items-center gap-1">
      <svg class="shrink-0" :class="starSize" viewBox="0 0 20 20" fill="#FBBF24">
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>
      <span :class="valueClass">{{ yandex.toFixed(1) }}</span>
      <span :class="labelClass" class="text-[#FC3F1D]">{{ $t('common.yandex') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  google: number;
  yandex: number;
  size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
});

const starSize = computed(
  () => ({ sm: "w-3.5 h-3.5", md: "w-4 h-4", lg: "w-5 h-5" }[props.size])
);
const valueClass = computed(
  () =>
    ({
      sm: "text-xs font-semibold text-gray-800",
      md: "text-sm font-semibold text-gray-800",
      lg: "text-base font-bold text-gray-900",
    }[props.size])
);
const labelClass = computed(
  () =>
    ({
      sm: "text-[10px] font-medium",
      md: "text-xs font-medium",
      lg: "text-xs font-medium",
    }[props.size])
);
</script>
