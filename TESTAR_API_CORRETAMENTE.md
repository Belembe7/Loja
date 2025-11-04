# 🔍 Como Testar a API Corretamente

## ❌ Erro Encontrado

A URL está malformada no navegador. A URL correta deve ser:

```
https://loja-3-frjr.onrender.com/api/produtos
```

**NÃO** use:
- `loja-3-frjr.onrender.com/api/produtoshttps://loja-3-frjr.onrender.com/api/categorias` ❌
- URLs concatenadas ❌

## ✅ URLs Corretas para Testar

### 1. Status da API
```
https://loja-3-frjr.onrender.com/api/status
```

### 2. Listar Produtos
```
https://loja-3-frjr.onrender.com/api/produtos
```

### 3. Listar Categorias
```
https://loja-3-frjr.onrender.com/api/categorias
```

### 4. Buscar Produto por ID
```
https://loja-3-frjr.onrender.com/api/produtos/1
```

### 5. Produtos por Categoria
```
https://loja-3-frjr.onrender.com/api/categorias/1/produtos
```

## 🔧 Como Testar Corretamente

### Passo 1: Verificar se o Serviço Está Online

1. Acesse o dashboard do Render: https://dashboard.render.com
2. Clique no serviço "Loja-3"
3. Verifique o status:
   - ✅ **"Live"** ou **"Available"** = Serviço está online
   - ⏳ **"Building"** ou **"Deploying"** = Aguarde o deploy
   - ❌ **"Failed"** = Há um erro, verifique os logs
   - 😴 **"Sleeping"** = Serviço dormindo (plano gratuito)

### Passo 2: Se o Serviço Estiver Dormindo

No plano gratuito, o serviço dorme após 15 minutos de inatividade:

1. A primeira requisição pode levar **30-60 segundos** para "acordar"
2. Aguarde um pouco e tente novamente
3. Isso é normal no plano gratuito

### Passo 3: Testar a URL Correta

1. **Copie exatamente** a URL abaixo:
   ```
   https://loja-3-frjr.onrender.com/api/status
   ```

2. **Cole no navegador** (certifique-se de copiar apenas UMA URL por vez)

3. **Pressione Enter**

4. Você deve ver:
   ```json
   {
     "status": "online",
     "mensagem": "API funcionando! ✅",
     "servico": "K-TECH Loja API",
     "versao": "1.0.0"
   }
   ```

## 🐛 Troubleshooting

### Erro 404 - Not Found

**Possíveis causas:**
1. URL incorreta ou malformada
2. Serviço não está online
3. Deploy não foi concluído

**Solução:**
1. Verifique o status no dashboard do Render
2. Use a URL exata: `https://loja-3-frjr.onrender.com/api/status`
3. Aguarde o deploy concluir se estiver em "Building"

### Erro 500 - Internal Server Error

**Possíveis causas:**
1. Erro no código da API
2. Banco de dados não inicializado
3. Erro no servidor

**Solução:**
1. Verifique os logs no Render
2. Vá em "Logs" no dashboard
3. Veja o erro específico

### Timeout ou Erro de Conexão

**Possíveis causas:**
1. Serviço dormindo (plano gratuito)
2. Render está com problemas

**Solução:**
1. Aguarde 30-60 segundos e tente novamente
2. Verifique o status do Render: https://status.render.com

## 📋 Checklist de Verificação

- [ ] Serviço está "Live" ou "Available" no Render
- [ ] URL está correta (começa com `https://`)
- [ ] URL não está concatenada ou malformada
- [ ] Aguardou 30-60 segundos se o serviço estava dormindo
- [ ] Testou primeiro o endpoint `/api/status`

## 🎯 Teste Rápido

1. **Copie esta URL:**
   ```
   https://loja-3-frjr.onrender.com/api/status
   ```

2. **Cole no navegador**

3. **Pressione Enter**

4. **Se funcionar:** Você verá a mensagem "API funcionando! ✅"

5. **Se não funcionar:** Verifique o status no dashboard do Render

