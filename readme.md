# Face Recognition Attendance System

A real-time face recognition-based attendance system that uses AI to detect and mark student attendance automatically.

## Features

- 🔐 Secure Authentication (Teacher/Student Login)
- 👥 Real-time Face Recognition
- 📊 Attendance Tracking & Reports
- 📱 Responsive Dashboard
- 📋 Excel Report Generation
- 🎥 Live Camera Feed
- ⚡ Real-time Updates
- 🔍 Spoof Detection
- 📅 Date-wise Reports

## Tech Stack

### Frontend

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Socket.io Client
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Socket.io
- JWT Authentication
- Mongoose

### AI/ML

- Python
- OpenCV
- YOLO v8
- PyTorch
- Face Recognition
- CVZone

## Prerequisites

- Node.js 16+
- Python 3.10+
- MongoDB
- CUDA-capable GPU (Optional, for faster processing)
- Webcam

## Installation

1. Clone the repository

```bash
git clone https://github.com/Student-Face-Attendance/Automated_face_attendance.git
cd Automated_face_attendance


2. Install Backend Dependencies
cd server
npm install

3. Install Frontend Dependencies
cd src
npm install

4. Install Python Dependencies
cd ai
pip install -r requirements.txt

## Running the Application
npm run dev
npm server/index.js

├──  src/                # Frontend React application
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── utils/        # Utility functions
├── server/                # Backend Node.js server
│   ├── controllers/      # Route controllers
│   ├── models/          # MongoDB models
│   ├── routes/         # API routes
│   └── utils/         # Utility functions
└── ai/                # Python AI scripts
    ├── models/       # AI model files
    └── utils/       # Python utilities


## Add maually teacher's credentials in the database
Login with credentials
Add students to class
Start attendance capture
Download attendance reports
Student Registration

Login with credentials
Upload face images
View attendance history


Taking Attendance
Click "Start Attendance"
System detects faces in real-time
Marks present/absent automatically
Download reports by date
```
