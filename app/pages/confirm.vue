<template>
  <div class="min-h-screen bg-nuxt-background flex items-center justify-center px-4">
    <div class="w-full max-w-md text-center">
      <!-- Loading State -->
      <div v-if="isProcessing" class="bg-nuxt-background border border-gray-700 rounded-lg p-8 shadow-2xl">
        <div class="mb-6">
          <!-- Loading spinner -->
          <div class="inline-block w-16 h-16 border-4 border-gray-700 border-t-blue-400 rounded-full animate-spin"></div>
        </div>
        
        <h1 class="text-heading-lg text-nuxt-text mb-4">
          Confirmando autenticação...
        </h1>
        
        <p class="text-body-base text-secondary">
          Aguarde enquanto verificamos suas credenciais.
        </p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-nuxt-background border border-red-500 rounded-lg p-8 shadow-2xl">
        <div class="mb-6">
          <div class="w-16 h-16 mx-auto bg-red-500/20 text-red-400 rounded-full p-4 flex items-center justify-center">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
        </div>
        
        <h1 class="text-heading-lg text-nuxt-text mb-4">
          Erro na confirmação
        </h1>
        
        <p class="text-body-base text-red-400 mb-6">
          {{ error }}
        </p>

        <div class="space-y-4">
          <BaseButton
            v-if="route.query.error_code === 'otp_expired' || route.query.error_code === 'access_denied'"
            variant="primary"
            size="lg"
            full-width
            @click="retryConfirmation"
          >
            Verificar novamente
          </BaseButton>

          <BaseButton
            v-else
            variant="primary"
            size="lg"
            full-width
            @click="retryConfirmation"
          >
            Verificar novamente
          </BaseButton>

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

      <!-- Success State -->
      <div v-else-if="isConfirmed" class="bg-nuxt-background border border-green-500 rounded-lg p-8 shadow-2xl">
        <div class="mb-6">
          <div class="w-16 h-16 mx-auto bg-green-500/20 text-green-400 rounded-full p-4 flex items-center justify-center">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        
        <h1 class="text-heading-lg text-nuxt-text mb-4">
          E-mail confirmado!
        </h1>
        
        <p class="text-body-base text-secondary">
          Redirecionando para o dashboard...
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const redirectInfo = useSupabaseCookieRedirect()
const route = useRoute()
const supabase = useSupabaseClient()

// Estados da página
const isProcessing = ref(true)
const isConfirmed = ref(false)
const error = ref<string | null>(null)

// Função para forçar refresh da sessão
const refreshSession = async () => {
  try {
    await supabase.auth.refreshSession()
    const { data: { session } } = await supabase.auth.getSession()
    return session?.user || null
  } catch (err) {
    console.error('Erro ao fazer refresh da sessão:', err)
    return null
  }
}

// Função para verificar o estado da sessão
const checkAuthState = async () => {
  try {
    // Primeiro, fazer refresh da sessão
    const userFromRefresh = await refreshSession()
    if (userFromRefresh) {
      isConfirmed.value = true
      isProcessing.value = false
      
      setTimeout(() => {
        const path = redirectInfo.pluck()
        navigateTo(path || '/dashboard')
      }, 1500)
      return true
    }

    // Se não funcionou, tentar getSession normal
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      isConfirmed.value = true
      isProcessing.value = false
      
      setTimeout(() => {
        const path = redirectInfo.pluck()
        navigateTo(path || '/dashboard')
      }, 1500)
      return true
    }
  } catch (err) {
    console.error('Erro ao verificar sessão:', err)
  }
  return false
}

// Watch para redirecionamento quando usuário estiver autenticado
watch(user, async () => {
  if (user.value) {
    isConfirmed.value = true
    isProcessing.value = false
    
    setTimeout(() => {
      const path = redirectInfo.pluck()
      navigateTo(path || '/dashboard')
    }, 1500)
  }
}, { immediate: true })

