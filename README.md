# 📝 Blog Website — MERN Stack

A **full-stack blog platform** built using the **MERN stack (MongoDB, Express.js, React, Node.js)**.  
This project allows users to **read, search, and comment on blogs**, while an **admin panel** manages posts and comment approvals — demonstrating complete CRUD, authentication, and deployment skills.

🚀 **Live Demo:** [https://blog-website-peach-nine.vercel.app/](https://blog-website-peach-nine.vercel.app/)  
🧠 **Tech Stack:** MongoDB, Express.js, React, Node.js, Vercel, Render (Backend)

---

## 📚 Features

### 👥 User Side
- 🔍 **Search Blogs** — Find blogs instantly by title or keywords.
- 💬 **Comment Section** — Each blog has its own comment thread.
- 📰 **Read Blogs** — Clean and responsive layout for reading.
- ⚡ **Fast & Responsive** — Built with React and optimized for mobile devices.

### 🔑 Admin Panel
- 🧩 **Add / Edit / Delete Blogs** — Complete blog management system.
- ✅ **Approve / Disapprove Comments** — Control user comments for moderation.
- 📊 **Dashboard Overview** — Manage content from a centralized admin interface.
- 🛡️ **Role-Based Access** — Only admins can access restricted routes.

---

## 🏗️ Project Architecture

**Frontend:**  
- React.js with React Router for navigation  
- Axios for API calls  
- State management using React hooks and Context API  
- Styled for a clean and modern UI  

**Backend:**  
- Node.js + Express.js REST API  
- MongoDB for data persistence  
- JWT Authentication for secure access  
- Middleware for authorization and error handling  
- Environment variables for config security  

**Deployment:**  
- **Frontend:** Deployed on Vercel  
- **Backend:** Hosted on Render  
- Environment variables managed through `.env`  

---

## ⚙️ Installation & Setup

To run this project locally:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/yourusername/blog-website.git
cd blog-website

# 2️⃣ Install dependencies for both frontend and backend
cd backend
npm install
cd ../frontend
npm install

# 3️⃣ Create a .env file in backend with the following:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_URL=optional_if_using_images

# 4️⃣ Run backend
cd backend
npm run dev

# 5️⃣ Run frontend
cd ../frontend
npm start
