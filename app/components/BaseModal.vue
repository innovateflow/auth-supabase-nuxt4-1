<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="handleBackdropClick"
        ></div>
        
        <!-- Modal Content -->
        <div class="relative bg-nuxt-background border border-gray-700 rounded-lg p-6 mx-4 max-w-md w-full shadow-2xl">
          <!-- Close Button -->
          <button 
            v-if="!hideClose"
            @click="$emit('close')"
            class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <!-- Icon -->
          <div v-if="icon" class="flex justify-center mb-4">
            <div :class="iconClass">
              <component :is="icon" class="w-8 h-8" />
            </div>
          </div>

          <!-- Title -->
          <h3 v-if="title" class="text-heading-lg text-nuxt-text text-center mb-3">
            {{ title }}
          </h3>

          <!-- Content -->
          <div class="text-body-base text-secondary text-center mb-6">
            <slot>
              <p v-if="message">{{ message }}</p>
            </slot>
          </div>

          <!-- Actions -->
          <div class="flex flex-col gap-3">
            <BaseButton
              v-if="primaryAction"
              :variant="primaryVariant"
              size="lg"
              full-width
              @click="$emit('primary-action')"
            >
              {{ primaryAction }}
            </BaseButton>

            <BaseButton
              v-if="secondaryAction"
              variant="ghost"
              size="lg"
              full-width
              @click="$emit('secondary-action')"
            >
              {{ secondaryAction }}
            </BaseButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  show: boolean
  title?: string
  message?: string
  icon?: any
  iconClass?: string
  primaryAction?: string
  primaryVariant?: 'primary' | 'secondary' | 'ghost'
  secondaryAction?: string
  hideClose?: boolean
  closeOnBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  primaryVariant: 'primary',
  closeOnBackdrop: true
})

const emit = defineEmits<{
  close: []
  'primary-action': []
  'secondary-action': []
}>()

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    emit('close')
  }
}

// Prevent body scroll when modal is open
watch(() => props.show, (isVisible) => {
  if (typeof document !== 'undefined') {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.modal-enter-active .absolute {
  transition: opacity 0.3s ease;
}

.modal-enter-from .absolute,
.modal-leave-to .absolute {
  opacity: 0;
}
</style>