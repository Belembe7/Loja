# 🔍 Como Encontrar a URL do Render

## 📍 Onde Encontrar a URL

### No Dashboard do Render:

1. **Acesse:** https://dashboard.render.com
2. **Clique no seu serviço** (ex: "Loja-3")
3. No topo da página, você verá a **URL** do serviço

A URL será algo como:
```
https://loja-3.onrender.com
```
ou
```
https://ktech-loja-api.onrender.com
```

## 🔗 Como Usar a URL Correta

**NÃO use:** `sua-url-do-render.onrender.com` (isso é apenas um exemplo!)

**USE:** A URL real do seu serviço, por exemplo:
```
https://loja-3.onrender.com
```

## 📋 Exemplos de Endpoints com URL Real

Se sua URL do Render for: `https://loja-3.onrender.com`

**Teste estes links no navegador:**

### 1. Listar Produtos:
```
https://loja-3.onrender.com/api/produtos
```

### 2. Listar Categorias:
```
https://loja-3.onrender.com/api/categorias
```

### 3. Buscar Produto por ID:
```
https://loja-3.onrender.com/api/produtos/1
```

### 4. Produtos por Categoria:
```
https://loja-3.onrender.com/api/categorias/1/produtos
```

### 5. Página de Login:
```
https://loja-3.onrender.com/login.html
```

### 6. Interface Admin:
```
https://loja-3.onrender.com/admin.html
```

## ⚠️ Erros Comuns

### ❌ Erro: "Not Found"
- Você está usando a URL literal `sua-url-do-render.onrender.com`
- **Solução:** Use a URL real do seu serviço no Render

### ❌ Erro: "Service Unavailable" ou Timeout
- O serviço pode estar dormindo (plano gratuito)
- Aguarde 30-60 segundos e tente novamente
- A primeira requisição após dormir demora mais

### ❌ Erro: "Cannot GET /api/categorias"
- Verifique se o deploy foi concluído com sucesso
- Verifique os logs no Render para erros

## 🔍 Verificar se o Serviço Está Online

1. Acesse o dashboard do Render
2. Veja o status do serviço
3. Deve estar "Live" ou "Available"
4. Se estiver "Building" ou "Deploying", aguarde

## 📝 Checklist

- [ ] Encontrei a URL real no dashboard do Render
- [ ] Copiei a URL completa (ex: `https://loja-3.onrender.com`)
- [ ] Substituí `sua-url-do-render.onrender.com` pela URL real
- [ ] Testei o endpoint no navegador
- [ ] Verifiquei que o serviço está "Live" no Render

