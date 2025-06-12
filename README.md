# 🏏 SportsHub – Cricket Experience Platform

SportsHub is a full-stack cricket dashboard built with React, Node.js, MongoDB, and Tailwind CSS. Inspired by BoxBox.club's design and interactivity, it lets users:

- 📺 View live match scores, overs, and win predictors
- 📊 Explore insights like run rate graphs and bowling lengths
- 🧠 Play daily Cricket IQ quizzes
- 🎮 Build fantasy teams
- 🔐 Admin panel to manage matches, media, and stats

---

## 🔧 Tech Stack

| Layer       | Stack                            |
|-------------|-----------------------------------|
| Frontend    | React + Tailwind CSS + Framer Motion |
| Backend     | Node.js + Express.js              |
| Database    | MongoDB Atlas                     |
| Deployment  | Local (Render/Netlify ready)      |
| Extra       | JWT Auth, Charts, Dark Mode  |

---

## 🚀 Features

### 🏏 Match Center
- Live scores with team flags, win prediction bars
- View upcoming & completed matches with tabs (T20, ODI, Test)

### 📊 Match Insights
- Run rate charts
- Wicket zone visuals
- Bowler length heat maps

### 🧠 Cricket IQ Quiz
- Daily challenge with instant feedback

### 🎮 Fantasy League
- Pick 5-player teams from live player pool

### 🖼 Media Hub
- Upload match gallery images and news articles (admin only)

### 🛠 Admin Panel
- Add/edit/delete matches, players, teams, media
- Secure with JWT login (`admin@sportshub.com` / `sports123`)


---

## 📂 Folder Structure

```
client/              # React frontend
  src/
    pages/           # Routes like Home, MatchDetail, Admin
    components/      # UI components (MatchCard, PlayerCard...)
    assets/          # Team/player images
server/              # Express backend
  routes/            # REST API endpoints
  controllers/       # Logic for routes
  models/            # Mongoose models
  scripts/           # DB seeding scripts
```

---

## 🔑 .env Example

For backend:
```
PORT=9091
MONGO_URI=your_mongo_atlas_uri
JWT_SECRET=sports-secret
```

---

## 🧪 Local Setup

```bash
# Clone the repo
https://github.com/NiKlaus0603/Cric.git
cd Cric

# Install backend dependencies and start server
cd server
npm install
node server.js

# In another terminal tab, install frontend dependencies and run React dev server
cd ../client
npm install
npm start
```

> The backend runs at http://localhost:9091
> The frontend runs at http://localhost:3000

---

## 🌐 Deployment (Suggested)
- **Frontend:** Netlify / Vercel (build in `/client`)
- **Backend:** Render or Railway (host `/server`)

---


## 📣 Future Ideas
- Leaderboards for fantasy picks
- Live match commentary
- User-authenticated profiles
- Live API (CricAPI or CricketData.org)

