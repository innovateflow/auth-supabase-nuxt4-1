<template>
  <div class="w-full max-w-md">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-heading-xl text-nuxt-text mb-3">
        Criar conta
      </h1>
      <p class="text-body-base text-secondary">
        Preencha os dados abaixo para criar sua conta
      </p>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <BaseInput
        v-model="formData.name"
        type="text"
        label="Nome"
        placeholder="Seu nome completo"
        required
        autocomplete="name"
        :error="errors.name"
      />

      <BaseInput
        v-model="formData.email"
        type="email"
        label="E-mail"
        placeholder="seu@email.com"
        required
        autocomplete="email"
        :error="errors.email"
      />

      <InputPassword
        v-model="formData.password"
        label="Senha"
        placeholder="••••••••"
        required
        autocomplete="new-password"
        :error="errors.password"
      />

      <InputPassword
        v-model="formData.confirmPassword"
        label="Confirmar senha"
        placeholder="••••••••"
        required
        autocomplete="new-password"
        :error="errors.confirmPassword"
      />

      <!-- Submit Button -->
      <BaseButton
        type="submit"
        variant="primary"
        size="lg"
        full-width
        :loading="loading"
      >
        Criar conta
      </BaseButton>

      <!-- Login Link -->
      <p class="text-center text-body-sm text-secondary">
        Já tem uma conta? 
        <NuxtLink to="/login" class="text-nuxt-button hover:text-green-400 transition-colors font-medium">
          Faça login
        </NuxtLink>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
}

const formData = ref<FormData>({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = ref<FormErrors>({})

const { loading } = useAuth()

const emit = defineEmits<{
  submit: [data: FormData]
}>()

const handleSubmit = () => {
  // Validação básica
  errors.value = {}
  
  if (!formData.value.name || formData.value.name.trim().length < 2) {
    errors.value.name = 'Nome deve ter pelo menos 2 caracteres'
    return
  }
  
  if (!formData.value.email) {
    errors.value.email = 'E-mail é obrigatório'
    return
  }
  
  // Validação simples de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.value.email)) {
    errors.value.email = 'E-mail inválido'
    return
  }
  
  if (!formData.value.password || formData.value.password.length < 6) {
    errors.value.password = 'Senha deve ter pelo menos 6 caracteres'
    return
  }
  
  if (!formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Confirmação de senha é obrigatória'
    return
  }
  
  if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Senhas não coincidem'
    return
  }
  
  // Emitir evento com os dados
  emit('submit', formData.value)
}
</script>