<template>
  <div class="min-h-screen bg-nuxt-background overflow-hidden">
    <div class="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <!-- Left Side - Reset Password Form -->
      <div class="flex items-center justify-center px-4 py-8 lg:px-8 overflow-y-auto">
        <div class="w-full max-w-md">
          <!-- Error Message -->
          <div v-if="errorMessage" class="mb-4 p-4 bg-red-900/20 border border-red-500 rounded-lg">
            <p class="text-red-400 text-body-sm">{{ errorMessage }}</p>
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="mb-4 p-4 bg-green-900/20 border border-green-500 rounded-lg">
            <p class="text-green-400 text-body-sm">{{ successMessage }}</p>
          </div>

          <!-- Header -->
          <div class="mb-8">
            <h1 class="text-heading-xl text-nuxt-text mb-3">
              Recuperar senha
            </h1>
            <p class="text-body-base text-secondary">
              Digite seu e-mail para receber o link de recuperação de senha
            </p>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleResetPassword" class="space-y-6">
            <BaseInput
              v-model="email"
              type="email"
              label="E-mail"
              placeholder="seu@email.com"
              required
              autocomplete="email"
            />

            <!-- Submit Button -->
            <BaseButton
              type="submit"
              variant="primary"
              size="lg"
              full-width
              :loading="loading"
            >
              Enviar link de recuperação
            </BaseButton>

            <!-- Back to Login Link -->
            <p class="text-center text-body-sm text-secondary">
              Lembrou a senha? 
              <NuxtLink to="/login" class="text-nuxt-button hover:text-green-400 transition-colors font-medium">
                Voltar ao login
              </NuxtLink>
            </p>
          </form>
        </div>
      </div>

      <!-- Right Side - Illustration -->
      <div class="hidden lg:flex items-center justify-center bg-nuxt-background overflow-hidden">
        <div class="w-full h-full flex items-center justify-center p-8">
          <img 
            src="/images/auth-login-illustration-dark-002.jpg" 
            alt="Reset password illustration" 
            class="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { resetPassword, loading } = useAuth()
const email = ref('')
const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)

// Handler de reset de senha
const handleResetPassword = async () => {
  errorMessage.value = null
  successMessage.value = null

  if (!email.value) {
    errorMessage.value = 'E-mail é obrigatório'
    return
  }

  const result = await resetPassword(email.value)

  if (result.success) {
    successMessage.value = result.message || 'Link de recuperação enviado para seu e-mail!'
    email.value = ''
  } else {
    errorMessage.value = result.error || 'Erro ao enviar link de recuperação'
  }
}

// Configuração da página
useHead({
  title: 'Recuperar Senha - Auth Supabase',
  meta: [
    { name: 'description', content: 'Página de recuperação de senha' }
  ]
})
</script>
