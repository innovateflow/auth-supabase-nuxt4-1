<template>
  <div class="w-full max-w-md">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-heading-xl text-nuxt-text mb-3">
        Bem-vindo de volta
      </h1>
      <p class="text-body-base text-secondary">
        Entre com suas credenciais para acessar sua conta
      </p>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
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
        autocomplete="current-password"
        :error="errors.password"
      />

      <!-- Forgot Password Link -->
      <div class="flex items-center justify-end">
        <NuxtLink to="/reset-password" class="text-body-sm text-nuxt-button hover:text-green-400 transition-colors">
          Esqueceu a senha?
        </NuxtLink>
      </div>

      <!-- Submit Button -->
      <BaseButton
        type="submit"
        variant="primary"
        size="lg"
        full-width
        :loading="loading"
      >
        Entrar
      </BaseButton>

      <!-- Sign Up Link -->
      <p class="text-center text-body-sm text-secondary">
        Não tem uma conta? 
        <NuxtLink to="/register" class="text-nuxt-button hover:text-green-400 transition-colors font-medium">
          Cadastre-se
        </NuxtLink>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
interface FormData {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
}

const formData = ref<FormData>({
  email: '',
  password: ''
})

const errors = ref<FormErrors>({})

const { loading } = useAuth()

const emit = defineEmits<{
  submit: [data: FormData]
}>()

const handleSubmit = () => {
  // Validação básica
  errors.value = {}
  
  if (!formData.value.email) {
    errors.value.email = 'E-mail é obrigatório'
    return
  }
  
  if (!formData.value.password) {
    errors.value.password = 'Senha é obrigatória'
    return
  }
  
  // Emitir evento com os dados
  emit('submit', formData.value)
}
</script>
