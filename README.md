# studio-booking
Momodu studio booking app
# 📸 Photostudio App

A **MERN stack** application for managing a photo studio business.  
Built with **Next.js (Pages Router)**, **Express**, **MongoDB**, and **Node.js**.  

---

## 🚀 Features (Planned)
- 📅 Booking system for studio sessions
- 👤 Customer dashboard & management
- 💵 Payment & invoicing
- 🖼️ Photo gallery & delivery system
- 🔑 Authentication & authorization
- 📊 Admin dashboard
  

---

## 🛠️ Tech Stack
- **Frontend:** [Next.js (App Router)](https://nextjs.org/docs)
- **Backend:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Runtime:** [Node.js](https://nodejs.org/)

---


## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

Install client dependencies 
cd client
npm install

Install server dependencies
cd ../server
npm install

Setup client environment variables
Create a .env.local file in the client folder:

NEXT_PUBLIC_API_URL=http://localhost:5000/api

PORT=5000
MONGO_URI=mongodb://localhost:27017/photostudio
JWT_SECRET=your_jwt_secret

cd client
npm run dev

cd server
npm run dev



