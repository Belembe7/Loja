/**
 * Configuração da API
 * 
 * Para usar o app em qualquer dispositivo:
 * 1. Coloque o IP da sua máquina na rede local (para desenvolvimento)
 * 2. Para produção, use um serviço de hospedagem (Railway, Heroku, etc.)
 */

// DESENVOLVIMENTO: Use o IP da sua máquina na rede local
// ENCONTRE O IP: digite "ipconfig" no PowerShell e use o "IPv4 Address"
const DEV_IP = '10.39.22.123';

// PRODUÇÃO: URL pública da sua API (configure quando hospedar)
const PROD_API_URL = '';

// Escolha o ambiente
const IS_DEV = true;

export const API_URL = IS_DEV 
  ? `http://${DEV_IP}:5000/api`
  : PROD_API_URL;

// Exibir no console para debug
console.log('🔗 API URL:', API_URL);

