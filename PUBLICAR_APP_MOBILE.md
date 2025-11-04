# 📱 Como Publicar o App Mobile no Expo

## ❓ É Necessário Publicar?

**NÃO é obrigatório**, mas é recomendado para produção:

### Opção 1: Usar Localmente (Desenvolvimento)
- ✅ Funciona na mesma rede local
- ✅ Não precisa publicar
- ✅ Use Expo Go app
- ⚠️ Precisa estar na mesma rede WiFi

### Opção 2: Publicar no Expo (Produção)
- ✅ Funciona de qualquer lugar
- ✅ Não precisa estar na mesma rede
- ✅ Pode gerar APK/IPA para instalação
- ✅ Link permanente para distribuir

## 🔧 Configurar App Mobile para API do Render

### Passo 1: Obter URL do Render

Após o deploy no Render ser concluído, você terá uma URL como:
```
https://loja-3.onrender.com
```

### Passo 2: Atualizar Config do Mobile

1. Abra o arquivo: `mobile/config.ts`
2. Atualize assim:

```typescript
// DESENVOLVIMENTO: Use o IP da sua máquina na rede local
const DEV_IP = '10.39.22.123'; // Mantenha seu IP local

// PRODUÇÃO: URL pública da sua API no Render
const PROD_API_URL = 'https://loja-3.onrender.com/api'; // ⬅️ COLE SUA URL DO RENDER AQUI

// Escolha o ambiente
const IS_DEV = false; // ⬅️ MUDE PARA false para usar produção

export const API_URL = IS_DEV 
  ? `http://${DEV_IP}:5000/api`
  : PROD_API_URL;
```

### Passo 3: Testar

1. Faça commit e push das alterações
2. Execute `npm start` na pasta `mobile`
3. Teste o app - deve conectar na API do Render

## 📦 Publicar no Expo (Opcional)

Se quiser publicar o app para distribuição:

### Pré-requisitos

1. Instalar EAS CLI:
```bash
npm install -g eas-cli
```

2. Fazer login no Expo:
```bash
eas login
```

### Configurar EAS

1. Na pasta `mobile`, execute:
```bash
eas build:configure
```

2. Isso criará um arquivo `eas.json` (se não existir)

### Publicar

1. **Publicar para desenvolvimento (Expo Go):**
```bash
eas update --branch preview
```

2. **Publicar para produção:**
```bash
eas update --branch production
```

3. **Gerar APK para Android:**
```bash
eas build --platform android --profile preview
```

4. **Gerar IPA para iOS:**
```bash
eas build --platform ios --profile preview
```

## 🔄 Workflow Recomendado

### Para Desenvolvimento:
1. Use `IS_DEV = true` no `config.ts`
2. Use Expo Go localmente
3. API local ou Render (teste)

### Para Produção:
1. Configure `IS_DEV = false` no `config.ts`
2. Coloque a URL do Render em `PROD_API_URL`
3. Publique no Expo (opcional)
4. Distribua o app

## 📝 Resumo

- ✅ **Backend no Render**: Já está configurado ✅
- ⚠️ **App Mobile**: 
  - Opção 1: Use localmente (não precisa publicar)
  - Opção 2: Publique no Expo (para produção)

**Para começar a usar agora:**
1. Obtenha a URL do seu serviço no Render
2. Atualize `mobile/config.ts` com a URL
3. Configure `IS_DEV = false`
4. Teste o app

## 🎯 Próximos Passos

1. ✅ Aguardar deploy do Render completar
2. ⏳ Obter URL do Render
3. ⏳ Atualizar `mobile/config.ts`
4. ⏳ Testar app mobile
5. ⏳ (Opcional) Publicar no Expo

