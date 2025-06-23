
# 🕊️ Backend - Comunidade Zion Church (Teste)

Este backend serve uma aplicação de mini-blog, com recursos como:
 **autenticação**, **criação de posts**, **curtidas**, **comentários**, e **notificações em tempo real** via WebSocket.

---

## 🚀 Tecnologias utilizadas

- **Node.js**
- **Express.js**
- **TypeScript**
- **Socket.IO**
- **Prisma ORM**
- **MongoDB**
- **JWT (JSON Web Token)**
- **Jest (para testes unitários)**

---

## 📡 Endpoint público (Deploy)

🔗 [https://zion-church-api-production.up.railway.app/](https://zion-church-api-production.up.railway.app/)

---

## 🛠️ Como rodar localmente

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/ilucaslima/zion-church-api.git
cd zion-church-api
```

### 2️⃣ Instalar as dependências

```bash
yarn install
# ou
npm install
```

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example` fornecido.

### 4️⃣ Rodar a aplicação

```bash
yarn dev
# ou
npm run dev
```

---

## ✅ Principais funcionalidades

- Cadastro e login de usuários (com JWT)
- CRUD de posts
- Sistema de curtidas
- Comentários nos posts
- Comunicação em tempo real com **Socket.IO**
- Integração com **MongoDB** via **Prisma**
- Testes unitários com **Jest**

---

## 💬 Sobre o projeto
O foco principal foi:

- Criar uma **API RESTful limpa e bem estruturada**
- Implementar **autenticação JWT**
- Realizar **comunicação em tempo real com WebSocket**
- Garantir **boas práticas com TypeScript**, incluindo **tipagem segura**
- Criar **testes unitários com Jest**
