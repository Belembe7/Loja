# 🔧 Corrigir Erro: ModuleNotFoundError: No module named 'app'

## ❌ Erro Atual

```
ModuleNotFoundError: No module named 'app'
==> Running 'gunicorn app:app --bind 0.0.0.0:$PORT'
```

## ✅ Solução

O problema é que o Gunicorn está tentando executar na raiz do projeto, mas o `app.py` está dentro da pasta `backend/`.

### Configuração no Render

No dashboard do Render, vá em **Settings** → **Build & Deploy**:

#### **Opção 1: SEM Root Directory (RECOMENDADO)**

- **Root Directory**: (deixe **VAZIO**)
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `cd backend && gunicorn app:app --bind 0.0.0.0:$PORT`

#### **Opção 2: COM Root Directory = `backend`**

- **Root Directory**: `backend`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn app:app --bind 0.0.0.0:$PORT`

## 📋 Configuração Completa Recomendada

Use esta configuração:

- **Runtime**: `Python 3` ⚠️ **MUITO IMPORTANTE**
- **Root Directory**: (deixe **VAZIO**)
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `cd backend && gunicorn app:app --bind 0.0.0.0:$PORT`
- **Branch**: `main`

### Environment Variables:

- **FLASK_ENV** = `production`
- **PYTHON_VERSION** = `3.11.0`

## 🔍 Verificação

Após configurar e fazer o deploy, os logs devem mostrar:

```
==> Running build command 'pip install -r requirements.txt'
Collecting Flask==3.1.2
Collecting Flask-CORS==6.0.1
Collecting gunicorn==21.2.0
...
==> Running 'cd backend && gunicorn app:app --bind 0.0.0.0:$PORT'
[INFO] Starting gunicorn 21.2.0
[INFO] Listening at: http://0.0.0.0:XXXXX
[INFO] Using worker: sync
[INFO] Booting worker with pid: XXXX
```

## ⚠️ Alternativa: Usar Python (Desenvolvimento)

Se o Gunicorn ainda não funcionar, você pode usar o servidor Flask de desenvolvimento:

- **Start Command**: `cd backend && python app.py`

Mas **recomendado usar Gunicorn** para produção.

## 🎯 Teste Esta Configuração

Configure no Render:

- **Root Directory**: (vazio)
- **Start Command**: `cd backend && gunicorn app:app --bind 0.0.0.0:$PORT`

Isso deve resolver o erro!

