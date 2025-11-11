# 📝 Task Management Application

A full-stack task management application built with React, Node.js, Express, and MongoDB.

---

## 🧰 Tech Stack

### **Frontend**
- ⚛️ React 18 + TypeScript
- 🎨 Material UI (MUI)
- ⚡ Vite
- 🔁 React Query (for API caching and mutations)
- 🧭 React Router v6
- 🧩 Redux Toolkit (for auth state)
- ✅ Yup + React Hook Form (validation)
- 🌙 Theme Context for dark/light mode

### **Backend**
- 🧱 Node.js + Express
- 🍃 MongoDB + Mongoose
- 🔐 JWT Authentication (access + refresh tokens)
- 🧩 TypeScript
- 🧾 dotenv + CORS
- 🧰 bcryptjs for password hashing

---

## 📁 Project Structure

```
task-management-app/
│
├── task-management-client/    # Frontend (React app)
│   ├── public/                # Static assets
│   ├── src/                   # React app source code
│   ├── package.json
│   └── ... (vite, tsconfig, etc.)
│
├── task-management-server/    # Backend (Express API)
│   ├── src/                   # Server source code (models, controllers, routes)
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

## ⚙️ Environment Variables

### 🖥️ Frontend (`/task-management-client/.env`)
```env
VITE_API_URL=http://localhost:4000/api
```

### 🗄️ Backend (`/task-management-server/.env`)
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/AmarnathCKR/task-management-app.git
cd task-management-app
```

### 2. Setup the Backend

```bash
cd task-management-server
cp .env.example .env    # Create your .env file
npm install
npm run dev             # or: npm start
```

### 3. Setup the Frontend

```bash
cd ../task-management-client
cp .env.example .env    # Create your .env file
npm install
npm run dev             # Runs on http://localhost:5173
```

---

## 🛠️ Scripts

### Frontend (React)
- `npm run dev` – Start the development server
- `npm run build` – Production build
- `npm run lint` – Lint code

### Backend (Express)
- `npm run dev` – Start server (with nodemon)
- `npm start` – Start server (compiled)
- `npm run build` – TypeScript build

---

## 📚 API Documentation

- All API endpoints are prefixed with `/api`.
- JWT-based authentication (send access & refresh tokens).
- For detailed endpoints, see [`task-management-server/src/routes`](task-management-server/src/routes).

---

## 🏗️ Features

- User registration & authentication
- Create, read, update, and delete tasks
- Task categorization
- Dark/light theme
- Responsive UI

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/awesome-feature`)
3. Commit your changes
4. Push to your branch and open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## 🧪 Testing

- (Describe here if you have tests and how to run: e.g., `npm test` in each folder.)

---

## © License

This project is licensed under the MIT License.

---

> _Feel free to open issues or contribute!_