// Processar verificação na montagem
onMounted(async () => {
  console.log('Página confirm montada, iniciando verificação...')
  console.log('URL atual:', window.location.href)
  
  // Verificar se há tokens na URL (hash fragment)
  const hashParams = new URLSearchParams(window.location.hash.substring(1))
  const accessToken = hashParams.get('access_token')
  const refreshToken = hashParams.get('refresh_token')
  
  console.log('Tokens encontrados:', { accessToken: !!accessToken, refreshToken: !!refreshToken })
  
  // Se há tokens na URL, processar a sessão
  if (accessToken && refreshToken) {
    console.log('Processando tokens da URL...')
    try {
      // Definir a sessão com os tokens da URL
      const { data, error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      })
      
      if (sessionError) {
        console.error('Erro ao definir sessão:', sessionError)
      } else if (data.session?.user) {
        console.log('Sessão definida com sucesso:', data.session.user.email)
        isConfirmed.value = true
        isProcessing.value = false
        
        // Limpar a URL removendo os tokens
        window.history.replaceState({}, document.title, window.location.pathname)
        
        setTimeout(() => {
          const path = redirectInfo.pluck()
          navigateTo(path || '/dashboard')
        }, 1500)
        return
      }
    } catch (err) {
      console.error('Erro ao processar tokens:', err)
    }
  }
  
  // Se há parâmetros de erro, ainda vamos tentar verificar a sessão primeiro
  const hasErrorParams = route.query.error || route.query.error_description
  
  // Primeira verificação imediata
  const isLoggedIn = await checkAuthState()
  if (isLoggedIn) {
    console.log('Usuário detectado na primeira verificação')
    return
  }

  // Aguardar processamento do Supabase
  console.log('Primeira verificação falhou, aguardando 3 segundos...')
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  // Segunda verificação após aguardar
  const isLoggedInAfterWait = await checkAuthState()
  if (isLoggedInAfterWait) {
    console.log('Usuário detectado na segunda verificação')
    return
  }

  // Terceira tentativa com refresh forçado
  console.log('Segunda verificação falhou, tentando refresh forçado...')
  await new Promise(resolve => setTimeout(resolve, 2000))
  const isLoggedInAfterRefresh = await checkAuthState()
  if (isLoggedInAfterRefresh) {
    console.log('Usuário detectado após refresh forçado')
    return
  }

  // Se ainda não funcionou e há parâmetros de erro, mostrar erro
  if (hasErrorParams) {
    const errorParam = route.query.error_description || route.query.error
    const errorCode = route.query.error_code
    
    console.log('Ainda não logado, verificando erros na URL:', { errorParam, errorCode })
    
    if (errorCode === 'otp_expired') {
      error.value = 'O link de verificação expirou. Solicite um novo link de verificação.'
    } else if (errorCode === 'access_denied') {
      error.value = 'Link de verificação inválido ou já utilizado.'
    } else {
      error.value = typeof errorParam === 'string' ? errorParam : 'Erro na confirmação do e-mail'
    }
    isProcessing.value = false
    return
  }

  // Última tentativa após mais tempo
  console.log('Última tentativa em 3 segundos...')
  setTimeout(async () => {
    if (!user.value && isProcessing.value) {
      const finalCheck = await checkAuthState()
      if (!finalCheck) {
        console.log('Todas as tentativas falharam, mostrando erro de timeout')
        error.value = 'Tempo limite excedido. O link pode ter expirado ou já foi usado.'
        isProcessing.value = false
      }
    }
  }, 3000)
})

// Função para tentar novamente
const retryConfirmation = async () => {
  isProcessing.value = true
  error.value = null
  
  console.log('Tentando verificação novamente...')
  
  // Primeiro, verificar se ainda há tokens na URL
  const hashParams = new URLSearchParams(window.location.hash.substring(1))
  const accessToken = hashParams.get('access_token')
  const refreshToken = hashParams.get('refresh_token')
  
  if (accessToken && refreshToken) {
    console.log('Reprocessando tokens da URL...')
    try {
      const { data, error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      })
      
      if (!sessionError && data.session?.user) {
        console.log('Sessão definida com sucesso no retry')
        isConfirmed.value = true
        isProcessing.value = false
        
        window.history.replaceState({}, document.title, window.location.pathname)
        
        setTimeout(() => {
          const path = redirectInfo.pluck()
          navigateTo(path || '/dashboard')
        }, 1500)
        return
      }
    } catch (err) {
      console.error('Erro ao reprocessar tokens:', err)
    }
  }
  
  // Tentar verificar a sessão novamente
  const success = await checkAuthState()
  if (!success) {
    const errorCode = route.query.error_code
    
    if (errorCode === 'otp_expired' || errorCode === 'access_denied') {
      navigateTo('/login?message=Link expirado. Faça login novamente ou solicite um novo link de verificação.')
    } else {
      window.location.reload()
    }
  }
}

// Configuração da página
useHead({
  title: 'Confirmando - Auth Supabase',
  meta: [
    { name: 'description', content: 'Página de confirmação de autenticação' }
  ]
})
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
