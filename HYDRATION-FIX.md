# Fix: Problema de Hidratação SSR

## Problema

Erro no console:
```
[Vue warn]: Hydration attribute mismatch on <input>
```

## Causa

Os componentes `BaseInput.vue` e `InputPassword.vue` estavam gerando IDs aleatórios usando `Math.random()`:

```typescript
// ❌ ERRADO - Gera IDs diferentes no servidor e no cliente
const inputId = `input-${Math.random().toString(36).substring(2, 9)}`
```

Durante o SSR (Server-Side Rendering):
1. O servidor gera um ID aleatório (ex: `input-a1b2c3d`)
2. O cliente gera outro ID aleatório diferente (ex: `input-x9y8z7w`)
3. Vue detecta o mismatch e emite o warning de hidratação

## Solução

Substituído por IDs baseados no label, garantindo consistência entre servidor e cliente:

```typescript
// ✅ CORRETO - Gera o mesmo ID no servidor e no cliente
const inputId = computed(() => {
  return props.label 
    ? `input-${props.label.toLowerCase().replace(/\s+/g, '-')}` 
    : undefined
})
```

### Benefícios:
- **Consistência SSR**: Mesmo ID no servidor e cliente
- **Semântico**: ID baseado no conteúdo do label
- **Acessibilidade**: Mantém a relação `<label for="">` funcionando
- **Performance**: Não causa re-renderização

## Arquivos Corrigidos

1. `app/components/BaseInput.vue`
2. `app/components/InputPassword.vue`

## Como Testar

1. Execute: `npm run dev`
2. Abra: http://localhost:3000/login
3. Verifique o console do navegador - não deve ter warnings de hidratação
4. Inspecione os inputs - IDs devem ser consistentes (ex: `input-e-mail`, `input-password-senha`)

## Referências

- [Nuxt SSR Hydration](https://nuxt.com/docs/guide/concepts/rendering#universal-rendering)
- [Vue Hydration Mismatch](https://vuejs.org/guide/scaling-up/ssr.html#hydration-mismatch)
- [@nuxtjs/supabase com SSR](https://supabase.nuxtjs.org/get-started)
