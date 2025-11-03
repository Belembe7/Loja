from flask import Flask, jsonify, request, send_from_directory, session, redirect, url_for
from flask_cors import CORS
import sqlite3
import os
from werkzeug.utils import secure_filename
from functools import wraps
import socket

app = Flask(__name__)
CORS(app)

# Configuração de sessão (necessária para autenticação)
app.config['SECRET_KEY'] = 'ktech-secret-key-2024-change-in-production'

# Configuração do banco de dados
DATABASE = 'loja.db'

# Configuração de upload
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
MAX_FILE_SIZE = 16 * 1024 * 1024  # 16MB

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Criar pasta de uploads se não existir
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Função para obter o IP local da rede
def get_local_ip():
    """Obtém o IP local da máquina na rede"""
    try:
        # Conecta a um endereço fora da rede local
        # Não precisa realmente conectar, só descobrir o IP
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return 'localhost'

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def login_required(f):
    """Decorator para rotas que requerem autenticação"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'admin_logged_in' not in session:
            return jsonify({'erro': 'Não autenticado', 'redirect': '/login.html'}), 401
        return f(*args, **kwargs)
    return decorated_function

def init_db():
    """Inicializa o banco de dados criando as tabelas necessárias"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Tabela de categorias
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS categorias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL UNIQUE,
            imagem_url TEXT
        )
    ''')
    
    # Tabela de produtos
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

def get_db_connection():
    """Retorna uma conexão com o banco de dados"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# Inicializar banco de dados ao iniciar o app
init_db()

# Rotas de produtos
@app.route('/api/produtos', methods=['GET'])
def get_produtos():
    """Retorna todos os produtos"""
    conn = get_db_connection()
    produtos = conn.execute('SELECT * FROM produtos').fetchall()
    conn.close()
    return jsonify([dict(produto) for produto in produtos])

@app.route('/api/produtos/<int:produto_id>', methods=['GET'])
def get_produto(produto_id):
    """Retorna um produto específico"""
    conn = get_db_connection()
    produto = conn.execute('SELECT * FROM produtos WHERE id = ?', (produto_id,)).fetchone()
    conn.close()
    
    if produto:
        return jsonify(dict(produto))
    return jsonify({'erro': 'Produto não encontrado'}), 404

@app.route('/api/produtos', methods=['POST'])
@login_required
def criar_produto():
    """Cria um novo produto"""
    dados = request.get_json()
    conn = get_db_connection()
    
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO produtos (nome, preco, descricao, imagem_url, estoque, categoria_id)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (dados['nome'], dados['preco'], dados.get('descricao'), 
          dados.get('imagem_url'), dados.get('estoque', 0), dados.get('categoria_id')))
    
    conn.commit()
    produto_id = cursor.lastrowid
    conn.close()
    
    return jsonify({'id': produto_id, 'mensagem': 'Produto criado com sucesso'}), 201

@app.route('/api/produtos/<int:produto_id>', methods=['PUT'])
@login_required
def atualizar_produto(produto_id):
    """Atualiza um produto existente"""
    dados = request.get_json()
    conn = get_db_connection()
    
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE produtos 
        SET nome = ?, preco = ?, descricao = ?, imagem_url = ?, estoque = ?, categoria_id = ?
        WHERE id = ?
    ''', (dados['nome'], dados['preco'], dados.get('descricao'),
          dados.get('imagem_url'), dados.get('estoque', 0), dados.get('categoria_id'), produto_id))
    
    conn.commit()
    conn.close()
    
    return jsonify({'mensagem': 'Produto atualizado com sucesso'})

@app.route('/api/produtos/<int:produto_id>', methods=['DELETE'])
@login_required
def deletar_produto(produto_id):
    """Deleta um produto"""
    conn = get_db_connection()
    conn.execute('DELETE FROM produtos WHERE id = ?', (produto_id,))
    conn.commit()
    conn.close()
    
    return jsonify({'mensagem': 'Produto deletado com sucesso'})

# Rotas de categorias
@app.route('/api/categorias', methods=['GET'])
def get_categorias():
    """Retorna todas as categorias"""
    conn = get_db_connection()
    categorias = conn.execute('SELECT * FROM categorias').fetchall()
    conn.close()
    return jsonify([dict(cat) for cat in categorias])

@app.route('/api/categorias', methods=['POST'])
@login_required
def criar_categoria():
    """Cria uma nova categoria"""
    dados = request.get_json()
    conn = get_db_connection()
    
    try:
        cursor = conn.cursor()
        cursor.execute('INSERT INTO categorias (nome, imagem_url) VALUES (?, ?)', 
                      (dados['nome'], dados.get('imagem_url')))
        conn.commit()
        categoria_id = cursor.lastrowid
        conn.close()
        return jsonify({'id': categoria_id, 'mensagem': 'Categoria criada com sucesso'}), 201
    except sqlite3.IntegrityError:
        conn.close()
        return jsonify({'erro': 'Categoria já existe'}), 400

@app.route('/api/categorias/<int:categoria_id>/produtos', methods=['GET'])
def get_produtos_por_categoria(categoria_id):
    """Retorna produtos de uma categoria específica"""
    conn = get_db_connection()
    produtos = conn.execute('SELECT * FROM produtos WHERE categoria_id = ?', 
                           (categoria_id,)).fetchall()
    conn.close()
    return jsonify([dict(produto) for produto in produtos])

