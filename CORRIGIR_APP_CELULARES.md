# 📱 Corrigir App para Funcionar em Outros Celulares

## 🐛 Problema

Quando você instala o APK em outro celular via link Expo, o app mostra "Bem vindo ao React" em vez dos produtos da loja.

## 🔍 Causa

O app está tentando acessar `http://10.39.22.123:5000/api`, que é um IP **interno** da sua rede. Celulares em outras redes não conseguem acessar.

## ✅ Solução Rápida (Desenvolvimento)

Para fazer funcionar **agora mesmo** sem publicar a API:

### Opção A: Compartilhar Internet (Celular na Mesma Rede)

1. **Ligue o outro celular** no mesmo Wi-Fi que o seu computador
2. **Localize o IP** do computador:
   - No seu computador, abra PowerShell
   - Digite: `ipconfig`
   - Copie o "IPv4 Address" (ex: `192.168.1.100`)
3. **Atualize o arquivo** `mobile/config.ts`:
   ```typescript
   const DEV_IP = '192.168.1.100'; // Use o SEU IP aqui
   ```
4. **Rebuilde o app:**
   ```bash
   cd mobile
   eas build --platform android --profile production
   ```
5. **Baixe o novo APK** e instale no outro celular

### Opção B: Usar ngrok (URL Pública Temporária)

**ngrok cria uma URL pública** que aponta para sua API local:

1. **Baixe ngrok:** https://ngrok.com/download
2. **No seu computador**, com o Flask rodando:
   ```bash
   cd C:\Users\Elton\Desktop\Loja
   ngrok http 5000
   ```
3. **Copie a URL** que aparece tipo: `https://abc123def456.ngrok.io`
4. **Atualize** `mobile/config.ts`:
   ```typescript
   const IS_DEV = false;
   const PROD_API_URL = 'https://abc123def456.ngrok.io/api'; // URL do ngrok
   ```
5. **Rebuilde o app** e distribua o novo APK

⚠️ **Atenção:** A URL do ngrok muda a cada vez que você reinicia. Para uma solução permanente, use Railway ou Render.

## ✅ Solução Definitiva (Produção)

Para o app funcionar em **qualquer celular, em qualquer lugar**:

### 1. Publique a API no Railway

Veja instruções completas em `PUBLICAR_API.md`

Resumo rápido:
1. Acesse: https://railway.app
2. Conecte seu GitHub
3. Deploy do diretório `backend`
4. Copie a URL gerada (ex: `https://ktech-loja.up.railway.app`)

### 2. Configure o App

Edite `mobile/config.ts`:

```typescript
const IS_DEV = false;  // Troque de true para false
const PROD_API_URL = 'https://ktech-loja.up.railway.app/api'; // URL do Railway
```

### 3. Gere Novo Build

```bash
cd mobile
eas build --platform android --profile production
```

### 4. Distribua

Compartilhe o link do build Expo ou baixe o APK e envie para os celulares.

## 🔧 Verificar Configuração Atual

Para ver qual URL está sendo usada, olhe o console:

```bash
# No Android Studio ou Expo Go
# Procure por: "🔗 API URL:"
```

Ou adicione temporariamente em alguma tela:

```typescript
console.log('API_URL configurada:', API_URL);
```

## 📋 Checklist

- [ ] Identifiquei qual método vou usar (ngrok, Railway, ou mesma rede)
- [ ] Configurei `mobile/config.ts` com a URL correta
- [ ] Gerei novo build com `eas build`
- [ ] Testei o app no primeiro celular
- [ ] Confirmei que os produtos aparecem
- [ ] Distribuí o novo APK

## 🚨 Importante

**SQLite no Cloud:** Se publicar no Railway/Render, o SQLite pode perder dados. Considere migrar para PostgreSQL. Veja `PUBLICAR_API.md` para detalhes.

## 📞 Precisa de Ajuda?

- Veja `PUBLICAR_API.md` para hospedar a API
- Veja `README.md` para configuração geral
- Verifique se o Flask está rodando: `curl http://localhost:5000/api/produtos`

