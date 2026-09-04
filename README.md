# 🌟 Rah-e-Hidayat (راهِ ہدایت)

> **“Walk the Path of Guidance.”**  
> A full-stack MERN Islamic digital platform built with care, serenity, and precision. Offers authentic Quran reading with audio recitation, Hadith collections, daily Azkar, supplications, digital Tasbeeh, prayer times, Hijri calendar, user authentication, interactive Islamic quizzes, community feedback, and a protected administrator dashboard.

---

## ✨ Features

* **📖 Holy Quran Reader**: Browse all 114 Surahs with smooth Arabic typography, English translations, reciter selection, and persistent audio playback controls.
* **🤲 Authentic Duas**: Curated prophetic supplications organized by category, including complete Sayyid al-Istighfar.
* **🌅 Morning & Evening Azkar**: Essential daily remembrances with complete Arabic text, transliteration, translation, and full-text reading views.
* **📿 Digital Tasbeeh Counter**: Responsive digital counter with audio/vibration feedback, presets (SubhanAllah, Alhamdulillah, Allahu Akbar), and saved dhikr history.
* **🕌 Accurate Prayer Times**: Automatic location detection and Indian subcontinent calculation presets with real-time countdown to the next prayer.
* **📅 Hijri Islamic Calendar**: Interactive lunar Islamic calendar with significant Islamic dates and occasions.
* **📥 Islamic Downloads**: Printable PDF booklets for Morning/Evening Azkar and 40 Rabbana Duas.
* **🧠 Islamic Knowledge Quiz**: Interactive quiz with score tracking and full dark/light theme support.
* **✉️ Contact & Feedback System**: Direct message submission stored securely in MongoDB and instantly visible in the Admin Panel.
* **🛡️ Secure Admin Panel**:
  * Real-time metrics overview
  * User account management and role management
  * Surah catalog reference
  * Bookmarks & saved content log
  * User feedback management (filter by type, mark as read, delete)
  * Admin security profile management

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide React Icons, Axios |
| **Backend** | Node.js, Express.js (Vercel Serverless Ready) |
| **Database** | MongoDB & Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens), bcryptjs password hashing |
| **Deployment** | Vercel (Single-Project Fullstack Serverless Architecture) |

---

## 📁 Project Structure

```text
Rah-e-Hidayat/
├── api/                    # Vercel Serverless Function entrypoint (/api/*)
│   └── index.js
├── client/                 # React frontend (Vite)
│   ├── public/             # Static assets & icons
│   ├── src/
│   │   ├── components/     # UI components (Navbar, Footer, Modals, Loaders)
│   │   ├── context/        # React Contexts (Auth, Theme, Toast)
│   │   ├── layouts/        # MainLayout & AdminLayout
│   │   ├── pages/          # Public & Admin pages
│   │   ├── routes/         # Protected route guards
│   │   └── services/       # Axios API client
│   ├── vercel.json         # Client SPA rewrite fallback
│   └── vite.config.js      # Vite dev server & proxy configuration
├── server/                 # Express backend API
│   ├── config/             # MongoDB connection (with serverless pooling)
│   ├── controllers/        # Auth, Admin, Bookmark, Tasbeeh, Feedback
│   ├── middleware/         # JWT protection & role authorization
│   ├── models/             # Mongoose schemas (User, Bookmark, Tasbeeh, Feedback)
│   ├── routes/             # Express API routes
│   └── utils/              # Emailer & admin initialization
├── .env.example            # Safe environment template
├── .gitignore              # Git ignore rules protecting secrets
├── package.json            # Root scripts & dependencies
└── vercel.json             # Vercel deployment & routing configuration
```

---

## 🚀 Local Development Setup

### 1. Prerequisites
* **Node.js**: v18.0.0 or later
* **MongoDB**: Local MongoDB instance (port 27017) or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster

### 2. Clone and Install Dependencies
```bash
git clone https://github.com/your-username/Rah-e-Hidayat.git
cd Rah-e-Hidayat

# Install dependencies for root, client, and server
npm run install:all
```

### 3. Configure Environment Variables
Copy `.env.example` to create your local `.env` file:
```bash
cp .env.example .env
cp server/.env.example server/.env
```

Open `.env` (and `server/.env`) and fill in your values:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/rah-e-hidayat
JWT_SECRET=your_strong_random_jwt_secret
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=rah.e.hidayat1265@gmail.com
ADMIN_PASSWORD=YourSecurePasswordHere
ADMIN_NAME=Admin
```

### 4. Run the Application
Start both frontend and backend concurrently:
```bash
npm run dev
```

* 🌐 **Frontend**: `http://localhost:5173`
* ⚙️ **Backend API**: `http://localhost:5000/api`
* 🛡️ **Admin Panel**: `http://localhost:5173/admin`

---

## ☁️ Vercel Deployment

This repository is pre-configured for **single-project deployment on Vercel**. The frontend is built as an optimized Single-Page App, and the Express backend runs automatically as a serverless function under `/api/*`.

### Deployment Instructions

1. **Import Repository to Vercel**:
   * Connect your GitHub repository in the [Vercel Dashboard](https://vercel.com/new).
   * Leave **Root Directory** as `./` (the repository root).

2. **Build Settings**:
   * **Framework Preset**: Vite
   * **Build Command**: `npm run build`
   * **Output Directory**: `client/dist`

3. **Environment Variables**:
   In Vercel **Project Settings $\to$ Environment Variables**, add:

   | Variable | Description |
   |---|---|
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `JWT_SECRET` | Strong secret key for signing auth tokens |
   | `JWT_EXPIRE` | Token expiration (e.g. `30d`) |
   | `CLIENT_URL` | Your production Vercel URL (e.g. `https://your-project.vercel.app`) |
   | `ADMIN_EMAIL` | Admin account email (`rah.e.hidayat1265@gmail.com`) |
   | `ADMIN_PASSWORD` | Password for your initial administrator account |
   | `ADMIN_NAME` | Display name for admin (`Admin`) |
   | `NODE_ENV` | Set to `production` |

4. **Atlas Network Access**:
   * In your **MongoDB Atlas Console** under **Network Access**, ensure `0.0.0.0/0` is allowed so Vercel's serverless nodes can connect.

5. **Deploy**:
   * Click **Deploy**. Vercel will build the frontend and deploy the serverless API.

---

## 🔒 Security & Privacy Guidelines

* **Never commit `.env` files**: All sensitive secrets (database credentials, JWT keys, SMTP credentials, passwords) must remain in `.env` files which are excluded by `.gitignore`.
* **Frontend Isolation**: No backend secrets or database URIs are bundled into the client build.
* **Passwords**: All passwords stored in MongoDB are salted and hashed using `bcryptjs`.
* **SPA Routing**: Full routing fallback is handled via `vercel.json` to prevent 404 errors on page refresh.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
Built with sincerity for the Ummah.
