# 🎉 Event Management Backend

This is the **backend** for the Event Management System. It provides APIs for managing users, events, and registrations.  
Built using **Node.js, Express, and MongoDB**.

---

## 🚀 Features

- 🔑 User Authentication (JWT-based login & signup)
- 📅 Event Management (Create, update, delete, and list events)
- 📝 Event Registration & Participation
- 🛠 Role-based Access Control (Admin / User)
- 🌐 RESTful API with secure endpoints
- 📊 MongoDB as database

---

## 🛠 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB (Mongoose)** - Database
- **JWT** - Authentication
- **dotenv** - Environment configuration

---

## 📂 Project Structure

```bash
event-management-backend
├── config
│ └── db.js
├── controllers
│ ├── adminController.js
│ ├── authController.js
│ └── eventController.js
├── middleware
│ ├── auth.js
│ └── isAdmin.js
├── models
│ ├── Event.js
│ ├── Registration.js
│ └── User.js
├── node_modules
├── routes
│ ├── admin.js
│ ├── auth.js
│ └── events.js
├── .env
├── app.js
├── createAdmin.js
├── eventbackend.txt
├── package-lock.json
└── package.json

---

## ⚡ Setup & Run

1. **Clone Repository**
   ```bash
   git clone <repo-url>
   cd event-management-backend

2. **Install Dependencies**
    npm install


3. **Create .env File**
    Copy .env.example to .env
    Fill values:
    
    MONGO_URI=your_mongo_uri
    JWT_SECRET=your_secret

4. **Start MongoDB**
    mongod

5. **Run Server**
    npm run dev   # development
    npm start     # production

## 🔑 API Endpoints

    Base URL: http://localhost:5000
    # Thunder Client Collection for Event Management Backend

## 👤 Auth

    Register → POST /api/auth/register
    Login → POST /api/auth/login
    Profile → GET /api/auth/me (🔒 Auth required)

## 📅 Events

    List Events → GET /api/events (filters supported)
    Create Event → POST /api/events (🔒 Auth)
    Update Event → PUT /api/events/:id (🔒 Owner/Admin)
    Delete Event → DELETE /api/events/:id (🔒 Owner/Admin)
    Register for Event → POST /api/events/:id/register (🔒 Auth)
    Cancel Registration → POST /api/events/:id/cancel (🔒 Auth)
    My Registrations → GET /api/events/registrations/me (🔒 Auth)

## 🛠️ Admin

    Create Admin → Run node createAdmin.js
    Pending Events → GET /api/admin/pending (🔒 Admin)
    Approve Event → POST /api/admin/approve/:id (🔒 Admin)
    All Events → GET /api/admin/all (🔒 Admin)

    👉 For detailed request body examples, check eventbackend.txt.

