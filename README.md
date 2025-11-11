
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

## ⚙️ Environment Variables

### 🖥️ Frontend (`/task-management-client/.env`)
```env
VITE_API_URL=http://localhost:4000/api


### Backend (`/task-management-server/.env`)
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
