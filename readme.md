# 🎓 Face Recognition Attendance System  

An AI-powered real-time face recognition-based attendance system that automates student attendance tracking with high accuracy and security.  

## 🚀 Features  
- 🔐 **Secure Authentication** – Teacher/Student Login  
- 👥 **Real-time Face Recognition** – Accurate attendance marking  
- 📊 **Attendance Tracking & Reports** – Automated and organized data  
- 📱 **Responsive Dashboard** – User-friendly UI for easy monitoring  
- 📋 **Excel Report Generation** – One-click attendance export  
- 🎥 **Live Camera Feed** – Monitor real-time attendance  
- ⚡ **Real-time Updates** – Instant data synchronization  
- 🔍 **Spoof Detection** – Prevents unauthorized access  
- 📅 **Date-wise Reports** – Detailed history tracking  

---

## 🛠 Tech Stack  

### 🌐 **Frontend**  
- ⚛️ React 18  
- 🟦 TypeScript  
- 🎨 Tailwind CSS  
- 🎞️ Framer Motion  
- 🔌 Socket.io Client  
- 🔄 Axios  

### 🖥 **Backend**  
- 🟢 Node.js  
- 🚀 Express.js  
- 🍃 MongoDB  
- 📡 Socket.io  
- 🔑 JWT Authentication  
- 📜 Mongoose  

### 🤖 **AI/ML**  
- 🐍 Python  
- 🎥 OpenCV  
- 🤖 YOLO v8  
- 🔥 PyTorch  
- 👁️ Face Recognition  
- 🎯 CVZone  

---

## 📋 Prerequisites  

Ensure you have the following installed before running the project:  

🔹 **🟢 Node.js (16+)**  
🔹 **🐍 Python (3.10+)**  
🔹 **🍃 MongoDB** (Installed & running)  
🔹 **⚡ CUDA-capable GPU** (Optional, for faster AI processing)  
🔹 **🎥 Webcam** (Required for face recognition)  

---

## 📂 Installation  

### 1. Clone the Repository  
```bash
git clone https://github.com/Student-Face-Attendance/Automated_face_attendance.git
cd Automated_face_attendance
```
### 2. Install Backend Dependencies
```bash
cd server
npm install
```

### 3. Install Frontend Dependencies
```bash
cd src
npm install
```

### 4. Install Python Dependencies
```bash
cd ai
pip install -r requirements.txt
```

## 🚀Running the Application
### 🖥 Start the Frontend
```bash
npm run dev
```
### 🔧 Start the Backend
```bash
npm server/index.js
```
## 📁 Project Structure
```

├── src/                # Frontend React application
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── utils/          # Utility functions
│   └── assets/         # Static assets (images, icons, etc.)
│
├── server/             # Backend Node.js server
│   ├── controllers/    # Route controllers
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── middleware/     # Authentication & security middleware
│   └── utils/          # Helper functions
│
└── ai/                 # AI and Machine Learning scripts
    ├── models/         # Trained AI model files
    ├── scripts/        # Face recognition & anti-spoofing scripts
    └── utils/          # Supporting utilities
```
---

## 📝 Usage Guide
### 👩‍🏫 Teacher Setup
- Manually add teacher credentials to the database.
- Login with credentials.
- Add students to a class.
- Start attendance capture.
- Download attendance reports.

### 🎓 Student Registration
- Login with credentials.
- Upload face images for recognition.
- View attendance history.
---


