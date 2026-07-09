<template>
  <div class="inline-flex items-center gap-1.5">
    <div class="flex items-center gap-0.5">
      <svg
        v-for="i in 5"
        :key="i"
        class="shrink-0"
        :class="[starSize, filled(i) ? 'text-amber-400' : 'text-gray-200']"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>
    </div>
    <span v-if="showValue && rating > 0" :class="valueClass">{{
      rating.toFixed(1)
    }}</span>
    <span v-if="count !== undefined" :class="countClass" class="hidden"
      >({{ count }})</span
    >
  </div>
</template>

<script setup lang="ts">
interface Props {
  rating: number;
  count?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  showValue: true,
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
const countClass = computed(
  () =>
    ({
      sm: "text-xs text-gray-400",
      md: "text-xs text-gray-400",
      lg: "text-sm text-gray-400",
    }[props.size])
);

const filled = (i: number) => props.rating >= i - 0.5;
</script>
