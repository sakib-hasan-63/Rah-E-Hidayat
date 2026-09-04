# RAH-E-HIDAYAT
> **“Walk the Path of Guidance.”**
> Complete Full-Stack MERN Islamic Digital Platform with Quran Reader, Hadith, Duas, Digital Tasbeeh, Prayer Times, Hijri Calendar, User Authentication, and Admin Panel.

---

## 🏛️ System Architecture

```text
       USER (Browser / Mobile)
                 │
                 ▼
       REACT CLIENT (Vite + Tailwind CSS + Framer Motion)
                 │
                 ▼ REST API (JWT Bearer Token)
       EXPRESS.JS / NODE.JS BACKEND SERVER (:5000)
                 │
                 ▼ Mongoose ODM
       MONGODB DATABASE (Users, Bookmarks, Tasbeeh Logs)
                 │
                 ▼ Role: "admin"
       PROTECTED ADMIN DASHBOARD (/admin)
```

---

## 🔑 Administrator Account Setup

When the backend starts for the first time, if no admin exists in the database, it automatically provisions the initial Super Administrator using environment variables.

### Configure Admin Credentials
Set the following in `server/.env` **before first start**:
```env
ADMIN_EMAIL=rah-e-hidayat@gmail.com
ADMIN_PASSWORD=YourSecurePassword123!
ADMIN_NAME=Admin
```

- **Admin Panel URL**: [http://localhost:5173/admin](http://localhost:5173/admin)

> ⚠️ **Security Note**: Change the default admin password immediately in production. Admin credentials are never exposed in the frontend code.

*(Any user registered first in an empty database is also automatically granted the `admin` role).*

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18 or newer)
- **MongoDB** (Local MongoDB Community Server on port 27017 or MongoDB Atlas Cloud URI)

### 2. Environment Variables Configuration
In `server/.env` (see `.env.example` for reference):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/rah-e-hidayat
JWT_SECRET=your-strong-secret-key-here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173

# Admin Seed Account
ADMIN_EMAIL=rah-e-hidayat@gmail.com
ADMIN_PASSWORD=Admin@123456
ADMIN_NAME=Admin
```

*(For MongoDB Atlas, replace `MONGODB_URI` with your connection string: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/rah-e-hidayat?retryWrites=true&w=majority`).*

### 3. Install Dependencies
From the root directory:
```powershell
npm run install:all
```

### 4. Run Both Frontend & Backend Concurrently
```powershell
npm run dev
```

This starts:
- 🌐 **Frontend (Vite)**: `http://localhost:5173`
- ⚙️ **Backend API (Express)**: `http://localhost:5000`

---

## 🗄️ Where Can I View the Database Data?

### Option A: MongoDB Compass (Local GUI)
1. Download and open **MongoDB Compass**.
2. Connect to: `mongodb://localhost:27017`
3. Click on the database named `rah-e-hidayat`.
4. You will see collections:
   - `users`: Contains user profiles, bcrypt password hashes, and roles (`user` or `admin`).
   - `bookmarks`: Contains personalized saved Ayahs and Duas per user.
   - `tasbeehs`: Contains logged dhikr sessions.

### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas Console](https://cloud.mongodb.com).
2. Navigate to **Database** → **Browse Collections**.
3. Select `rah-e-hidayat` database to inspect all records in real time.

---

## 🛡️ API Endpoints Reference

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new user with full name, email/phone, and password | Public |
| `POST` | `/api/auth/login` | Authenticate user & issue JWT token | Public |
| `GET` | `/api/auth/me` | Retrieve current authenticated user profile & bookmark count | Private |
| `PUT` | `/api/auth/profile` | Update user profile and password | Private |

### Admin Management (`/api/admin`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/admin/stats` | Real-time database analytics (Users, Admins, Bookmarks, Tasbeeh) | Admin Only |
| `GET` | `/api/admin/users` | Search, filter, and sort all registered users | Admin Only |
| `PUT` | `/api/admin/users/:id/role` | Promote/demote user between `user` and `admin` | Admin Only |
| `DELETE` | `/api/admin/users/:id` | Delete user and their associated data from MongoDB | Admin Only |

### Bookmarks (`/api/bookmarks`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/bookmarks` | Get all personal bookmarks for logged-in user | Private |
| `POST` | `/api/bookmarks` | Add new bookmark for logged-in user | Private |
| `DELETE` | `/api/bookmarks/:id` | Remove personal bookmark | Private |

### Tasbeeh (`/api/tasbeeh`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/tasbeeh` | Log dhikr session & increment total user tasbeeh counter | Private |
| `GET` | `/api/tasbeeh` | Get personal tasbeeh history log | Private |

---

## 📁 Key File Locations

- **Backend API & Server Entry**: [server/server.js](file:///c:/Users/sakib/OneDrive/Desktop/Rah-e-Hidayat/server/server.js)
- **MongoDB User Schema**: [server/models/User.js](file:///c:/Users/sakib/OneDrive/Desktop/Rah-e-Hidayat/server/models/User.js)
- **JWT Protection Middleware**: [server/middleware/auth.js](file:///c:/Users/sakib/OneDrive/Desktop/Rah-e-Hidayat/server/middleware/auth.js)
- **Role Verification Middleware**: [server/middleware/role.js](file:///c:/Users/sakib/OneDrive/Desktop/Rah-e-Hidayat/server/middleware/role.js)
- **Auth Context (Frontend)**: [client/src/context/AuthContext.jsx](file:///c:/Users/sakib/OneDrive/Desktop/Rah-e-Hidayat/client/src/context/AuthContext.jsx)
- **Admin Dashboard UI**: [client/src/pages/admin/AdminDashboard.jsx](file:///c:/Users/sakib/OneDrive/Desktop/Rah-e-Hidayat/client/src/pages/admin/AdminDashboard.jsx)
- **Admin User Management UI**: [client/src/pages/admin/AdminUsers.jsx](file:///c:/Users/sakib/OneDrive/Desktop/Rah-e-Hidayat/client/src/pages/admin/AdminUsers.jsx)
- **Quran Surah Reader with Audio**: [client/src/pages/QuranReaderPage.jsx](file:///c:/Users/sakib/OneDrive/Desktop/Rah-e-Hidayat/client/src/pages/QuranReaderPage.jsx)
