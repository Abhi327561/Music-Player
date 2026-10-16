# 🎵 Music Player

A full-stack music streaming web application built with the **MERN stack** (MongoDB, Express.js, React, Node.js). Users can browse and play songs, manage playlists, mark favourites, and authenticate securely with JWT.

## 🌐 Live Demo

- **Frontend (Vercel):** https://music-player-jade-three.vercel.app
- **Backend API (Render):** https://music-player-backend-i1a1.onrender.com
- **API Health Check:** https://music-player-backend-i1a1.onrender.com/api/health

---

## 🚀 Features

- 🔐 **Authentication** — Sign up, log in, forgot/reset password via email, edit profile
- 🎶 **Browse Songs** — Explore all songs or filter by tags/playlists
- ❤️ **Favourites** — Toggle and view favourite songs (authenticated users)
- 📋 **Playlist Support** — Group songs by tags into playlists
- 🖼️ **Image Uploads** — Profile pictures stored via ImageKit CDN
- 🎵 **Audio Player** — Full-featured player with controls (play, pause, skip, volume)
- 🔍 **Search** — Search songs from the song library
- 📱 **Responsive UI** — Clean, modern interface built with React + Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Build tool / dev server |
| Redux Toolkit | Global state management |
| React Router DOM | Client-side routing |
| Axios | HTTP requests |
| Tailwind CSS | Styling |
| React Icons | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database |
| JSON Web Tokens (JWT) | Authentication |
| Bcrypt | Password hashing |
| Nodemailer | Email (password reset) |
| ImageKit | Image CDN / uploads |
| dotenv | Environment config |

---

## 📁 Project Structure

```
Music-Player/
├── backend/
│   ├── config/
│   │   ├── connectDB.js        # MongoDB connection
│   │   └── imagekit.js         # ImageKit SDK config
│   ├── controllers/
│   │   ├── authController.js   # Auth logic
│   │   └── songController.js   # Song logic
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT protect middleware
│   ├── models/
│   │   └── userModel.js        # User Mongoose schema
│   ├── routes/
│   │   ├── authRoutes.js       # /api/auth routes
│   │   └── songRoutes.js       # /api/songs routes
│   ├── utils/
│   │   └── sendEmail.js        # Nodemailer helper
│   └── index.js                # Express app entry point
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── auth/            # Login, Signup, ResetPassword, EditProfile
    │   │   ├── common/          # Reusable Modal, Input
    │   │   ├── layout/          # MainArea, SideMenu, Footer
    │   │   ├── player/          # ControlArea, SongDetail, Playlist, SongList, Features
    │   │   ├── search/          # SearchBar
    │   │   └── songs/           # SongCard, SongGrid
    │   ├── css/                 # Component-level CSS files
    │   ├── hooks/
    │   │   └── useAudioPlayer.js
    │   ├── pages/
    │   │   └── Homepage.jsx
    │   ├── redux/
    │   │   ├── slices/          # authSlice, uiSlice
    │   │   └── store.js
    │   ├── App.jsx
    │   └── main.jsx
    └── index.html
```

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) Atlas (allow `0.0.0.0/0` for Render) or local
- An [ImageKit](https://imagekit.io/) account
- A [Mailtrap](https://mailtrap.io/) account for password-reset emails (sandbox for dev, real SMTP for prod)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Abhi327561/Music-Player.git
cd Music-Player
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory (see `backend/.env.example`):

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

# Mailtrap (Nodemailer)
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=587
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_pass
```

Start the backend dev server:

```bash
npm run dev
```

The backend runs on `http://localhost:5001`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file in `frontend/` (see `frontend/.env.example`):

```env
VITE_BASE_URL=http://localhost:5001
```

The frontend runs on `http://localhost:5173`

---

## ☁️ Deployment

### Backend — Render (Web Service)
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Node version: 18+
- Set all vars from `backend/.env.example`:
  `PORT`, `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`,
  `FRONTEND_URL` (= your Vercel URL),
  `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_URL_ENDPOINT`,
  `MAILTRAP_HOST`, `MAILTRAP_PORT`, `MAILTRAP_USER`, `MAILTRAP_PASS`
- Verify: `GET /api/health` returns `{ "status": "ok" }`

### Frontend — Vercel (Vite)
- Root Directory: `frontend`
- Framework: Vite, Build: `npm run build`, Output: `dist`
- Env var: `VITE_BASE_URL=https://music-player-backend-i1a1.onrender.com` (no trailing slash)
- After deploy, update Render `FRONTEND_URL` to your Vercel URL and redeploy backend (fixes CORS + reset-password links).

---

## 🔌 API Endpoints

### Auth — `/api/auth`

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|-------------|
| POST | `/signup` | ❌ | Register a new user |
| POST | `/login` | ❌ | Login and receive JWT |
| GET | `/me` | ✅ | Get current user info |
| POST | `/forget-password` | ❌ | Send password reset email |
| POST | `/reset-password/:token` | ❌ | Reset password with token |
| PATCH | `/profile` | ✅ | Update profile info |

### Songs — `/api/songs`

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|-------------|
| GET | `/` | ❌ | Get all songs |
| GET | `/playlistByTag/:tag` | ❌ | Get songs filtered by tag |
| POST | `/favourite` | ✅ | Toggle a song as favourite |
| GET | `/favourites` | ✅ | Get current user's favourites |

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👤 Author

**Abhi M P**  
GitHub: [@Abhi327561](https://github.com/Abhi327561)
