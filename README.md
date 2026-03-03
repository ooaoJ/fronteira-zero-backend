# 🚀 Fronteira Zero — Guia Completo de Comandos

Este documento centraliza todos os comandos utilizados no projeto  
**Fronteira Zero**, incluindo frontend, backend, banco de dados, deploy e acesso ao servidor.

---

# 📦 INSTALAÇÃO INICIAL (Primeira vez no projeto)

## 🔹 Clonar repositório
```bash
git clone https://github.com/ooaoJ/fronteira-zero-frontend

```
## 🔹 Instalar dependências
```bash
npm install
```

---

# 🖥️ FRONTEND (Vue.js)

## ▶️ Rodar em desenvolvimento
```bash
npm run dev
```

## ▶️ Acessar no navegador
```http
http://localhost:5173
```


---

# ⚙️ BACKEND (NestJS)

## ▶️ Rodar em desenvolvimento
```bash
npm run start:dev
```

---

# 🔐 SSH NO SERVIDOR (Via Cloudflare)

## ▶️ Acessar servidor remoto
```bash
ssh -o ProxyCommand="cloudflared access ssh --hostname ohio-reasonably-far-penguin.trycloudflare.com" competidor@ohio-reasonably-far-penguin.trycloudflare.com
```

---

# 🔎 DEBUG ÚTIL

## Ver portas abertas
```bash
sudo lsof -i -P -n
```

## Ver status do serviço (se usar systemd)
```bash
systemctl status cloudflared-quick --no-pager
```

---

# 🧠 DICAS IMPORTANTES

- Sempre rodar `npm install` após puxar alterações.
- Nunca commitar `.env`.
- Verificar CORS se frontend não consumir API.

---

#### 📌 Documento mantido manualmente — atualizar sempre que novos comandos forem adicionados.