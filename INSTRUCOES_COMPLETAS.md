# 📖 Instruções Completas - K-Tech Admin

## 🎯 Sistema Completo Implementado

O projeto agora possui:
1. ✅ **Interface Web de Administração** (`backend/admin.html`)
2. ✅ **Upload de Imagens** para produtos e categorias
3. ✅ **Filtro de Produtos** por categoria no app mobile
4. ✅ **Imagens Reais** em vez de ícones

## 🚀 Como Usar o Sistema

### 1️⃣ Primeira Execução (Backend)

```bash
cd C:\Users\Elton\Desktop\Loja\backend
.\venv\Scripts\Activate.ps1
python app.py
```

**Resultado:**
- Banco de dados criado automaticamente
- 4 categorias de exemplo com imagens
- 6 produtos de exemplo com imagens
- Servidor rodando em `http://0.0.0.0:5000`

### 2️⃣ Gerenciar Produtos/Categorias

**Abra seu navegador e acesse:**
```
http://localhost:5000/admin.html
```

**⚠️ IMPORTANTE:** Você será redirecionado para fazer login!

**Credenciais:**
- **Usuário:** `admin`
- **Senha:** `ktech2024`

**Interface Web:**
- ✅ Login seguro com autenticação
- ✅ Adicionar novas categorias
- ✅ Upload de imagem para categorias
- ✅ Adicionar novos produtos
- ✅ Upload de imagem para produtos
- ✅ Selecionar categoria para cada produto
- ✅ Visualizar todos os produtos cadastrados
- ✅ Deletar produtos
- ✅ Logout seguro

### 3️⃣ Exemplo de Uso

**Adicionar uma Nova Categoria:**
1. No campo "Nome da Categoria", digite: "Tablets"
2. Clique em "📁 Clique para escolher uma imagem"
3. Selecione uma imagem de tablet
4. Clique em "Adicionar Categoria"

**Adicionar um Novo Produto:**
1. Preencha o nome: "iPad Pro"
2. Preencha o preço: "3999.99"
3. Adicione descrição: "Tablet Apple profissional"
4. Defina estoque: "15"
5. **Selecione a categoria "Tablets"** (importante!)
6. Faça upload da imagem
7. Clique em "Adicionar Produto"

### 4️⃣ Testar no App Mobile

```bash
cd C:\Users\Elton\Desktop\Loja\mobile
npm start
```

**No app mobile:**
- As categorias aparecerão automaticamente
- Clique em uma categoria para filtrar produtos
- Os produtos aparecerão com as imagens enviadas

## 🔍 Como Funciona a Filtragem

1. **Interface Web**: Você adiciona produtos e seleciona a categoria
2. **Banco de Dados**: Produto é salvo com `categoria_id` correto
3. **App Mobile**: 
   - Ao clicar em "All" → Mostra todos os produtos
   - Ao clicar em uma categoria → Busca apenas produtos daquela categoria

## 🖼️ Sistema de Imagens

**Onde as imagens são salvas:**
- Pasta: `backend/uploads/`
- Formato: `nome_arquivo_timestamp.jpg`

**Como acessar imagens:**
- URL: `http://10.126.213.123:5000/api/uploads/nome_arquivo.jpg`
- O app mobile carrega automaticamente

## ⚙️ Configuração de IP

**Seu IP atual:** `10.126.213.123`

Este IP já está configurado em:
- `mobile/app/(tabs)/index.tsx` (linha 19)
- `mobile/app/(tabs)/explore.tsx` (linha 7)
- `mobile/app/(tabs)/search.tsx` (linha 7)

**Se o IP mudar:**
1. Execute `ipconfig` no PowerShell
2. Encontre o novo IP
3. Atualize os arquivos acima

## 📋 Checklist de Funcionalidades

### Backend ✅
- [x] API Flask com SQLite
- [x] Upload de imagens
- [x] Servir imagens estáticas
- [x] CRUD de produtos
- [x] CRUD de categorias
- [x] Relacionamento produto-categoria
- [x] Interface web admin
- [x] Pasta de uploads automática

### Frontend Mobile ✅
- [x] Lista de produtos
- [x] Lista de categorias
- [x] Imagens reais dos produtos
- [x] Filtro por categoria
- [x] Design moderno "Discover"
- [x] 4 abas de navegação
- [x] Pull-to-refresh
- [x] Ratings em estrelas

### Interface Admin ✅
- [x] Upload de imagens drag-and-drop
- [x] Preview de imagens
- [x] Seleção de categoria
- [x] Validação de formulários
- [x] Grid de produtos visual
- [x] Cards de categorias
- [x] Mensagens de sucesso/erro

## 🎯 Próximos Passos Opcionais

Se quiser expandir:

1. **Edição de Produtos** (funcionalidade básica criada)
2. **Busca de Produtos** no app
3. **Carrinho de Compras**
4. **Favoritos Funcionais**
5. **Tela de Detalhes do Produto**
6. **Sistema de Pedidos**

## 🐛 Troubleshooting

**Imagens não aparecem:**
- Verifique se o backend está rodando
- Confirme o IP está correto
- Teste a URL da imagem no navegador

**Upload falha:**
- Verifique o tamanho da imagem (< 16MB)
- Verifique o formato (PNG, JPG, etc.)
- Confira o console do navegador

**Produtos não filtram:**
- Confirme que selecionou a categoria ao criar produto
- Verifique se a categoria existe no banco

## 📞 Suporte

Se precisar de ajuda:
1. Verifique os logs do backend no terminal
2. Abra o console do navegador (F12)
3. Verifique se o IP está correto
4. Confirme que está tudo rodando

---

**🎉 Sistema Completo e Funcional!**

