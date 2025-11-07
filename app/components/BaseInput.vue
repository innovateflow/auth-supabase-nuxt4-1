<template>
  <div class="w-full">
    <label 
      v-if="label" 
      :for="inputId" 
      class="block text-nuxt-text text-body-sm font-medium mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :autocomplete="autocomplete"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-nuxt-text placeholder-gray-400 focus:border-nuxt-button focus:ring-1 focus:ring-nuxt-button outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
    
    <p v-if="error" class="mt-2 text-body-sm text-red-500">
      {{ error }}
    </p>
    
    <p v-if="hint && !error" class="mt-2 text-body-sm text-gray-400">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  type?: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
  autocomplete?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  required: false,
  disabled: false,
  autocomplete: 'off'
})

defineEmits<{
  'update:modelValue': [value: string]
}>()

// Gera ID único que funciona com SSR
const inputId = computed(() => {
  return props.label 
    ? `input-${props.label.toLowerCase().replace(/\s+/g, '-')}` 
    : undefined
})
</script>
