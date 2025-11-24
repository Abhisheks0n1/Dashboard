Dashboard

A fully functional personal dashboard built with React + Node.js.  
Add, edit, remove, and save your favorite widgets — everything stays safe with your account.


## Features

- Register & Login (email + password)
- 4 Premium Widgets:
  - Clock (Live time)
  - Notes (Editable text)
  - Todo List (Add, check, delete items)
  - Weather (Real-time Lucknow, Uttar Pradesh, India)
- Save your dashboard — survives refresh & logout
- Stunning white glass cards with black text
- Dark elegant background
- Clean, fast, and professional design

## Tech Stack

| Part       | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | React + TypeScript + Zustand + Axios            |
| Backend    | Node.js + Express + SQLite + JWT Authentication |

## How to Run (Super Easy)

### 1. Start the Backend

```bash
cd backend
npm install
npm run dev
Server runs at: http://localhost:5000
2. Start the Frontend
Open a new terminal:
Bashcd frontend
npm install
npm start
App opens at: http://localhost:3000
3. Use the App

Go to http://localhost:3000
Click Register → create your account
Login with your email & password
Add widgets, edit them, rearrange
Click "SAVE DASHBOARD"
Refresh the page → everything is still there!

You must register
Folder Structure
textmy-dashboard-app/
├── backend/     → Server, database, authentication
└── frontend/    → Beautiful React dashboard UI
