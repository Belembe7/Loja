# 🌐 Como Publicar a API para Acesso Externo

## ⚠️ Problema Atual

O app está configurado para usar `http://10.39.22.123:5000/api`, que é um IP **interno da sua rede local**. 

Quando você instala o APK em outro celular (via link Expo), o celular **não consegue acessar** esse IP porque não está na mesma rede Wi-Fi.

## ✅ Soluções

Você tem 3 opções:

### Opção 1: Publicar API no Railway (RECOMENDADO) 🚂

Railway é gratuito e fácil:

1. **Acesse:** https://railway.app
2. **Cadastre** com GitHub
3. **Clique em:** "New Project"
4. **Escolha:** "Deploy from GitHub repo"
5. **Conecte seu repositório** do Loja
6. **Configure:**
   - **Start Command:** `cd backend && python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt && python app.py`
   - **Port:** 5000
7. **Railway gera** uma URL pública tipo: `https://seu-app.up.railway.app`

**Depois, no arquivo `mobile/config.ts`:**
```typescript
const IS_DEV = false;
const PROD_API_URL = 'https://seu-app.up.railway.app/api';
```

### Opção 2: Publicar API no Render 🎨

1. **Acesse:** https://render.com
2. **Cadastre** com GitHub
3. **Clique em:** "New +" → "Web Service"
4. **Conecte** seu repositório
5. **Configure:**
   - **Name:** loja-ktech-api
   - **Root Directory:** backend
   - **Environment:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python app.py`
6. **Render gera:** `https://loja-ktech-api.onrender.com`

### Opção 3: Usar ngrok (DESENVOLVIMENTO) 🔧

Para **desenvolvimento rápido** (não recomendado para produção):

1. **Baixe ngrok:** https://ngrok.com/download
2. **Execute:** `ngrok http 5000`
3. **Copie a URL** tipo: `https://abc123.ngrok.io`
4. **Configure em `mobile/config.ts`:**

```typescript
const PROD_API_URL = 'https://abc123.ngrok.io/api';
const IS_DEV = false;
```

⚠️ **ngrok é temporário** - a URL muda a cada restart!

## 📝 Configurar Após Publicar

Edite `mobile/config.ts`:

```typescript
const IS_DEV = false;
const PROD_API_URL = 'https://sua-url-aqui.com/api';
```

## 🏗️ Gerar Novo Build

Depois de configurar a URL pública:

```bash
cd mobile
eas build --platform android --profile production
```

Ou via Expo:
```bash
eas build --platform android
```

## 🔍 Verificar

1. Instale o novo APK
2. Veja o console (Logcat) ou adicione um `console.log` em `config.ts`
3. Deve aparecer a URL correta

## 🐳 Problema: SQLite no Cloud

**SQLite não funciona bem** em plataformas cloud porque perde dados ao reiniciar.

**SOLUÇÃO:** Converter para PostgreSQL:

1. Railway/Render tem **PostgreSQL gratuito**
2. Troque o banco no código (direto na cloud)
3. Ou use um serviço de banco dedicado

Quer que eu ajude a configurar PostgreSQL?

## 📞 Resumo

| Plataforma | Grátis? | Dificuldade | URL Fixa? |
|------------|---------|-------------|-----------|
| Railway    | ✅ Sim  | Fácil       | ✅ Sim    |
| Render     | ✅ Sim  | Fácil       | ✅ Sim    |
| ngrok      | ⚠️ Trial| Muito fácil | ❌ Não    |
| Heroku     | ❌ Não  | Médio       | ✅ Sim    |

**Recomendação:** Railway ou Render

