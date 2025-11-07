export const useAuth = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const router = useRouter()

  // Estado de loading
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Login com email e senha
   */
  const signIn = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError) {
        error.value = signInError.message
        return { success: false, error: signInError.message }
      }

      // Redireciona para dashboard após login bem-sucedido
      await router.push('/dashboard')
      
      return { success: true, user: data.user }
    } catch (err: any) {
      error.value = err.message || 'Erro ao fazer login'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  /**
   * Login com Magic Link (OTP)
   */
  const signInWithOtp = async (email: string) => {
    try {
      loading.value = true
      error.value = null

      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/confirm`
        }
      })

      if (otpError) {
        error.value = otpError.message
        return { success: false, error: otpError.message }
      }

      return { success: true, message: 'Link mágico enviado para seu email!' }
    } catch (err: any) {
      error.value = err.message || 'Erro ao enviar link mágico'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  /**
   * Cadastro de novo usuário
   */
  const signUp = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/confirm`
        }
      })

      if (signUpError) {
        error.value = signUpError.message
        return { success: false, error: signUpError.message }
      }

      // Se o usuário precisa confirmar o email, data.user.email_confirmed_at será null
      const needsEmailConfirmation = !data.user?.email_confirmed_at

      return { 
        success: true, 
        user: data.user,
        needsEmailConfirmation,
        message: needsEmailConfirmation 
          ? 'Cadastro realizado! Verifique seu email para confirmar a conta.'
          : 'Cadastro realizado com sucesso!'
      }
    } catch (err: any) {
      error.value = err.message || 'Erro ao criar conta'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  /**
   * Logout
   */
  const signOut = async () => {
    try {
      loading.value = true
      error.value = null

      const { error: signOutError } = await supabase.auth.signOut()

      if (signOutError) {
        error.value = signOutError.message
        return { success: false, error: signOutError.message }
      }

      // Redireciona para login após logout
      await router.push('/login')
      
      return { success: true }
    } catch (err: any) {
      error.value = err.message || 'Erro ao fazer logout'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  /**
   * Reset de senha - solicitar
   */
  const resetPassword = async (email: string) => {
    try {
      loading.value = true
      error.value = null

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (resetError) {
        error.value = resetError.message
        return { success: false, error: resetError.message }
      }

      return { 
        success: true, 
        message: 'Link de recuperação enviado para seu email!' 
      }
    } catch (err: any) {
      error.value = err.message || 'Erro ao solicitar reset de senha'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  /**
   * Atualizar senha
   */
  const updatePassword = async (newPassword: string) => {
    try {
      loading.value = true
      error.value = null

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (updateError) {
        error.value = updateError.message
        return { success: false, error: updateError.message }
      }

      return { 
        success: true, 
        message: 'Senha atualizada com sucesso!' 
      }
    } catch (err: any) {
      error.value = err.message || 'Erro ao atualizar senha'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  /**
   * Reenviar email de verificação
   */
  const resendVerificationEmail = async (email: string) => {
    try {
      loading.value = true
      error.value = null

      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/confirm`
        }
      })

      if (resendError) {
        error.value = resendError.message
        return { success: false, error: resendError.message }
      }

      return { 
        success: true, 
        message: 'Email de verificação reenviado com sucesso!' 
      }
    } catch (err: any) {
      error.value = err.message || 'Erro ao reenviar email de verificação'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  /**
   * Verifica se o usuário está autenticado
   */
  const isAuthenticated = computed(() => !!user.value)

  return {
    // Estado
    user,
    loading,
    error,
    isAuthenticated,

    // Métodos
    signIn,
    signInWithOtp,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    resendVerificationEmail
  }
}