# Rotas de upload
@app.route('/api/upload', methods=['POST'])
@login_required
def upload_file():
    """Faz upload de uma imagem"""
    if 'file' not in request.files:
        return jsonify({'erro': 'Nenhum arquivo enviado'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'erro': 'Nome do arquivo vazio'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        # Adicionar timestamp para evitar conflitos
        import time
        timestamp = int(time.time())
        name, ext = filename.rsplit('.', 1)
        filename = f"{name}_{timestamp}.{ext}"
        
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Retornar URL - em produção usa o domínio do Render, em desenvolvimento usa IP local
        # Detecta se está em produção (Render) ou desenvolvimento local
        is_production = os.getenv('RENDER') or os.getenv('FLASK_ENV') == 'production'
        
        if is_production:
            # Em produção no Render - usa o domínio do request
            base_url = request.host_url.rstrip('/')
        else:
            # Em desenvolvimento local - usa IP da rede
            local_ip = get_local_ip()
            base_url = f"http://{local_ip}:5000"
        
        url = f"{base_url}/api/uploads/{filename}"
        return jsonify({'url': url, 'filename': filename}), 200
    
    return jsonify({'erro': 'Tipo de arquivo não permitido'}), 400

@app.route('/api/uploads/<filename>')
def uploaded_file(filename):
    """Serve arquivos estáticos"""
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Rotas de autenticação
@app.route('/api/login', methods=['POST'])
def login():
    """Faz login do administrador"""
    dados = request.get_json()
    username = dados.get('username')
    password = dados.get('password')
    
    # Credenciais (em produção, use hash de senha!)
    if username == 'admin' and password == 'ktech2024':
        session['admin_logged_in'] = True
        return jsonify({'sucesso': True, 'mensagem': 'Login realizado com sucesso'}), 200
    else:
        return jsonify({'sucesso': False, 'erro': 'Credenciais inválidas'}), 401

@app.route('/api/logout', methods=['POST'])
def logout():
    """Faz logout do administrador"""
    session.pop('admin_logged_in', None)
    return jsonify({'sucesso': True, 'mensagem': 'Logout realizado com sucesso'}), 200

@app.route('/api/check-auth', methods=['GET'])
def check_auth():
    """Verifica se o usuário está autenticado"""
    if 'admin_logged_in' in session:
        return jsonify({'autenticado': True}), 200
    return jsonify({'autenticado': False}), 401

# Servir páginas HTML
@app.route('/login.html')
def login_page():
    return send_from_directory('.', 'login.html')

@app.route('/admin.html')
def admin_page():
    return send_from_directory('.', 'admin.html')

if __name__ == '__main__':
    # Inserir alguns dados de exemplo
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Verificar se já existem dados
    count = cursor.execute('SELECT COUNT(*) FROM produtos').fetchone()[0]
    
    if count == 0:
        # Inserir categorias
        categorias_exemplo = [
            ('Smartphones', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'),
            ('Laptops', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'),
            ('Headphones', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'),
            ('Smartwatches', 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400')
        ]
        
        categoria_ids = []
        for cat_nome, cat_img in categorias_exemplo:
            cursor.execute('INSERT OR IGNORE INTO categorias (nome, imagem_url) VALUES (?, ?)', 
                          (cat_nome, cat_img))
            categoria_ids.append(cursor.lastrowid if cursor.lastrowid else cursor.execute(
                'SELECT id FROM categorias WHERE nome = ?', (cat_nome,)).fetchone()[0])
        
        # Inserir produtos de exemplo
        produtos_exemplo = [
            ('iPhone 15 Pro', 1299.99, 'Smartphone Apple com chip A17 Pro', 
             'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400', 15, categoria_ids[0]),
            ('MacBook Pro 14"', 2499.99, 'Notebook Apple M3', 
             'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400', 8, categoria_ids[1]),
            ('AirPods Max', 549.99, 'Fones de ouvido over-ear Apple', 
             'https://images.unsplash.com/photo-1599669454699-248893623440?w=400', 20, categoria_ids[2]),
            ('Apple Watch Ultra', 799.99, 'Smartwatch resistente', 
             'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400', 12, categoria_ids[3]),
            ('Samsung Galaxy S24', 999.99, 'Smartphone Android top de linha', 
             'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400', 18, categoria_ids[0]),
            ('Dell XPS 15', 1999.99, 'Notebook premium Dell', 
             'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', 10, categoria_ids[1])
        ]
        
        for produto in produtos_exemplo:
            cursor.execute('''
                INSERT INTO produtos (nome, preco, descricao, imagem_url, estoque, categoria_id)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', produto)
    
    conn.commit()
    conn.close()
    
    # Configuração para Render (produção) ou desenvolvimento local
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') != 'production'
    
    print("🚀 Servidor Flask iniciado!")
    print(f"📱 API disponível em http://0.0.0.0:{port}")
    print("🔐 Login: http://0.0.0.0:{}/login.html".format(port))
    print("🌐 Interface Admin: http://0.0.0.0:{}/admin.html".format(port))
    print("📂 Imagens salvas em: backend/uploads/")
    print("🔑 Credenciais: admin / ktech2024")
    app.run(debug=debug, host='0.0.0.0', port=port)
