# Sistema de Autenticação

## Composable `useAuth`

Localização: `app/composables/useAuth.ts`

### Métodos Disponíveis

#### `signIn(email, password)`
Login com email e senha.
```ts
const { signIn } = useAuth()
const result = await signIn('user@example.com', 'senha123')
```

#### `signOut()`
Fazer logout e redirecionar para login.
```ts
const { signOut } = useAuth()
await signOut()
```

#### `signUp(email, password)`
Cadastrar novo usuário.
```ts
const { signUp } = useAuth()
const result = await signUp('user@example.com', 'senha123')
```

#### `signInWithOtp(email)`
Enviar magic link para email.
```ts
const { signInWithOtp } = useAuth()
const result = await signInWithOtp('user@example.com')
```

#### `resetPassword(email)`
Solicitar reset de senha.
```ts
const { resetPassword } = useAuth()
const result = await resetPassword('user@example.com')
```

#### `updatePassword(newPassword)`
Atualizar senha do usuário logado.
```ts
const { updatePassword } = useAuth()
const result = await updatePassword('novaSenha123')
```

### Estados Disponíveis

- `user` - Usuário atual (reativo)
- `loading` - Estado de carregamento
- `error` - Última mensagem de erro
- `isAuthenticated` - Verifica se está autenticado

### Exemplo de Uso

```vue
<script setup lang="ts">
const { user, signIn, signOut, loading, isAuthenticated } = useAuth()

const handleLogin = async () => {
  const result = await signIn(email.value, password.value)
  if (result.success) {
    // Login bem-sucedido
  } else {
    // Tratar erro
    console.error(result.error)
  }
}
</script>
```

## Configuração de Redirecionamento

No `nuxt.config.ts`:

```ts
supabase: {
  redirect: true,
  redirectOptions: {
    login: '/login',        // Página de login
    callback: '/confirm',   // Página de callback
    exclude: ['/'],        // Páginas públicas
    cookieRedirect: true   // Salva página original
  }
}
```

## Fluxo de Autenticação

1. **Login:** Usuário preenche formulário em `/login`
2. **Autenticação:** `signIn()` valida credenciais
3. **Redirecionamento:** Após sucesso, redireciona para `/dashboard`
4. **Logout:** Botão na sidebar do dashboard chama `signOut()`
5. **Redirect:** Após logout, volta para `/login`
