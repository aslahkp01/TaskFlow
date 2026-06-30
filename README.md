# TaskFlow

![TaskFlow Header](https://github.com/user-attachments/assets/bf0c00cc-9f79-4112-b52d-ac8c9a946638)
)

TaskFlow is a modern, responsive, and beautifully designed task management application built with the MERN stack. It acts as an extension of your mind, allowing you to capture, organize, and manage tasks instantly using a simple and flowing interface.

## 🚀 Features

- **Robust Authentication**: Secure login and registration with hashed passwords and JWT. Includes an optional One-Time Password (OTP) email verification flow.
- **Task Management**: Full CRUD operations for tasks (Create, Read, Update, Delete).
- **Beautiful UI/UX**: Custom-built, premium interface using modern CSS tokens, dynamic animations, and dark/light mode toggles.
- **Redux State Management**: Centralized application state for seamless and predictable data flow.
- **Responsive Design**: Flawlessly adapts to desktop, tablet, and mobile screens.
- **Custom Filters & Sorting**: Dynamically filter tasks by completion status and prioritize them (High, Medium, Low).

## 📸 Screenshots

### Landing Page
![Landing Page Screenshot](https://github.com/user-attachments/assets/157a8777-9113-4199-8a62-4359dbfd4082)

### User Dashboard
![Dashboard Screenshot](https://github.com/user-attachments/assets/137af889-2be3-427e-9c3a-e091111c65ca)

### Task Creation & Prioritization
![Task Form Screenshot](https://github.com/user-attachments/assets/e233a5fe-49ed-480d-8808-e4f596dd8c10)

### Onboarding Flow
![Onboarding Screenshot](https://github.com/user-attachments/assets/8ee4f1e2-acfb-4e8b-bcbe-1b2d25489f88)

## 🛠️ Technology Stack

**Frontend:**
- React (with Vite)
- Redux Toolkit (State Management)
- React Router DOM (Navigation)
- Axios (HTTP Requests)
- Lucide React (Icons)
- Vanilla CSS (Custom Design System)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing
- Nodemailer for OTP email verification

## 💻 Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow
```

### 2. Setup the Backend
Open a terminal and navigate to the backend directory:
```bash
cd taskflow-backend
npm install
```

Create a `.env` file in the `taskflow-backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
ENABLE_OTP=true # Set to true to enable email OTP verification locally
```

Start the backend server:
```bash
npm run dev
```

### 3. Setup the Frontend
Open a new terminal and navigate to the frontend directory:
```bash
cd taskflow-frontend
npm install
```

Create a `.env` file in the `taskflow-frontend` directory with the following variables:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```

## 🌐 Deployment
- **Frontend**: Designed to be easily deployed on [Vercel](https://vercel.com/) or Netlify.
- **Backend**: Can be deployed on [Render](https://render.com/) or Heroku.
*(Note: If deploying to a free-tier service like Render that blocks SMTP ports, omit the `ENABLE_OTP` variable to allow standard password signups without email verification).*

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
