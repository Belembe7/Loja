# 🚀 Como Iniciar a Aplicação K-Tech

## ⚠️ IMPORTANTE: Execute em Terminais SEPARADOS

Você precisa de **2 terminais PowerShell** abertos ao mesmo tempo!

---

## 📍 Terminal 1: Backend (Flask API)

**Execute estes comandos:**

```powershell
cd C:\Users\Elton\Desktop\Loja\backend
.\venv\Scripts\Activate.ps1
python app.py
```

**Aguarde ver estas mensagens:**
```
🚀 Servidor Flask iniciado!
📱 API disponível em http://localhost:5000
🔐 Login: http://localhost:5000/login.html
🌐 Interface Admin: http://localhost:5000/admin.html
📂 Imagens salvas em: backend/uploads/
 * Running on http://0.0.0.0:5000
```

**✅ DEIXE ESTE TERMINAL ABERTO E RODANDO**

---

## 📍 Terminal 2: Mobile App (Expo)

**Abra um NOVO PowerShell** e execute:

```powershell
cd C:\Users\Elton\Desktop\Loja\mobile
npm start
```

**Aguarde ver o QR Code:**
```
› Metro waiting on exp://...
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
```

**✅ DEIXE ESTE TERMINAL ABERTO E RODANDO**

---

## 📱 No Seu Celular Android

1. Instale o **Expo Go** da Play Store
2. Abra o app **Expo Go**
3. Escaneie o QR Code que apareceu no Terminal 2
4. **IMPORTANTE**: Celular e computador devem estar na **mesma rede Wi-Fi**

---

## 🌐 Gerenciar Produtos (No Computador)

Enquanto os servidores estão rodando:

1. Abra seu navegador
2. Acesse: **http://localhost:5000/admin.html**
3. Adicione categorias e produtos com imagens
4. Os produtos aparecerão **instantaneamente** no app mobile

---

## ❌ Para Parar os Servidores

Nos terminais, pressione: **Ctrl + C**

---

## 🔍 Verificar se Está Funcionando

**No navegador (computador):**
- ✅ Acesse http://localhost:5000/admin.html
- ✅ Você será redirecionado para a tela de login
- ✅ Digite: **usuário:** `admin` **senha:** `ktech2024`
- ✅ Você deve ver a interface bonita de administração

**No app mobile:**
- ✅ As categorias devem aparecer
- ✅ Os produtos devem aparecer com imagens
- ✅ Clique em uma categoria para filtrar

---

## 🐛 Se Der Erro

### Erro "Network request failed"
1. Verifique se o Terminal 1 (Backend) está rodando
2. Confirme que o IP está correto (`10.126.213.123`)
3. Certifique-se que celular e PC estão na mesma Wi-Fi

### Erro "Python can't open file"
- Você está no diretório errado
- Execute `cd C:\Users\Elton\Desktop\Loja\backend` primeiro

### Nenhuma categoria aparece
- Abra http://localhost:5000/admin.html no navegador
- Adicione categorias pela interface web
- Elas aparecerão no app automaticamente

---

**✅ Se tudo funcionou, você verá o app K-Tech rodando no seu celular!**

