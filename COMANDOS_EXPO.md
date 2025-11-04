# 📱 Comandos para Publicar no Expo

Execute estes comandos no CMD (um por vez):

## 1. Navegar para a pasta mobile

```cmd
cd C:\Users\Elton\Desktop\Loja\mobile
```

## 2. Configurar o projeto EAS

```cmd
eas build:configure
```

Quando perguntar "Would you like to automatically create an EAS project for @belembe/ktech-loja?", digite: **yes**

## 3. Publicar para Expo Go (Link Exponencial)

```cmd
eas update --branch preview --message "Primeira versão do app K-TECH Loja"
```

## 4. OU Gerar APK para Android

```cmd
eas build --platform android --profile preview
```

## ⚠️ IMPORTANTE: Atualizar config.ts ANTES

Antes de publicar, você precisa:

1. Aguardar o deploy do Render finalizar
2. Obter a URL do Render (ex: `https://loja-3.onrender.com`)
3. Abrir o arquivo: `C:\Users\Elton\Desktop\Loja\mobile\config.ts`
4. Atualizar:

```typescript
// PRODUÇÃO: URL pública da sua API no Render
const PROD_API_URL = 'https://sua-url-do-render.onrender.com/api'; // ⬅️ COLE A URL DO RENDER

// Escolha o ambiente
const IS_DEV = false; // ⬅️ MUDE PARA false
```

5. Salvar o arquivo
6. Fazer commit e push (opcional)

## 📋 Sequência Completa

```cmd
cd C:\Users\Elton\Desktop\Loja\mobile
eas build:configure
```

(Pressione **yes** quando perguntar)

Depois:

```cmd
eas update --branch preview --message "Primeira versão do app K-TECH Loja"
```

## 🎯 Próximos Passos

1. ✅ Login feito
2. ⏳ Navegar para `mobile`
3. ⏳ Executar `eas build:configure`
4. ⏳ Atualizar `config.ts` com URL do Render
5. ⏳ Publicar com `eas update` ou `eas build`

