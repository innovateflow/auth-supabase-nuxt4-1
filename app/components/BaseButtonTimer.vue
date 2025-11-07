<template>
  <BaseButton
    :variant="variant"
    :size="size"
    :full-width="fullWidth"
    :disabled="disabled || isCountdownActive"
    @click="handleClick"
  >
    <slot v-if="!isCountdownActive" />
    <span v-else>
      {{ countdownText }} ({{ remainingTime }}s)
    </span>
  </BaseButton>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
  countdownSeconds?: number
  countdownText?: string
  autoStart?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'secondary',
  size: 'md',
  fullWidth: false,
  disabled: false,
  countdownSeconds: 60,
  countdownText: 'Aguarde',
  autoStart: false
})

const emit = defineEmits<{
  click: []
}>()

const isCountdownActive = ref(false)
const remainingTime = ref(props.countdownSeconds)
let countdownInterval: NodeJS.Timeout | null = null

const handleClick = () => {
  if (!isCountdownActive.value && !props.disabled) {
    emit('click')
    startCountdown()
  }
}

const startCountdown = () => {
  isCountdownActive.value = true
  remainingTime.value = props.countdownSeconds

  countdownInterval = setInterval(() => {
    remainingTime.value--
    
    if (remainingTime.value <= 0) {
      stopCountdown()
    }
  }, 1000)
}

const stopCountdown = () => {
  isCountdownActive.value = false
  remainingTime.value = props.countdownSeconds
  
  if (countdownInterval) {
    clearInterval(countdownInterval)
    countdownInterval = null
  }
}

// Limpar interval ao desmontar componente
onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})

// Iniciar automaticamente se autoStart for true
onMounted(() => {
  if (props.autoStart) {
    startCountdown()
  }
})

// Expor métodos para controle externo se necessário
defineExpose({
  startCountdown,
  stopCountdown,
  isCountdownActive: readonly(isCountdownActive),
  remainingTime: readonly(remainingTime)
})
</script>