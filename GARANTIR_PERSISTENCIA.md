# 🔐 Como Garantir que os Dados Não Desapareçam no Render

## ⚠️ Problema

No plano **gratuito** do Render:
- **SQLite** é **volátil** - pode ser perdido quando o serviço reinicia
- **Sistema de arquivos** é **efêmero** - arquivos podem desaparecer
- **Imagens** em `uploads/` podem ser **perdidas**

## ✅ Solução: PostgreSQL do Render

O Render oferece **PostgreSQL gratuito** que é **persistente**.

### Passo 1: Criar PostgreSQL no Render

1. Acesse: https://dashboard.render.com
2. Clique em **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `ktech-loja-db`
   - **Database**: `ktech_loja`
   - **User**: (gerado automaticamente)
   - **Region**: Mesma região do seu serviço web (ex: Oregon)
   - **Plan**: Free (ou Starter para produção)
4. Clique em **"Create Database"**
5. Aguarde alguns minutos para criar

### Passo 2: Obter String de Conexão

Após criar o PostgreSQL:

1. No dashboard do PostgreSQL, clique em **"Connections"**
2. Copie a **"Internal Database URL"**
   - Formato: `postgresql://user:password@host:port/database`
   - Esta URL é para uso **interno** no Render (mais segura)

### Passo 3: Configurar Variável de Ambiente

No seu serviço web (Loja-3):

1. Vá em **Settings** → **Environment**
2. Clique em **"Add Environment Variable"**
3. Adicione:
   - **Key**: `DATABASE_URL`
   - **Value**: Cole a **Internal Database URL** do PostgreSQL
4. Clique em **"Save Changes"**

### Passo 4: Atualizar o Código

O código já foi preparado para usar PostgreSQL quando `DATABASE_URL` estiver disponível.

**Próximo passo:** Atualizar `app.py` para usar o módulo `database.py` que foi criado.

## 📋 O que Foi Preparado

1. ✅ Criado `backend/database.py` - Suporta PostgreSQL e SQLite
2. ✅ Adicionado `psycopg2-binary` no `requirements.txt`
3. ✅ Código detecta automaticamente se usar PostgreSQL ou SQLite

## 🔄 Processo de Migração

Após configurar o PostgreSQL:

1. O código detectará automaticamente `DATABASE_URL`
2. Criará as tabelas no PostgreSQL
3. Os dados serão **persistentes** mesmo após reinicializações

## ⚠️ Importante sobre Imagens

**Imagens** em `uploads/` ainda podem ser perdidas no plano gratuito.

**Solução:** Use um serviço de storage externo:
- **Cloudinary** (tem plano gratuito) - Recomendado
- **AWS S3** (tem plano gratuito limitado)
- **Google Cloud Storage**

## 📝 Resumo

**Para garantir persistência:**

1. ✅ **Criar PostgreSQL** no Render
2. ✅ **Configurar `DATABASE_URL`** no serviço web
3. ✅ **Atualizar código** para usar PostgreSQL (já preparado)
4. ⏳ **Migrar imagens** para Cloudinary (opcional, mas recomendado)

## 🎯 Próximos Passos

1. Criar PostgreSQL no Render
2. Configurar variável `DATABASE_URL`
3. Fazer novo deploy (os dados serão persistentes)

**Com PostgreSQL, seus dados NÃO desaparecerão!** ✅

