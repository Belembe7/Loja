# 🔐 Garantir Persistência de Dados no Render

## ⚠️ Problema Atual

No plano **gratuito** do Render:
- **SQLite local** pode ser **perdido** quando o serviço reinicia
- **Sistema de arquivos** é **volátil** (arquivos podem desaparecer)
- **Imagens** na pasta `uploads/` podem ser **perdidas**

## ✅ Solução: Usar PostgreSQL do Render

O Render oferece **PostgreSQL gratuito** (até 90 dias ou limite de uso) que é **persistente**.

### Passo 1: Criar Banco PostgreSQL no Render

1. Acesse: https://dashboard.render.com
2. Clique em **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `ktech-loja-db`
   - **Database**: `ktech_loja`
   - **User**: (será gerado automaticamente)
   - **Region**: Mesma região do seu serviço web
   - **Plan**: Free (ou Starter para produção)
4. Clique em **"Create Database"**

### Passo 2: Obter String de Conexão

Após criar o PostgreSQL:

1. No dashboard do PostgreSQL, vá em **"Connections"**
2. Copie a **"Internal Database URL"** (para uso no Render)
   - Formato: `postgresql://user:password@host:port/database`

### Passo 3: Configurar Variável de Ambiente

No seu serviço web (Loja-3):

1. Vá em **Settings** → **Environment**
2. Adicione variável:
   - **Key**: `DATABASE_URL`
   - **Value**: Cole a Internal Database URL do PostgreSQL

### Passo 4: Atualizar o Código

O código precisa ser atualizado para usar PostgreSQL ao invés de SQLite quando `DATABASE_URL` estiver disponível.

## 🔄 Alternativa: Backups Automáticos

Se não quiser usar PostgreSQL, configure backups automáticos:

### Opção 1: GitHub (Recomendado)

Criar um script que faz backup e commit no GitHub periodicamente.

### Opção 2: Serviço de Storage (Cloudinary, S3, etc)

Para imagens, use um serviço de storage externo:
- **Cloudinary** (tem plano gratuito)
- **AWS S3** (tem plano gratuito limitado)
- **Google Cloud Storage**

## 📋 Checklist de Persistência

- [ ] Criar PostgreSQL no Render
- [ ] Configurar variável `DATABASE_URL`
- [ ] Atualizar código para usar PostgreSQL
- [ ] Configurar backup de imagens (Cloudinary ou similar)
- [ ] Testar persistência

## ⚠️ Importante

**No plano gratuito do Render:**
- Dados em SQLite **podem ser perdidos** quando o serviço reinicia
- Imagens em `uploads/` **podem ser perdidas**
- **Solução definitiva**: Use PostgreSQL + Cloudinary para imagens

## 🎯 Recomendação

Para **produção real**, use:
1. ✅ **PostgreSQL** do Render (banco persistente)
2. ✅ **Cloudinary** para imagens (storage persistente)
3. ✅ **Backups automáticos** (opcional, mas recomendado)

