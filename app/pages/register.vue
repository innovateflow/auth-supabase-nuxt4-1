<template>
  <div class="min-h-screen bg-nuxt-background overflow-hidden">
    <div class="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <!-- Left Side - Register Form -->
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

          <RegisterForm @submit="handleRegister" />
        </div>
      </div>

      <!-- Right Side - Illustration -->
      <div class="hidden lg:flex items-center justify-center bg-nuxt-background overflow-hidden">
        <div class="w-full h-full flex items-center justify-center p-8">
          <img 
            src="/images/auth-login-illustration-dark-002.jpg" 
            alt="Register illustration" 
            class="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { signUp, loading } = useAuth()
const user = useSupabaseUser()
const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)

// Redireciona para dashboard se usuário já estiver logado e confirmado
watch(user, () => {
  if (user.value && user.value.email_confirmed_at) {
    navigateTo('/dashboard')
  }
}, { immediate: true })

// Handler de registro
const handleRegister = async (data: any) => {
  errorMessage.value = null
  successMessage.value = null

  // Criar conta no Supabase
  const result = await signUp(data.email, data.password)

  if (!result.success) {
    errorMessage.value = result.error || 'Erro ao criar conta'
  } else {
    // Se precisa confirmar email, redirecionar para página de verificação
    if (result.needsEmailConfirmation) {
      await navigateTo(`/verify-email?email=${encodeURIComponent(data.email)}`)
    } else {
      // Conta confirmada automaticamente (raro, mas possível)
      successMessage.value = result.message || 'Conta criada com sucesso!'
    }
  }
}

// Configuração da página
useHead({
  title: 'Criar Conta - Auth Supabase',
  meta: [
    { name: 'description', content: 'Página de registro com autenticação Supabase' }
  ]
})
</script>