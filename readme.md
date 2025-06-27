# 📝 Task Manager App

A full-stack MERN (MongoDB, Express, React, Node.js) Task Manager app for organizing, tracking, and managing your daily tasks efficiently 🚀

---

## 📦 Tech Stack

**Frontend** (Coming soon):
- ⚛️ React
- 🎨 Tailwind CSS

**Backend**:
- 🟢 Node.js
- 🌐 Express
- 🍃 MongoDB Atlas
- 🔐 JWT Auth + Bcrypt
- 🧪 Thunder Client (for API testing)

---

## 🔒 Features

- ✅ User Registration & Login (with JWT)
- 🔑 Protected Routes (token-based auth)
- 🗃️ Create / Read / Update / Delete tasks
- 📌 Task completion toggle
- 🧑‍💻 Built and tested with Thunder Client

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

#### 🔐 Create a `.env` file inside `/server`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=supersecretkey
```

### 3️⃣ Run the server

```bash
npm run dev
```

Server will be up at: `http://localhost:5000`

---

## 🔧 API Endpoints

| Method | Endpoint             | Description           | Protected |
|--------|----------------------|-----------------------|-----------|
| POST   | /api/auth/register   | Register user         | ❌        |
| POST   | /api/auth/login      | Login user            | ❌        |
| GET    | /api/auth/profile    | Get logged in user    | ✅        |
| POST   | /api/tasks           | Create new task       | ✅        |
| GET    | /api/tasks           | Get all tasks         | ✅        |
| PUT    | /api/tasks/:id       | Update task (e.g., mark completed) | ✅ |
| DELETE | /api/tasks/:id       | Delete task           | ✅        |

---

## 📂 Folder Structure

```
task-manager-app/
├── client/            # Frontend (React - coming soon)
└── server/            # Backend
    ├── controllers/   # Route logic (auth, tasks)
    ├── middleware/    # Auth middleware
    ├── models/        # Mongoose models
    ├── routes/        # Express route files
    ├── .env           # Env variables
    ├── index.js       # Entry point
```

---

## 🔥 Status

✅ **Backend is complete** (Auth, CRUD)
🛠️ **Frontend development begins on Day 2**

---

## ✨ Credits

Made with ❤️ by [Devdhar](https://github.com/DevdharManpuria)

---

## 🪪 License

This project is open source and available under the [MIT License](LICENSE).
