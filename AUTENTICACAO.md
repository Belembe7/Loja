# 🔐 Sistema de Autenticação - K-Tech

## ✅ Autenticação Implementada!

O sistema agora possui **autenticação completa** para proteger a área administrativa.

---

## 🚀 Como Funciona

### 1️⃣ **Credenciais Padrão**
- **Usuário:** `admin`
- **Senha:** `ktech2024`

⚠️ **IMPORTANTE:** Em produção, você deve alterar essa senha!

### 2️⃣ **Fluxo de Autenticação**

```
Usuário acessa → /admin.html
       ↓
Redirecionado → /login.html
       ↓
Digita credenciais → Verifica API
       ↓
Se válido → Sessão criada → Acesso liberado
       ↓
Pode gerenciar produtos/categorias
       ↓
Logout → Sessão destruída
```

---

## 📋 Rotas Protegidas

As seguintes rotas **REQUEREM** autenticação:

- ✅ `POST /api/produtos` - Criar produto
- ✅ `PUT /api/produtos/<id>` - Atualizar produto  
- ✅ `DELETE /api/produtos/<id>` - Deletar produto
- ✅ `POST /api/categorias` - Criar categoria
- ✅ `POST /api/upload` - Upload de imagens

As seguintes rotas são **PÚBLICAS** (sem autenticação):

- ✅ `GET /api/produtos` - Listar produtos
- ✅ `GET /api/produtos/<id>` - Ver produto
- ✅ `GET /api/categorias` - Listar categorias
- ✅ `GET /api/categorias/<id>/produtos` - Produtos por categoria
- ✅ `GET /api/uploads/<arquivo>` - Baixar imagem

---

## 🌐 Páginas HTML

### `/login.html`
- Tela de login bonita
- Valida credenciais
- Mostra credenciais padrão
- Redireciona para admin após login

### `/admin.html`
- Verifica autenticação ao carregar
- Redireciona para login se não autenticado
- Botão "Sair" no cabeçalho
- Todas operações verificam sessão

---

## 🔄 Como Testar

### 1️⃣ Tentar Acessar Admin Sem Login
```
1. Abra: http://localhost:5000/admin.html
2. Você será redirecionado para /login.html
3. ✅ Funciona!
```

### 2️⃣ Fazer Login Válido
```
1. Digite: admin / ktech2024
2. Clique em "Entrar"
3. Redireciona para /admin.html
4. ✅ Tela admin carrega!
```

### 3️⃣ Fazer Login Inválido
```
1. Digite: admin / senhaerrada
2. Clique em "Entrar"
3. Mostra erro "Credenciais inválidas"
4. ✅ Não redireciona!
```

### 4️⃣ Tentar Criar Produto Sem Login
```
1. Abra a tela admin
2. Clique em "Sair"
3. Tente criar um produto via API direta
4. Retorna erro 401 "Não autenticado"
5. ✅ Proteção funcionando!
```

---

## 🛠️ Como Alterar as Credenciais

Edite o arquivo `backend/app.py`, linha 231:

```python
# Credenciais (em produção, use hash de senha!)
if username == 'admin' and password == 'ktech2024':
    session['admin_logged_in'] = True
    return jsonify({'sucesso': True, 'mensagem': 'Login realizado com sucesso'}), 200
```

**Para Produção:**
- Use biblioteca `werkzeug.security` para hash de senha
- Armazene senhas no banco de dados
- Implemente múltiplos usuários

---

## 📊 Estrutura da Sessão

**Sessão Flask (`session`)**
```python
session['admin_logged_in'] = True  # Após login bem-sucedido
```

**Remoção da Sessão**
```python
session.pop('admin_logged_in', None)  # Ao fazer logout
```

---

## 🔒 Segurança

### ✅ Implementado
- Verificação de sessão em rotas protegidas
- Redirecionamento automático se não autenticado
- Logout limpa sessão
- Proteção contra acesso direto à API

### ⚠️ Recomendações para Produção
- [ ] Hash de senhas com `werkzeug.security.check_password_hash()`
- [ ] Múltiplos usuários no banco de dados
- [ ] Tokens JWT em vez de sessões simples
- [ ] Rate limiting (limitar tentativas de login)
- [ ] HTTPS obrigatório
- [ ] Expiração de sessão
- [ ] Logs de auditoria

---

## 🐛 Troubleshooting

### Erro "Não autenticado" mesmo após login
- Limpe os cookies do navegador
- Reinicie o servidor Flask
- Verifique se `SECRET_KEY` está configurado

### Redirecionamento infinito
- Verifique se as rotas `/api/check-auth` e `/api/login` existem
- Confirme que CORS está habilitado

### Sessão perdida a cada requisição
- Certifique-se que `SECRET_KEY` está definida
- Verifique se os cookies estão habilitados no navegador

---

**✅ Sistema de autenticação pronto e funcionando!**



