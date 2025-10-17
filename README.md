# Quiz Generator

![Node](https://img.shields.io/badge/Node-18%2B-339933?logo=node.js&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-13%2B-000000?logo=nextdotjs)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14%2B-4169E1?logo=postgresql&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-informational)

Monorepo with a **Next.js frontend** and a **Node.js (Nest/Express) backend** + **PostgreSQL**.  
Create and manage quizzes; includes a UI to build quizzes and view them.

---

## ✨ Features
- 🧩 Quiz builder (SINGLE / MULTIPLE / TEXT)
- 👀 Quiz view page
- 🔗 Clean API + Prisma (optional)
- 🐘 PostgreSQL-ready

---

## 📦 Repository Structure
```
.
├─ backend/         # API server (Node.js/Nest/Express + Prisma)
├─ frontend/        # Next.js app (UI)
└─ README.md
```

---

## ⚙️ Requirements
- **Node.js** 18+
- **npm** (або yarn/pnpm)
- **PostgreSQL** доступний за connection string нижче

> 🔐 **Security:** не комітьте реальні креденшіали у публічні репозиторії.  
> Використовуйте локальні `.env` файли та GitHub Secrets для продакшну.

---

## 🛠 Backend Setup

### 1) Create `.env` in `backend/`
Створіть файл `backend/.env` з таким вмістом:
```env
DATABASE_URL="postgresql://postgres:5dr6ft7guhi9i@95.216.205.200:5432/postgres"
PORT=4000
FRONTEND_URL=http://localhost:3000
```
> `FRONTEND_URL` використовується для CORS. Якщо фронт запускається на іншому порту/хості — оновіть значення.

### 2) Install dependencies
```bash
cd backend
npm install
```

### 3) (If using Prisma) Generate client & run migrations
```bash
# typical Prisma workflow
npx prisma generate
npx prisma migrate deploy

# during development you may prefer:
# npx prisma migrate dev --name init
```

### 4) Start the backend
```bash
# development (watch)
npm run start:dev

# production (after build)
# npm run build && npm run start
```

Back-end буде доступний на **http://localhost:4000**.

---

## 💻 Frontend Setup

### 1) Create `.env.local` in `frontend/`
Створіть файл `frontend/.env.local` з таким вмістом:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

### 2) Install dependencies
```bash
cd ../frontend
npm install
```

### 3) Start the frontend
```bash
npm run dev
```

Front-end буде доступний на **http://localhost:3000**.

---
