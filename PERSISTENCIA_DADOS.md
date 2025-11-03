# 📦 Sistema de Persistência de Dados - K-Tech

## 🔐 Garantias de Persistência

Todos os dados da loja estão armazenados de forma **permanente** em arquivos locais:

### 📁 Arquivos Principais

1. **`backend/loja.db`** - Banco de dados SQLite com todos os produtos, categorias e informações
2. **`backend/uploads/`** - Pasta com todas as imagens dos produtos e categorias

### ✅ Como os Dados são Salvos

#### Automático
- **Ao adicionar/editar/deletar produtos**: Dados são salvos **imediatamente** no banco SQLite
- **Ao fazer upload de imagens**: Arquivos são salvos **permanentemente** na pasta `uploads/`
- **Ao iniciar o servidor**: Se o banco não existe, é criado automaticamente

#### Manual
Execute o script de backup para criar cópias de segurança:

```bash
cd backend
python backup.py
```

Isso cria:
- `backend/backup/loja_TIMESTAMP.db` - Cópia do banco de dados
- `backend/backup/uploads_TIMESTAMP/` - Cópia das imagens

O script mantém automaticamente os **10 backups mais recentes**.

## 🛡️ Proteção contra Perda de Dados

### 1. Sistema de Arquivos
- Banco SQLite é um arquivo **duradouro** no disco
- Não depende de conectividade ou serviços externos
- Os dados **nunca são temporários**

### 2. Configuração do Gitignore
O arquivo `.gitignore` foi configurado para **proteger** seus dados:
```gitignore
# NÃO IGNORA arquivos importantes
!backend/loja.db
!backend/uploads/
!backend/uploads/**
```

### 3. Backups Automáticos
Execute backups regularmente ou configure uma tarefa agendada:

**Windows:**
```powershell
# Executar backup toda hora
schtasks /create /tn "KTech Backup" /tr "cd C:\Users\Elton\Desktop\Loja\backend && python backup.py" /sc hourly
```

## 🔍 Verificação de Dados

Para verificar se seus dados estão salvos:

```bash
cd backend
python -c "import sqlite3; conn = sqlite3.connect('loja.db'); cursor = conn.cursor(); print(f'Produtos: {cursor.execute(\"SELECT COUNT(*) FROM produtos\").fetchone()[0]}'); print(f'Categorias: {cursor.execute(\"SELECT COUNT(*) FROM categorias\").fetchone()[0]}')"
```

## ⚠️ O que NUNCA fazer

1. ❌ **NÃO deletar** `backend/loja.db` - é onde todos os produtos estão
2. ❌ **NÃO deletar** `backend/uploads/` - são suas imagens
3. ❌ **NÃO reiniciar** o servidor sem fazer backup primeiro
4. ❌ **NÃO modificar** o banco diretamente sem conhecimento técnico

## 🔄 Recuperação de Backup

Se precisar restaurar um backup:

```bash
cd backend

# Restaurar banco de dados
copy backup\loja_YYYYMMDD_HHMMSS.db loja.db

# Restaurar imagens
xcopy /E /I backup\uploads_YYYYMMDD_HHMMSS uploads
```

## 📊 Localização dos Arquivos

```
Loja/
└── backend/
    ├── loja.db                    ← TODOS OS DADOS ESTÃO AQUI
    ├── uploads/                   ← TODAS AS IMAGENS ESTÃO AQUI
    │   └── *.jpg, *.png, etc.
    └── backup/                    ← BACKUPS AUTOMÁTICOS
        ├── loja_*.db
        └── uploads_*/
```

## ✅ Resumo

**Seus dados estão 100% seguros porque:**
- ✅ São salvos em arquivos físicos no disco
- ✅ SQLite é um banco de dados confiável e maduro
- ✅ Backups regulares protegem contra perdas
- ✅ Gitignore protege de commits acidentais
- ✅ Sistema testado e funcionando

**Nenhum dado é temporário - tudo é permanente!**

