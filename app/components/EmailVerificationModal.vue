<template>
  <BaseModal
    :show="show"
    title="Verifique seu e-mail"
    :icon="EmailIcon"
    icon-class="w-16 h-16 mx-auto bg-blue-500/20 text-blue-400 rounded-full p-4"
    primary-action="Ok, entendi"
    secondary-action="Reenviar e-mail"
    :close-on-backdrop="false"
    @close="$emit('close')"
    @primary-action="$emit('close')"
    @secondary-action="$emit('resend')"
  >
    <div class="space-y-4">
      <p class="text-body-base text-secondary">
        Sua conta foi criada com sucesso! Para continuar, precisamos verificar seu endereço de e-mail.
      </p>
      <p class="text-body-base text-secondary">
        Enviamos um link de verificação para:
      </p>
      <p class="text-body-lg text-nuxt-text font-semibold bg-gray-800/50 px-4 py-2 rounded-lg">
        {{ email }}
      </p>
      <div class="space-y-2 text-body-sm text-secondary">
        <p>
          <strong>Próximos passos:</strong>
        </p>
        <ul class="list-disc list-inside space-y-1 text-left">
          <li>Verifique sua caixa de entrada</li>
          <li>Clique no link de verificação</li>
          <li>Retorne para fazer login</li>
        </ul>
      </div>
      <div class="text-body-xs text-orange-400 bg-orange-900/20 border border-orange-500/30 p-3 rounded-lg">
        <p>⚠️ <strong>Importante:</strong> Você não conseguirá fazer login até verificar seu e-mail.</p>
      </div>
      <div class="text-body-xs text-gray-400 bg-gray-800/30 p-3 rounded-lg">
        <p>💡 <strong>Dica:</strong> Se não encontrar o e-mail, verifique a pasta de spam ou lixo eletrônico.</p>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
interface Props {
  show: boolean
  email: string
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
  resend: []
}>()

// Email Icon component
const EmailIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>
  `
}
</script>