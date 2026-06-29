<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" class="fixed inset-0 z-50">
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="onBackdrop"
        />

        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="translate-y-full"
          enter-to-class="translate-y-0"
          leave-active-class="transition duration-250 ease-in"
          leave-from-class="translate-y-0"
          leave-to-class="translate-y-full"
        >
          <div
            v-if="modelValue"
            :class="drawerClasses"
            role="dialog"
            aria-modal="true"
          >
            <div class="flex justify-center pt-3 pb-1">
              <div class="w-10 h-1 rounded-full bg-gray-200" />
            </div>

            <div v-if="$slots.header || title" class="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <slot name="header">
                <h2 class="text-base font-semibold text-gray-900">{{ title }}</h2>
              </slot>
              <button
                v-if="showClose"
                type="button"
                class="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                @click="$emit('update:modelValue', false)"
              >
                <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>

            <div class="overflow-y-auto overscroll-contain px-5 py-4" :style="{ maxHeight }">
              <slot />
            </div>

            <div v-if="$slots.footer" class="px-5 py-4 border-t border-gray-100">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  title?: string
  showClose?: boolean
  closeOnBackdrop?: boolean
  maxHeight?: string
}

const props = withDefaults(defineProps<Props>(), {
  showClose: true,
  closeOnBackdrop: true,
  maxHeight: '80vh',
})

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const drawerClasses = [
  'absolute bottom-0 left-0 right-0 z-10',
  'bg-white rounded-t-3xl shadow-2xl',
]

function onBackdrop() {
  if (props.closeOnBackdrop) emit('update:modelValue', false)
}

onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.modelValue) emit('update:modelValue', false)
  }
  document.addEventListener('keydown', onKey)
  onUnmounted(() => document.removeEventListener('keydown', onKey))
})

watch(() => props.modelValue, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})
</script>
