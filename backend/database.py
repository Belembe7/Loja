"""
Configuração de banco de dados com suporte a PostgreSQL (Render) e SQLite (fallback)
"""
import sqlite3
import os
from contextlib import contextmanager

# Verificar se está usando PostgreSQL (Render) ou SQLite (desenvolvimento)
DATABASE_URL = os.environ.get('DATABASE_URL')

if DATABASE_URL:
    # PostgreSQL (Render) - PERSISTENTE
    import psycopg2
    from psycopg2.extras import RealDictCursor
    USE_POSTGRESQL = True
    print("🔗 Usando PostgreSQL (persistente)")
else:
    # SQLite (desenvolvimento local) - VOLÁTIL no Render
    USE_POSTGRESQL = False
    DATABASE = 'loja.db'
    print("📦 Usando SQLite (local)")

def get_db_connection():
    """Retorna uma conexão com o banco de dados (PostgreSQL ou SQLite)"""
    if USE_POSTGRESQL:
        # PostgreSQL
        conn = psycopg2.connect(DATABASE_URL, sslmode='require')
        conn.cursor_factory = RealDictCursor
        return conn
    else:
        # SQLite
        conn = sqlite3.connect(DATABASE)
        conn.row_factory = sqlite3.Row
        return conn

def init_db():
    """Inicializa o banco de dados criando as tabelas necessárias"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    if USE_POSTGRESQL:
        # PostgreSQL - usar sintaxe PostgreSQL
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS categorias (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL UNIQUE,
                imagem_url TEXT
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS produtos (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                preco DECIMAL(10, 2) NOT NULL,
                descricao TEXT,
                imagem_url TEXT,
                estoque INTEGER DEFAULT 0,
                categoria_id INTEGER,
                FOREIGN KEY (categoria_id) REFERENCES categorias(id)
            )
        ''')
    else:
        # SQLite - usar sintaxe SQLite
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS categorias (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL UNIQUE,
                imagem_url TEXT
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS produtos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                preco REAL NOT NULL,
                descricao TEXT,
                imagem_url TEXT,
                estoque INTEGER DEFAULT 0,
                categoria_id INTEGER,
                FOREIGN KEY (categoria_id) REFERENCES categorias(id)
            )
        ''')
    
    conn.commit()
    conn.close()

@contextmanager
def db_connection():
    """Context manager para conexões de banco de dados"""
    conn = get_db_connection()
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

