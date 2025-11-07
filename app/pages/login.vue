<template>
  <div class="min-h-screen bg-nuxt-background overflow-hidden">
    <div class="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <!-- Left Side - Login Form -->
      <div class="flex items-center justify-center px-4 py-8 lg:px-8 overflow-y-auto">
        <div class="w-full max-w-md">
          <!-- Error Message -->
          <div v-if="errorMessage" class="mb-4 p-4 bg-red-900/20 border border-red-500 rounded-lg">
            <p class="text-red-400 text-body-sm">{{ errorMessage }}</p>
          </div>

          <!-- Info Message for expired links -->
          <div v-if="route.query.message" class="mb-4 p-4 bg-blue-900/20 border border-blue-500 rounded-lg">
            <p class="text-blue-400 text-body-sm">
              💡 <strong>Dica:</strong> Se você estava tentando verificar seu e-mail, você pode solicitar um novo link fazendo login ou 
              <NuxtLink to="/register" class="underline hover:text-blue-300">criando uma nova conta</NuxtLink>.
            </p>
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="mb-4 p-4 bg-green-900/20 border border-green-500 rounded-lg">
            <p class="text-green-400 text-body-sm">{{ successMessage }}</p>
          </div>

          <LoginForm @submit="handleLogin" />
        </div>
      </div>

      <!-- Right Side - Illustration -->
      <div class="hidden lg:flex items-center justify-center bg-nuxt-background overflow-hidden">
        <div class="w-full h-full flex items-center justify-center p-8">
          <img 
            src="/images/auth-login-illustration-dark-002.jpg" 
            alt="Login illustration" 
            class="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { signIn, loading, error } = useAuth()
const user = useSupabaseUser()
const route = useRoute()
const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)

// Verificar se há mensagem na URL
onMounted(() => {
  const message = route.query.message
  if (message && typeof message === 'string') {
    errorMessage.value = message
  }
})

// Redireciona para dashboard se usuário já estiver logado
watch(user, () => {
  if (user.value) {
    navigateTo('/dashboard')
  }
}, { immediate: true })

// Handler de login
const handleLogin = async (data: any) => {
  errorMessage.value = null
  successMessage.value = null

  const result = await signIn(data.email, data.password)

  if (!result.success) {
    errorMessage.value = result.error || 'Erro ao fazer login'
  }
}

// Configuração da página
useHead({
  title: 'Login - Auth Supabase',
  meta: [
    { name: 'description', content: 'Página de login com autenticação Supabase' }
  ]
})
</script>
