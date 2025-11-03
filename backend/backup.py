"""
Script para fazer backup automático do banco de dados e uploads
Execute este script periodicamente para garantir que os dados não sejam perdidos
"""
import shutil
import os
from datetime import datetime

def fazer_backup():
    """Cria uma cópia de backup do banco de dados e uploads"""
    
    # Criar pasta de backup se não existir
    backup_dir = 'backup'
    os.makedirs(backup_dir, exist_ok=True)
    
    # Timestamp para o backup
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    
    # Backup do banco de dados
    db_file = 'loja.db'
    if os.path.exists(db_file):
        backup_db = os.path.join(backup_dir, f'loja_{timestamp}.db')
        shutil.copy2(db_file, backup_db)
        print(f'Backup do banco criado: {backup_db}')
    
    # Backup da pasta uploads
    uploads_dir = 'uploads'
    if os.path.exists(uploads_dir):
        backup_uploads = os.path.join(backup_dir, f'uploads_{timestamp}')
        if os.path.exists(backup_uploads):
            shutil.rmtree(backup_uploads)
        shutil.copytree(uploads_dir, backup_uploads)
        print(f'Backup dos uploads criado: {backup_uploads}')
    
    # Limpar backups antigos (manter apenas os 10 mais recentes)
    if os.path.exists(backup_dir):
        backups = sorted([f for f in os.listdir(backup_dir) if f.startswith('loja_')])
        if len(backups) > 10:
            for old_backup in backups[:-10]:
                os.remove(os.path.join(backup_dir, old_backup))
                print(f'Backup antigo removido: {old_backup}')
        
        upload_backups = sorted([f for f in os.listdir(backup_dir) if f.startswith('uploads_')])
        if len(upload_backups) > 10:
            for old_backup in upload_backups[:-10]:
                shutil.rmtree(os.path.join(backup_dir, old_backup))
                print(f'Backup de uploads antigo removido: {old_backup}')
    
    print('\nBackup concluido com sucesso!')

if __name__ == '__main__':
    print('Iniciando processo de backup...\n')
    fazer_backup()

