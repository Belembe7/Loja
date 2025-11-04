# 🔐 Como Garantir que os Dados Não Desapareçam

## ⚠️ Problema Atual

No **plano gratuito** do Render:
- **SQLite** é **volátil** - dados podem ser perdidos quando o serviço reinicia
- **Imagens** em `uploads/` podem ser perdidas

## ✅ Solução: PostgreSQL do Render (PERSISTENTE)

O Render oferece **PostgreSQL gratuito** que é **100% persistente**.

### 📋 Passo a Passo SIMPLES

#### 1. Criar PostgreSQL no Render

1. Acesse: https://dashboard.render.com
2. Clique em **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `ktech-loja-db`
   - **Database**: `ktech_loja`
   - **Region**: Mesma do seu serviço web (ex: Oregon)
   - **Plan**: **Free**
4. Clique em **"Create Database"**
5. Aguarde 2-3 minutos para criar

#### 2. Obter URL de Conexão

Após criar:

1. No dashboard do PostgreSQL, clique em **"Connections"**
2. Copie a **"Internal Database URL"**
   - Formato: `postgresql://user:pass@host:port/database`
   - Esta URL é para uso interno no Render

#### 3. Configurar no Serviço Web

No seu serviço "Loja-3":

1. Vá em **Settings** → **Environment**
2. Clique em **"Add Environment Variable"**
3. Adicione:
   - **Key**: `DATABASE_URL`
   - **Value**: Cole a **Internal Database URL** do PostgreSQL
4. Clique em **"Save Changes"**

#### 4. Fazer Novo Deploy

1. Vá em **Manual Deploy** → **Deploy latest commit**
2. Aguarde o deploy concluir
3. O código detectará automaticamente o PostgreSQL

## ✅ O que Acontece

Após configurar:

1. ✅ O código detecta `DATABASE_URL` automaticamente
2. ✅ Usa PostgreSQL ao invés de SQLite
3. ✅ **Dados serão PERSISTENTES** - não desaparecerão!
4. ✅ Logs mostrarão: "🔗 Usando PostgreSQL (persistente)"

## 📊 Verificar se Está Funcionando

Após o deploy, verifique os logs:

1. Vá em **Logs** no dashboard
2. Procure por: `🔗 Usando PostgreSQL (persistente)`
3. Se aparecer, está funcionando!

## ⚠️ Importante sobre Imagens

**Imagens** em `uploads/` ainda podem ser perdidas no plano gratuito.

**Solução futura:** Use **Cloudinary** (tem plano gratuito) para armazenar imagens.

## 🎯 Resumo

**Para garantir persistência:**

1. ✅ Criar PostgreSQL no Render (5 minutos)
2. ✅ Configurar `DATABASE_URL` no serviço web (2 minutos)
3. ✅ Fazer novo deploy (alguns minutos)

**Total: ~10 minutos**

Após isso, seus dados **NÃO desaparecerão** mesmo se o serviço reiniciar!

## 📝 Checklist

- [ ] PostgreSQL criado no Render
- [ ] URL copiada (Internal Database URL)
- [ ] Variável `DATABASE_URL` configurada no serviço web
- [ ] Novo deploy feito
- [ ] Logs mostram "Usando PostgreSQL"

