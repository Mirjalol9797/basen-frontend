<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
  >
    <button
      v-if="visible"
      type="button"
      :aria-label="$t('common.scroll_to_top')"
      class="fixed right-4 sm:right-6 bottom-20 sm:bottom-6 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-primary-600 hover:bg-primary-700 text-white shadow-lg transition-colors duration-150"
      @click="scrollToTop"
    >
      <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832l-3.71 3.938a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </Transition>
</template>

<script setup lang="ts">
const visible = ref(false);

function onScroll() {
  visible.value = window.scrollY > 400;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>
