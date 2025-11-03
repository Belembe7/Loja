# 🛍️ K-TECH - Loja de Tecnologia

Projeto de loja online de tecnologia com design moderno no estilo "Discover", aplicativo mobile feito em React Native (Expo) e backend em Flask com SQLite.

## 🎨 Design

Interface moderna inspirada no padrão "Discover" com:
- ✅ Header com título "Discover" e carrinho
- ✅ Barra de pesquisa integrada
- ✅ Banner "Clearance Sales" verde vibrante
- ✅ Filtros de categorias horizontais
- ✅ Grid de produtos com ratings em estrelas
- ✅ Navegação inferior com 4 abas (Home, Search, Favorites, Profile)
- ✅ Cores: Verde (#10B981) como cor principal

## 📁 Estrutura do Projeto

```
Loja/
├── mobile/              # Aplicativo React Native (Expo)
│   ├── app/
│   │   └── (tabs)/     # Telas com navegação por abas
│   │       ├── index.tsx      # Home/Discover
│   │       ├── search.tsx     # Busca
│   │       ├── favorites.tsx  # Favoritos
│   │       ├── profile.tsx    # Perfil
│   │       └── _layout.tsx    # Layout das abas
│   ├── components/      # Componentes reutilizáveis
│   └── ...
├── backend/             # API Flask
│   ├── app.py          # Servidor Flask principal
│   ├── admin.html      # Interface web para gerenciar produtos
│   ├── uploads/        # Pasta de imagens enviadas
│   ├── loja.db         # Banco de dados SQLite
│   └── requirements.txt
└── README.md
```

## 🖼️ Sistema de Imagens

O projeto suporta imagens reais para produtos e categorias:
- ✅ Upload de imagens via interface web
- ✅ Armazenamento local na pasta `backend/uploads`
- ✅ Suporte a PNG, JPG, JPEG, GIF, WEBP
- ✅ Imagens servidas via API
- ✅ Filtro de produtos por categoria

## 🚀 Como Executar

### Backend (Flask API)

1. Navegue até a pasta backend:
```bash
cd backend
```

2. Ative o ambiente virtual:
```bash
# Windows
.\venv\Scripts\Activate.ps1

# Linux/Mac
source venv/bin/activate
```

3. Instale as dependências (se ainda não instalou):
```bash
pip install -r requirements.txt
```

4. Execute o servidor:
```bash
python app.py
```

O servidor estará rodando em: `http://0.0.0.0:5000`

5. **Acesse a interface de administração:**
   - Abra seu navegador
   - Acesse: `http://localhost:5000/admin.html`
   - Aqui você pode adicionar categorias e produtos com imagens

⚠️ **IMPORTANTE**: Anote o IP da sua máquina na rede local (use `ipconfig` no Windows ou `ifconfig` no Linux/Mac)

### Frontend (React Native)

1. Navegue até a pasta mobile:
```bash
cd mobile
```

2. Instale as dependências (se ainda não instalou):
```bash
npm install
```

3. Configure o IP da API:
   - Abra `mobile/config.ts`
   - Na linha 11, atualize `DEV_IP` com o IP da sua máquina
   - Veja `CORRIGIR_APP_CELULARES.md` para distribuir para outros celulares

4. Execute o app:
```bash
npm start
```

5. Escaneie o QR Code com:
   - **Android**: Expo Go app da Play Store
   - **iOS**: Expo Go app da App Store

## 🔧 Configuração da Rede

Para que o app mobile consiga acessar a API Flask:

1. Certifique-se que o backend está rodando em `0.0.0.0:5000`
2. Descubra o IP da sua máquina na rede local
3. Atualize o `DEV_IP` em `mobile/config.ts`

**Para distribuir o app para outros celulares:**
- Veja `CORRIGIR_APP_CELULARES.md` - Instruções completas
- Veja `PUBLICAR_API.md` - Para publicar a API na internet

## 📱 Funcionalidades

### Mobile App
- ✅ Lista de produtos com imagens reais
- ✅ Lista de categorias com imagens
- ✅ Filtro de produtos por categoria
- ✅ Pull-to-refresh
- ✅ Interface moderna estilo "Discover"
- ✅ Dark mode suportado

### Backend API

**Produtos:**
- `GET /api/produtos` - Lista todos os produtos
- `GET /api/produtos/{id}` - Busca um produto específico
- `POST /api/produtos` - Cria um novo produto
- `PUT /api/produtos/{id}` - Atualiza um produto
- `DELETE /api/produtos/{id}` - Deleta um produto

**Categorias:**
- `GET /api/categorias` - Lista todas as categorias
- `POST /api/categorias` - Cria uma nova categoria
- `GET /api/categorias/{id}/produtos` - Lista produtos de uma categoria

**Upload:**
- `POST /api/upload` - Faz upload de imagens
- `GET /api/uploads/{filename}` - Serve imagens enviadas

## 🗄️ Banco de Dados

O SQLite é criado automaticamente na primeira execução com dados de exemplo:
- 5 produtos
- 4 categorias

## 🧪 Dados de Exemplo

O backend já vem com produtos e categorias pré-cadastrados:
- Smartphone Samsung (R$ 1.299,99)
- Notebook Dell (R$ 2.499,99)
- Tênis Nike (R$ 299,99)
- Mesa de Jantar (R$ 899,99)
- Moletom Adidas (R$ 179,99)

## 📝 Tecnologias Utilizadas

**Frontend:**
- React Native
- Expo
- TypeScript
- Expo Router

**Backend:**
- Python
- Flask
- SQLite
- Flask-CORS

## 💾 Persistência de Dados

**Todos os dados são salvos permanentemente:**
- ✅ Banco SQLite (`loja.db`) com todos os produtos e categorias
- ✅ Pasta `uploads/` com todas as imagens
- ✅ Sistema de backup automático disponível
- ✅ Ver documentação completa em `PERSISTENCIA_DADOS.md`
- ✅ Instruções de backup em `INSTRUCOES_BACKUP.md`

## 🔮 Próximos Passos

- [ ] Tela de detalhes do produto
- [ ] Carrinho de compras
- [ ] Sistema de busca
- [ ] Filtros por categoria
- [ ] Favoritos
- [ ] Autenticação de usuário
- [ ] Processo de checkout

## 🐛 Troubleshooting

### Erro de conexão com a API
- Verifique se o backend está rodando
- Confirme que o IP está correto no código
- Certifique-se que o dispositivo está na mesma rede

### Erro ao instalar dependências
- Use `npm install` na pasta mobile
- Use `pip install -r requirements.txt` no backend

### QR Code não aparece
- Verifique se você está na pasta correta (`mobile`)
- Tente limpar o cache: `npm start -- --clear`

## 📄 Licença

Este projeto é para fins educacionais.

