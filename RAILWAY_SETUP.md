# 🚂 Publicar API no Railway - Passo a Passo

## Por que Railway?

- ✅ **Grátis** para começar
- ✅ **Fácil** de configurar
- ✅ **URL permanente** (não muda)
- ✅ **Banco PostgreSQL** gratuito incluído
- ✅ **Deploy automático** do GitHub

## 📋 Pré-requisitos

1. Conta GitHub
2. Repositório do projeto no GitHub
3. Conta Railway (crie em https://railway.app)

## 🚀 Passo a Passo

### 1. Preparar o Backend

Railway precisa saber como iniciar o Flask. Vamos criar um arquivo `Procfile`:

**Crie:** `backend/Procfile` (sem extensão)
```
web: cd backend && python app.py
```

**OU ajuste para o Railway usar automaticamente o Python:**

Edite `backend/app.py` e adicione no final:
```python
import os

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
```

### 2. Configurar Variáveis de Ambiente

Railway precisa dessas variáveis:

Crie `backend/.env.example`:
```
PORT=5000
DATABASE_URL=sqlite:///loja.db
FLASK_ENV=production
```

### 3. Subir para o GitHub

```bash
cd C:\Users\Elton\Desktop\Loja

# Se ainda não tem um repositório
git init
git add .
git commit -m "Initial commit"
git branch -M main

# Crie o repositório no GitHub primeiro, depois:
git remote add origin https://github.com/SEU_USUARIO/Loja.git
git push -u origin main
```

### 4. Conectar ao Railway

1. Acesse: https://railway.app
2. Clique em **"Login"** → **"Login with GitHub"**
3. Autorize o Railway a acessar seu GitHub

### 5. Criar Novo Projeto

1. Clique em **"New Project"**
2. Escolha **"Deploy from GitHub repo"**
3. Selecione seu repositório **"Loja"**
4. Aguarde o Railway detectar o projeto

### 6. Configurar Deploy

Railway vai tentar detectar automaticamente, mas configure assim:

**Settings → Deploy:**
- **Root Directory:** `backend`
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `python app.py`

### 7. Adicionar Variáveis de Ambiente

**Variables:**
```
PORT=5000
PYTHON_VERSION=3.11
```

### 8. Configurar Domínio

1. Na aba **"Settings"** → **"Networking"**
2. Clique em **"Generate Domain"**
3. Railway gerará algo como: `seu-app-production.up.railway.app`
4. **Copie essa URL!**

### 9. Atualizar o App Mobile

Edite `mobile/config.ts`:

```typescript
const IS_DEV = false;  // Troca para false
const PROD_API_URL = 'https://seu-app-production.up.railway.app/api'; // URL do Railway
```

### 10. Gerar Novo Build

```bash
cd mobile
eas build --platform android --profile production
```

Aguarde o build terminar e baixe o novo APK.

### 11. Testar

Instale o APK em qualquer celular (não precisa estar na mesma rede).

Os produtos devem aparecer!

## 🗄️ Problema: SQLite Perde Dados

**SQLite no Railway pode perder dados** quando o serviço reinicia.

### Solução: Usar PostgreSQL (RECOMENDADO)

Railway oferece PostgreSQL gratuito:

1. No Railway, clique em **"+ New"** → **"Database"** → **"Add PostgreSQL"**
2. Railway cria um PostgreSQL e uma variável `DATABASE_URL`
3. Atualize `backend/app.py` para usar PostgreSQL:

```python
import os
import psycopg2
from urllib.parse import urlparse

# Função para conectar ao PostgreSQL
def get_db_connection():
    if os.environ.get('DATABASE_URL'):
        # Produção: Railway com PostgreSQL
        url = urlparse(os.environ.get('DATABASE_URL'))
        conn = psycopg2.connect(
            database=url.path[1:],
            user=url.username,
            password=url.password,
            host=url.hostname,
            port=url.port
        )
    else:
        # Desenvolvimento: SQLite local
        conn = sqlite3.connect(DATABASE)
        conn.row_factory = sqlite3.Row
    return conn
```

**Instale psycopg2:**
```bash
pip install psycopg2-binary
```

Adicione em `requirements.txt`:
```
psycopg2-binary
```

**Re-deploy** no Railway.

## 🔄 Atualizações Automáticas

Railway faz deploy automático quando você faz `git push`.

```bash
git add .
git commit -m "Atualização"
git push origin main
```

Railway detecta e faz o deploy automaticamente!

## 💰 Custos

- **Plano Free:** Grátis para sempre
  - $5 crédito/mês
  - Suficiente para apps pequenos
- **Pro:** $20/mês (se precisar de mais)

## 📞 Troubleshooting

**App não conecta:**
- Verifique se a URL em `config.ts` tem `/api` no final
- Confira se Railway está rodando (Dashboard → Deployments)

**Erro 500:**
- Veja logs em **Deployments** → **View Logs**
- Provavelmente erro no código Python

**Produtos não aparecem:**
- SQLite foi resetado? Use PostgreSQL
- Verifique se há produtos no banco via admin.html

## ✅ Checklist Final

- [ ] Projeto no GitHub
- [ ] Conta Railway criada
- [ ] Deploy configurado
- [ ] Domínio gerado
- [ ] `config.ts` atualizado
- [ ] Novo build do app gerado
- [ ] Testado no celular
- [ ] PostgreSQL configurado (opcional mas recomendado)

## 🎉 Pronto!

Seu app agora funciona em **qualquer celular, em qualquer lugar**!

