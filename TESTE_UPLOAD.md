# 🧪 Como Testar o Upload de Imagens

## ✅ Interface Web de Administração

A interface de upload **JÁ ESTÁ IMPLEMENTADA** e pronta para usar!

## 🚀 Passos para Usar

### 1️⃣ Acesse a Interface Admin

Abra seu navegador e digite:
```
http://localhost:5000/admin.html
```

### 2️⃣ Você Deve Ver:

**Duas seções principais:**

#### 📂 Seção 1: CATEGORIAS
- Campo: "Nome da Categoria"
- Botão: "📁 Clique para escolher uma imagem" (para categoria)
- Botão: "Adicionar Categoria"

#### 📦 Seção 2: PRODUTOS  
- Campos: Nome, Preço, Descrição, Estoque, Categoria
- **Botão: "📁 Clique para escolher uma imagem" (para produto)**
- Botão: "Adicionar Produto"

---

## 🎯 Teste Rápido

### Adicionar Categoria Com Imagem:
1. Em "Nome da Categoria", digite: **"Tablets"**
2. Clique em **"📁 Clique para escolher uma imagem"**
3. Selecione uma imagem de tablet do seu computador
4. Clique em **"Adicionar Categoria"**
5. ✅ A categoria aparece com imagem

### Adicionar Produto Com Imagem:
1. Em "Nome do Produto", digite: **"iPad Pro"**
2. Em "Preço", digite: **5999.99**
3. Em "Descrição", digite: **"Tablet profissional"**
4. Em "Estoque", digite: **10**
5. Em "Categoria", selecione **"Tablets"** (que você acabou de criar)
6. Clique em **"📁 Clique para escolher uma imagem"** (produto)
7. Selecione uma imagem de iPad do seu computador
8. Clique em **"Adicionar Produto"**
9. ✅ O produto aparece com imagem no grid abaixo

---

## 🐛 Se Não Aparecer

### Opção 1: Cache do Navegador
1. Pressione **Ctrl + Shift + R** (ou **Cmd + Shift + R** no Mac)
2. Isso força o navegador a recarregar a página sem cache

### Opção 2: Verificar se o Backend Está Rodando
Abra outro terminal e digite:
```powershell
curl http://localhost:5000/admin.html
```

Se não aparecer nada, o backend não está rodando.

### Opção 3: Verificar JavaScript no Navegador
1. Pressione **F12** para abrir o DevTools
2. Vá na aba **"Console"**
3. Veja se há erros em vermelho
4. Me avise quais erros aparecem

---

## 📱 Verificar no App Mobile

Depois de adicionar produtos pela web:
1. **Recarregue o app** no celular (puxe para baixo)
2. Os novos produtos devem aparecer instantaneamente!

---

## ✅ Checklist

- [ ] Backend está rodando (terminal aberto com Flask)
- [ ] Navegador acessou `http://localhost:5000/admin.html`
- [ ] Vejo o texto "Clique para escolher uma imagem"
- [ ] Consigo clicar nesse texto
- [ ] Abre a janela de seleção de arquivo
- [ ] Consigo escolher uma imagem
- [ ] A imagem aparece como preview
- [ ] Consigo clicar em "Adicionar Produto"
- [ ] O produto aparece no grid abaixo
- [ ] A imagem do produto aparece corretamente

---

**Se alguma etapa falhar, me avise qual!**



