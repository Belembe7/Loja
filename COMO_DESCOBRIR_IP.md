# 🌐 Como Descobrir o IP da Sua Máquina

Para conectar o app mobile com a API Flask, você precisa descobrir o IP da sua máquina na rede local.

## Windows

### Método 1: PowerShell
```powershell
ipconfig
```

Procure por **"IPv4"** e anote o endereço (algo como `192.168.0.100` ou `192.168.1.100`)

### Método 2: Prompt de Comando
```cmd
ipconfig
```

## Linux / Mac

### Terminal
```bash
ifconfig
```

ou

```bash
ip addr show
```

Procure por **inet** na interface ativa (geralmente `wlan0` ou `eth0`)

## Exemplo de Saída

```
Adaptador de LAN sem fio Wi-Fi:
   IPv4: 192.168.0.100    ← Use este IP
   Máscara de sub-rede: 255.255.255.0
```

## ⚠️ Importante

- Use o IP da rede local (geralmente começa com `192.168.` ou `10.`)
- O IP pode mudar quando você reiniciar o computador ou reconectar na rede
- Certifique-se que o celular e o computador estão na mesma rede Wi-Fi
- O IP `127.0.0.1` ou `localhost` NÃO funciona para comunicação entre dispositivos

## Como Configurar no App

Após descobrir seu IP, edite os arquivos:

1. `mobile/app/(tabs)/index.tsx` - Linha 15
2. `mobile/app/(tabs)/explore.tsx` - Linha 7

Substitua `192.168.0.100` pelo seu IP.



