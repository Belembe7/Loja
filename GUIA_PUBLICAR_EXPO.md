# 📱 Guia Completo: Publicar App no Expo

## 📋 Pré-requisitos

1. ✅ Conta no Expo (criar em: https://expo.dev)
2. ✅ Node.js instalado
3. ✅ Projeto Expo configurado

## 🔧 Passo 1: Instalar EAS CLI

Abra o terminal na pasta `mobile` e execute:

```bash
npm install -g eas-cli
```

## 🔑 Passo 2: Fazer Login no Expo

```bash
eas login
```

Você será redirecionado para o navegador para fazer login. Se não tiver conta, crie uma em https://expo.dev/signup

## ⚙️ Passo 3: Configurar EAS

Na pasta `mobile`, execute:

```bash
eas build:configure
```

Isso criará/atualizará o arquivo `eas.json` (já foi criado).

## 📝 Passo 4: Atualizar Config do App

### 4.1: Atualizar app.json

O arquivo `app.json` já foi atualizado com:
- Nome: "K-TECH Loja"
- Slug: "ktech-loja"

### 4.2: Atualizar config.ts com URL do Render

1. Abra `mobile/config.ts`
2. Atualize com a URL do seu Render:

```typescript
// PRODUÇÃO: URL pública da sua API no Render
const PROD_API_URL = 'https://sua-url-do-render.onrender.com/api'; // ⬅️ COLE A URL DO RENDER AQUI

// Escolha o ambiente
const IS_DEV = false; // ⬅️ MUDE PARA false para usar produção
```

## 🚀 Passo 5: Publicar no Expo

### Opção 1: Publicar para Expo Go (Mais Simples)

Isso permite que outras pessoas instalem via link do Expo:

```bash
cd mobile
eas update --branch preview --message "Primeira versão do app"
```

### Opção 2: Gerar Build para Android (APK)

Para gerar um APK que pode ser instalado diretamente:

```bash
cd mobile
eas build --platform android --profile preview
```

Isso vai:
1. Fazer upload do código
2. Compilar no servidor do Expo
3. Gerar um APK
4. Você receberá um link para download

### Opção 3: Gerar Build para iOS

Para gerar um build para iOS (requer conta Apple Developer):

```bash
cd mobile
eas build --platform ios --profile preview
```

## 📦 Passo 6: Distribuir o App

### Via Expo Go (Link Exponencial)

1. Após publicar, execute:
```bash
eas update --branch preview
```

2. Você receberá um link como:
```
exp://expo.dev/@seu-usuario/ktech-loja
```

3. Compartilhe este link com outros usuários
4. Eles podem abrir no Expo Go app

### Via APK (Android)

1. Após o build completar, você receberá um link para download
2. Baixe o APK
3. Compartilhe o arquivo APK
4. Usuários podem instalar diretamente no Android

### Via QR Code

1. Execute:
```bash
npx expo start --tunnel
```

2. Um QR code aparecerá
3. Usuários podem escanear com Expo Go

## 🔄 Atualizar o App

Quando fizer mudanças no código:

1. Faça commit e push
2. Execute:
```bash
eas update --branch preview --message "Descrição da atualização"
```

3. O app será atualizado automaticamente para todos os usuários

## 📱 Testar o App

### Localmente (Desenvolvimento)

```bash
cd mobile
npm start
```

### Publicado (Produção)

1. Instale o Expo Go no celular
2. Abra o link do Expo ou escaneie o QR code
3. O app será carregado

## ⚙️ Configurações Avançadas

### Atualizar informações do app

Edite `mobile/app.json`:

```json
{
  "expo": {
    "name": "K-TECH Loja",
    "slug": "ktech-loja",
    "version": "1.0.0",
    "description": "Loja de tecnologia K-TECH",
    ...
  }
}
```

### Adicionar ícone personalizado

Substitua os arquivos em `mobile/assets/images/`:
- `icon.png` - Ícone do app (1024x1024)
- `splash-icon.png` - Tela de splash

### Configurar Android

Em `mobile/app.json`:

```json
"android": {
  "package": "com.belembe.ktechloja",
  "versionCode": 1
}
```

## 📊 Verificar Status

Para ver o status dos builds:

```bash
eas build:list
```

Para ver detalhes de um build específico:

```bash
eas build:view [BUILD_ID]
```

## 🔍 Troubleshooting

### Erro: "Not logged in"
```bash
eas login
```

### Erro: "No EAS project found"
```bash
eas build:configure
```

### Erro: "Invalid credentials"
Verifique se você está logado:
```bash
eas whoami
```

## ✅ Checklist de Publicação

- [ ] Instalou EAS CLI
- [ ] Fez login no Expo
- [ ] Configurou EAS (`eas build:configure`)
- [ ] Atualizou `app.json` com nome e slug
- [ ] Atualizou `config.ts` com URL do Render
- [ ] Configurou `IS_DEV = false`
- [ ] Publicou no Expo (`eas update` ou `eas build`)
- [ ] Testou o app

## 🎯 Próximos Passos

1. ✅ Configure o app conforme acima
2. ⏳ Obtenha a URL do Render
3. ⏳ Atualize `config.ts` com a URL do Render
4. ⏳ Publique no Expo
5. ⏳ Distribua o link/APK

## 📝 Resumo dos Comandos

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login
eas login

# Configurar
eas build:configure

# Publicar para Expo Go
eas update --branch preview

# Gerar APK Android
eas build --platform android --profile preview

# Gerar build iOS
eas build --platform ios --profile preview
```

