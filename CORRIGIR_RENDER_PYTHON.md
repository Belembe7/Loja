# 🔧 Corrigir Erro: Render executando npm start ao invés de Python

## ❌ Erro Atual

O Render está tentando executar `npm start` (Node.js) ao invés de `python app.py` (Python/Flask).

**Erro nos logs:**
```
==> Running 'npm start'
npm error enoent Could not read package.json
```

## ✅ Solução

O projeto é **Python/Flask**, não Node.js. Precisa configurar o Runtime corretamente.

### Passo 1: Ir em Settings

1. No dashboard do Render, clique em **Settings** (no menu lateral)
2. Role até a seção **Build & Deploy**

### Passo 2: Configurar Runtime

⚠️ **IMPORTANTE**: Certifique-se que o campo **Runtime** está configurado como **Python 3**

Se estiver como "Node" ou "Auto-detect", mude para **Python 3**.

### Passo 3: Verificar Start Command

No campo **Start Command**, deve estar:

```
python app.py
```

**NÃO deve estar**:
- `npm start` ❌
- `node app.js` ❌
- `npm run start` ❌

### Passo 4: Verificar Build Command

No campo **Build Command**, deve estar:

```
pip install -r requirements.txt
```

### Passo 5: Verificar Root Directory

No campo **Root Directory**, deve estar:

```
backend
```

(Apenas o nome da pasta, sem comandos)

## 📋 Configuração Completa Correta

Certifique-se que está assim:

- **Runtime**: `Python 3` ⚠️ **MUITO IMPORTANTE**
- **Root Directory**: `backend`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `python app.py`
- **Branch**: `main`

### Environment Variables (Variáveis de Ambiente):

- **FLASK_ENV** = `production`
- **PYTHON_VERSION** = `3.11.0` (opcional, mas recomendado)

## 🚀 Após Corrigir

1. Clique em **Save Changes**
2. Vá em **Manual Deploy** → **Deploy latest commit**
3. Aguarde o build completar
4. Os logs devem mostrar:
   - `==> Installing Python version...`
   - `==> Running build command 'pip install -r requirements.txt'`
   - `==> Running 'python app.py'` ✅

## 🔍 Como Verificar se Está Correto

Após fazer o deploy, verifique os logs. Você deve ver:

✅ **Correto:**
```
==> Installing Python version 3.11.0...
==> Running build command 'pip install -r requirements.txt'
==> Running 'python app.py'
```

❌ **Errado (se aparecer isso):**
```
==> Running 'npm start'
npm error...
```

## ⚠️ Se o Runtime Não Aparecer

Se você não conseguir ver ou mudar o campo Runtime:

1. **Delete o serviço atual** (em Settings → Danger Zone → Delete)
2. **Crie um novo Web Service** do zero
3. Ao criar, certifique-se de selecionar **Python** como runtime
4. Configure tudo conforme o guia acima

## 📝 Nota

Se o Render detectou automaticamente como Node.js (por causa da pasta `mobile/` com `package.json`), você precisa forçar o runtime como Python.

O Render detecta automaticamente o runtime, mas às vezes pode confundir quando há múltiplos projetos no mesmo repositório (backend Python + mobile Node.js).

Por isso é importante **configurar manualmente** o Runtime como **Python 3**.

