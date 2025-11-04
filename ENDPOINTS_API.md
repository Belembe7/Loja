# 🌐 Endpoints da API - K-TECH Loja

Lista completa de endpoints para testar no navegador.

**Base URL**: `https://sua-url-do-render.onrender.com`

**Exemplo**: `https://loja-3.onrender.com`

---

## 📦 **PRODUTOS**

### 1. Listar Todos os Produtos
**GET** `/api/produtos`

**Teste no navegador:**
```
https://sua-url-do-render.onrender.com/api/produtos
```

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "iPhone 15 Pro",
    "preco": 1299.99,
    "descricao": "Smartphone Apple com chip A17 Pro",
    "imagem_url": "https://images.unsplash.com/...",
    "estoque": 15,
    "categoria_id": 1
  },
  ...
]
```

---

### 2. Buscar Produto por ID
**GET** `/api/produtos/{id}`

**Teste no navegador:**
```
https://sua-url-do-render.onrender.com/api/produtos/1
https://sua-url-do-render.onrender.com/api/produtos/2
```

**Resposta:**
```json
{
  "id": 1,
  "nome": "iPhone 15 Pro",
  "preco": 1299.99,
  "descricao": "Smartphone Apple com chip A17 Pro",
  "imagem_url": "https://images.unsplash.com/...",
  "estoque": 15,
  "categoria_id": 1
}
```

---

### 3. Criar Produto (Requer Autenticação)
**POST** `/api/produtos`

**Requisição:**
```json
{
  "nome": "Novo Produto",
  "preco": 999.99,
  "descricao": "Descrição do produto",
  "imagem_url": "https://exemplo.com/imagem.jpg",
  "estoque": 10,
  "categoria_id": 1
}
```

**Teste:** Use Postman, Insomnia ou curl. Não funciona direto no navegador (POST).

---

### 4. Atualizar Produto (Requer Autenticação)
**PUT** `/api/produtos/{id}`

**Teste:** Use Postman, Insomnia ou curl.

---

### 5. Deletar Produto (Requer Autenticação)
**DELETE** `/api/produtos/{id}`

**Teste:** Use Postman, Insomnia ou curl.

---

## 📂 **CATEGORIAS**

### 1. Listar Todas as Categorias
**GET** `/api/categorias`

**Teste no navegador:**
```
https://sua-url-do-render.onrender.com/api/categorias
```

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Smartphones",
    "imagem_url": "https://images.unsplash.com/..."
  },
  {
    "id": 2,
    "nome": "Laptops",
    "imagem_url": "https://images.unsplash.com/..."
  },
  ...
]
```

---

### 2. Criar Categoria (Requer Autenticação)
**POST** `/api/categorias`

**Teste:** Use Postman, Insomnia ou curl.

---

### 3. Listar Produtos por Categoria
**GET** `/api/categorias/{id}/produtos`

**Teste no navegador:**
```
https://sua-url-do-render.onrender.com/api/categorias/1/produtos
https://sua-url-do-render.onrender.com/api/categorias/2/produtos
```

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "iPhone 15 Pro",
    "preco": 1299.99,
    ...
  },
  ...
]
```

---

## 📤 **UPLOAD DE IMAGENS**

### 1. Upload de Imagem (Requer Autenticação)
**POST** `/api/upload`

**Teste:** Use Postman, Insomnia ou formulário HTML.

---

### 2. Acessar Imagem Enviada
**GET** `/api/uploads/{filename}`

**Teste no navegador:**
```
https://sua-url-do-render.onrender.com/api/uploads/nome_arquivo.jpg
```

---

## 🔐 **AUTENTICAÇÃO**

### 1. Login
**POST** `/api/login`

**Requisição:**
```json
{
  "username": "admin",
  "password": "ktech2024"
}
```

**Credenciais:**
- **Usuário**: `admin`
- **Senha**: `ktech2024`

**Teste:** Use Postman, Insomnia ou curl.

---

### 2. Logout
**POST** `/api/logout`

**Teste:** Use Postman, Insomnia ou curl.

---

### 3. Verificar Autenticação
**GET** `/api/check-auth`

**Teste no navegador:**
```
https://sua-url-do-render.onrender.com/api/check-auth
```

**Resposta (autenticado):**
```json
{
  "autenticado": true
}
```

**Resposta (não autenticado):**
```json
{
  "autenticado": false
}
```

---

## 🌐 **INTERFACES WEB**

### 1. Página de Login
**GET** `/login.html`

**Teste no navegador:**
```
https://sua-url-do-render.onrender.com/login.html
```

---

### 2. Interface de Administração
**GET** `/admin.html`

**Teste no navegador:**
```
https://sua-url-do-render.onrender.com/admin.html
```

---

## 📋 **RESUMO - Endpoints para Testar no Navegador**

### ✅ **GET - Funciona Direto no Navegador:**

1. **Listar Produtos:**
   ```
   https://sua-url-do-render.onrender.com/api/produtos
   ```

2. **Buscar Produto por ID:**
   ```
   https://sua-url-do-render.onrender.com/api/produtos/1
   ```

3. **Listar Categorias:**
   ```
   https://sua-url-do-render.onrender.com/api/categorias
   ```

4. **Produtos por Categoria:**
   ```
   https://sua-url-do-render.onrender.com/api/categorias/1/produtos
   ```

5. **Verificar Autenticação:**
   ```
   https://sua-url-do-render.onrender.com/api/check-auth
   ```

6. **Página de Login:**
   ```
   https://sua-url-do-render.onrender.com/login.html
   ```

7. **Interface Admin:**
   ```
   https://sua-url-do-render.onrender.com/admin.html
   ```

### ⚠️ **POST/PUT/DELETE - Requerem Ferramentas:**

- Postman
- Insomnia
- curl
- Formulário HTML

---

## 🧪 **Teste Rápido**

1. **Substitua** `sua-url-do-render.onrender.com` pela URL real do seu Render
2. **Cole no navegador** os endpoints GET acima
3. **Veja o JSON** retornado

---

## 📝 **Exemplo Completo**

Se sua URL do Render for: `https://loja-3.onrender.com`

**Teste estes links no navegador:**

```
https://loja-3.onrender.com/api/produtos
https://loja-3.onrender.com/api/categorias
https://loja-3.onrender.com/api/categorias/1/produtos
https://loja-3.onrender.com/api/produtos/1
https://loja-3.onrender.com/login.html
https://loja-3.onrender.com/admin.html
```

---

## 🔧 **Ferramentas Recomendadas para Testar POST/PUT/DELETE**

### Postman
- Download: https://www.postman.com/downloads/
- Permite testar todos os métodos HTTP

### Insomnia
- Download: https://insomnia.rest/download
- Alternativa ao Postman

### curl (Linha de Comando)
```bash
# Exemplo de login
curl -X POST https://sua-url.onrender.com/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"ktech2024"}'
```

---

## ⚠️ **Nota Importante**

No plano gratuito do Render:
- O serviço pode dormir após 15 minutos de inatividade
- A primeira requisição após dormir pode levar 30-60 segundos
- Isso é normal no plano gratuito

