# 💾 Como Fazer Backup dos Dados - K-Tech

## 📋 Resumo

**Seus dados JÁ estão sendo salvos automaticamente!** O banco de dados SQLite (`loja.db`) e as imagens (`uploads/`) são arquivos permanentes no disco.

## 🔄 Como Fazer um Backup Manual

Execute este comando quando quiser criar uma cópia de segurança:

```bash
cd backend
python backup.py
```

Isso cria:
- ✅ Cópia do banco de dados
- ✅ Cópia de todas as imagens

## 📁 Onde Estão os Dados

```
Loja/
└── backend/
    ├── loja.db              ← TODOS OS PRODUTOS E CATEGORIAS
    ├── uploads/             ← TODAS AS IMAGENS
    └── backup/              ← BACKUPS QUE VOCÊ CRIAR
```

## ⏰ Quando Fazer Backup

1. **Antes de fazer mudanças grandes** no sistema
2. **Diariamente**, se você adicionar muitos produtos
3. **Antes de atualizar** o código do app
4. **Semanalmente**, se preferir

## ✅ Verificação Rápida

Para ver quantos produtos você tem:

```bash
cd backend
python -c "import sqlite3; conn = sqlite3.connect('loja.db'); cursor = conn.cursor(); print('Produtos:', cursor.execute('SELECT COUNT(*) FROM produtos').fetchone()[0])"
```

## 🚨 Importante

- ✅ **Seus dados são permanentes** - não são temporários
- ✅ **SQLite é confiável** - usado por milhares de aplicações
- ✅ **Backups são opcionais** - mas recomendados
- ❌ **Não delete** `loja.db` ou `uploads/`

## 📞 Precisou Restaurar?

Se algo der errado, restaure o backup mais recente:

```bash
cd backend

# 1. Ver backups disponíveis
dir backup

# 2. Restaurar banco
copy backup\loja_20251102_141953.db loja.db

# 3. Restaurar imagens (se necessário)
xcopy /E /I backup\uploads_20251102_141953 uploads
```

**Seus dados estão seguros! 💪**

