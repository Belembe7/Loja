# 🔧 Solução para Erro de Deploy no Render

## ❌ Erro Encontrado

```
ERROR: Could not open requirements file: [Errno 2] No such file or directory: 'requirements.txt'
```

## ✅ Solução

O erro ocorre porque o Render não está encontrando o arquivo `requirements.txt`. Existem duas formas de resolver:

### **Opção 1: Configurar Root Directory (RECOMENDADO)**

1. No dashboard do Render, vá em **Settings** do seu serviço
2. Role até **Build & Deploy**
3. Configure o **Root Directory** como: `backend`
4. Configure o **Build Command** como: `pip install -r requirements.txt`
5. Configure o **Start Command** como: `python app.py`
6. Salve as alterações
7. Faça um novo deploy (Manual Deploy)

### **Opção 2: Sem Root Directory (ALTERNATIVA)**

Se você **NÃO** configurou Root Directory, ou se a Opção 1 não funcionar:

1. No dashboard do Render, vá em **Settings** do seu serviço
2. Role até **Build & Deploy**
3. Deixe o **Root Directory** **VAZIO** (não preencher nada)
4. Configure o **Build Command** como: `cd backend && pip install -r requirements.txt`
5. Configure o **Start Command** como: `cd backend && python app.py`
6. Salve as alterações
7. Faça um novo deploy (Manual Deploy)

## 📋 Verificação Completa das Configurações

Certifique-se de que as seguintes configurações estão corretas:

### **Se Root Directory = `backend`**:
- ✅ Root Directory: `backend`
- ✅ Build Command: `pip install -r requirements.txt`
- ✅ Start Command: `python app.py`

### **Se Root Directory = vazio**:
- ✅ Root Directory: (deixe vazio)
- ✅ Build Command: `cd backend && pip install -r requirements.txt`
- ✅ Start Command: `cd backend && python app.py`

## 🔍 Verificar se o Arquivo Existe

Certifique-se de que o arquivo `backend/requirements.txt` existe no repositório:

1. Acesse: https://github.com/Belembe7/Loja
2. Verifique se existe o arquivo em: `backend/requirements.txt`
3. Se não existir, adicione-o e faça commit

## 🚀 Após Corrigir

1. Vá em **Manual Deploy** no dashboard do Render
2. Clique em **Deploy latest commit**
3. Aguarde o build completar
4. Verifique os logs para confirmar sucesso

## 📞 Se Ainda Não Funcionar

Se após essas correções ainda houver erro:

1. Verifique os logs completos no Render
2. Confirme que o arquivo `requirements.txt` está no GitHub
3. Tente criar um novo serviço do zero com as configurações corretas

