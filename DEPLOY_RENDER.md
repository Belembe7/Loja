# 🚀 Deploy da API no Render

Guia completo para hospedar a API Flask no Render.

## 📋 Pré-requisitos

1. ✅ Conta no GitHub (já configurada)
2. ✅ Projeto já commitado no GitHub
3. ✅ Conta no Render (criar em: https://render.com)

## 🔧 Passo a Passo

### 1. Criar Conta no Render

1. Acesse: https://render.com
2. Clique em **"Get Started for Free"**
3. Faça login com sua conta GitHub (recomendado)

### 2. Criar Novo Web Service

1. No dashboard do Render, clique em **"New +"**
2. Selecione **"Web Service"**
3. Conecte seu repositório GitHub:
   - Se ainda não conectou, clique em **"Connect GitHub"**
   - Autorize o Render a acessar seus repositórios
   - Selecione o repositório: **Belembe7/Loja**

### 3. Configurar o Serviço

Preencha os seguintes campos:

**Configurações Básicas:**
- **Name**: `ktech-loja-api` (ou qualquer nome que preferir)
- **Region**: Escolha a região mais próxima (ex: `Oregon (US West)`)

**Build & Deploy:**
- **Branch**: `main`
- **Root Directory**: `backend` ⚠️ **IMPORTANTE**
- **Runtime**: `Python 3`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `python app.py`

**Environment Variables (Variáveis de Ambiente):**
Clique em **"Advanced"** e adicione:
- **Key**: `FLASK_ENV`
  **Value**: `production`

- **Key**: `PYTHON_VERSION`
  **Value**: `3.11.0`

### 4. Configurações Adicionais

**Plano:**
- Escolha **"Free"** para começar (tem limite de horas/sleep após inatividade)

**Auto-Deploy:**
- ✅ Deixe marcado para atualizar automaticamente quando você fizer push no GitHub

### 5. Criar o Serviço

1. Clique em **"Create Web Service"**
2. O Render começará a fazer o build automaticamente
3. Aguarde alguns minutos enquanto ele instala as dependências e inicia o servidor

### 6. Verificar o Deploy

Após o build completar com sucesso:

1. Você verá a URL do seu serviço (ex: `https://ktech-loja-api.onrender.com`)
2. Clique na URL para testar
3. Teste os endpoints:
   - `https://sua-url.onrender.com/api/produtos`
   - `https://sua-url.onrender.com/api/categorias`
   - `https://sua-url.onrender.com/login.html`
   - `https://sua-url.onrender.com/admin.html`

## 📱 Configurar o App Mobile

Após a API estar no ar, você precisa atualizar o app mobile:

1. Abra o arquivo: `mobile/config.ts`
2. Atualize a URL da API:

```typescript
export const API_URL = 'https://sua-url.onrender.com';
```

3. Faça commit e push das alterações

## ⚠️ Importante - Limitações do Plano Gratuito

### Sleep/Inatividade
- O serviço **dorme após 15 minutos de inatividade**
- A primeira requisição após dormir pode levar 30-60 segundos para "acordar"
- Isso é normal no plano gratuito

### Armazenamento
- **IMPORTANTE**: Imagens e banco de dados são **voláteis** no plano gratuito
- Os dados podem ser perdidos quando o serviço reinicia
- Para produção, considere:
  - Usar banco de dados externo (PostgreSQL oferecido pelo Render)
  - Armazenar imagens em serviço de storage (AWS S3, Cloudinary, etc.)

## 🔄 Atualizar o Deploy

Sempre que você fizer mudanças:

1. Faça commit e push para o GitHub
2. O Render detectará automaticamente e fará novo deploy (se Auto-Deploy estiver ativo)
3. Ou clique em **"Manual Deploy"** no dashboard do Render

## 🐛 Troubleshooting

### Erro de Build
- Verifique se todas as dependências estão no `requirements.txt`
- Confira os logs no dashboard do Render

### Erro 500
- Verifique os logs do serviço no dashboard
- Confira se o banco de dados está sendo criado corretamente

### Timeout
- No plano gratuito, o primeiro request após sleep pode demorar
- Isso é normal, aguarde 30-60 segundos

### CORS Errors
- O Flask-CORS já está configurado no código
- Se ainda houver problemas, verifique se o domínio do app mobile está permitido

## 📊 Monitoramento

No dashboard do Render você pode:
- Ver logs em tempo real
- Verificar métricas de uso
- Ver histórico de deploys
- Configurar alertas

## 🔐 Segurança em Produção

⚠️ **IMPORTANTE**: Antes de usar em produção:

1. **Altere a SECRET_KEY** no `app.py`:
   ```python
   app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'sua-chave-secreta-forte')
   ```
   
2. **Crie uma variável de ambiente no Render**:
   - Key: `SECRET_KEY`
   - Value: (gere uma chave forte aleatória)

3. **Altere as credenciais de admin**:
   - Use hash de senha ao invés de texto plano
   - Ou configure variáveis de ambiente para usuário e senha

## 📝 Estrutura no Render

O Render procurará os arquivos na pasta `backend/`:
- ✅ `backend/app.py` - Servidor principal
- ✅ `backend/requirements.txt` - Dependências
- ✅ `backend/uploads/` - Pasta de imagens (será criada automaticamente)

## 🎉 Pronto!

Sua API estará disponível publicamente e o app mobile poderá acessá-la de qualquer lugar!

**URL da API**: `https://sua-url.onrender.com`

