<template>
  <div class="min-h-screen bg-nuxt-background flex items-center justify-center px-4">
    <div class="w-full max-w-lg">
      <!-- Success Message -->
      <div v-if="successMessage" class="mb-6 p-4 bg-green-900/20 border border-green-500 rounded-lg">
        <p class="text-green-400 text-body-sm">{{ successMessage }}</p>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg">
        <p class="text-red-400 text-body-sm">{{ errorMessage }}</p>
      </div>

      <!-- Main Card -->
      <div class="bg-nuxt-background border border-gray-700 rounded-lg p-8 shadow-2xl">
        <!-- Email Icon -->
        <div class="flex justify-center mb-6">
          <div class="w-16 h-16 mx-auto bg-blue-500/20 text-blue-400 rounded-full p-4 flex items-center justify-center">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>

        <!-- Title -->
        <h1 class="text-heading-xl text-nuxt-text text-center mb-4">
          Verifique seu e-mail
        </h1>

        <!-- Content -->
        <div class="space-y-4 text-center">
          <p class="text-body-base text-secondary">
            Sua conta foi criada com sucesso! Para continuar, precisamos verificar seu endereço de e-mail.
          </p>
          
          <p class="text-body-base text-secondary">
            Enviamos um link de verificação para:
          </p>
          
          <p class="text-body-lg text-nuxt-text font-semibold bg-gray-800/50 px-4 py-3 rounded-lg">
            {{ userEmail }}
          </p>

          <div class="space-y-3 text-body-sm text-secondary text-left bg-gray-800/30 p-4 rounded-lg">
            <p class="font-semibold text-center">
              Próximos passos:
            </p>
            <ul class="list-disc list-inside space-y-1">
              <li>Verifique sua caixa de entrada</li>
              <li>Clique no link de verificação</li>
              <li>Retorne para fazer login</li>
            </ul>
          </div>

          <!-- Warning -->
          <div class="text-body-sm text-orange-400 bg-orange-900/20 border border-orange-500/30 p-4 rounded-lg">
            <p>⚠️ <strong>Importante:</strong> Você não conseguirá fazer login até verificar seu e-mail.</p>
          </div>

          <!-- Tip -->
          <div class="text-body-sm text-gray-400 bg-gray-800/30 p-4 rounded-lg">
            <p>💡 <strong>Dica:</strong> Se não encontrar o e-mail, verifique a pasta de spam ou lixo eletrônico.</p>
          </div>
        </div>

        <!-- Actions -->
        <div class="space-y-4 mt-8">
          <!-- Resend Email Button -->
          <BaseButtonTimer
            variant="secondary"
            size="lg"
            full-width
            :countdown-seconds="60"
            countdown-text="Reenviar disponível em"
            :auto-start="true"
            @click="handleResendEmail"
          >
            Reenviar e-mail
          </BaseButtonTimer>

          <!-- Back to Login -->
          <div class="text-center">
            <NuxtLink 
              to="/login" 
              class="text-nuxt-button hover:text-green-400 transition-colors text-body-sm font-medium"
            >
              ← Voltar para o login
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { resendVerificationEmail } = useAuth()
const route = useRoute()

// Estados
const successMessage = ref<string | null>(null)
const errorMessage = ref<string | null>(null)

// Email do usuário (vem como query parameter)
const userEmail = computed(() => {
  return route.query.email as string || 'seu@email.com'
})

// Verificar se email foi fornecido
onMounted(() => {
  if (!route.query.email) {
    // Se não tem email, redireciona para registro
    navigateTo('/register')
  }
})

// Handler para reenviar email
const handleResendEmail = async () => {
  if (!userEmail.value || userEmail.value === 'seu@email.com') {
    errorMessage.value = 'Email não encontrado. Tente criar a conta novamente.'
    return
  }

  errorMessage.value = null
  successMessage.value = null

  const result = await resendVerificationEmail(userEmail.value)
  
  if (!result.success) {
    errorMessage.value = result.error || 'Erro ao reenviar email. Tente novamente.'
  } else {
    successMessage.value = result.message || 'Email de verificação reenviado com sucesso!'
  }
}

// Configuração da página
useHead({
  title: 'Verificação de E-mail - Auth Supabase',
  meta: [
    { name: 'description', content: 'Página de verificação de e-mail após registro' }
  ]
})
</script>