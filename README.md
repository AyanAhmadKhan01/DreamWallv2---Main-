# 🌟 DreamWall V2 - Wallpaper Sharing Platform

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16%2B-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0%2B-green.svg)](https://mongodb.com/)

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Data Flow Diagrams](#data-flow-diagrams)
- [Entity Relationship Diagram](#entity-relationship-diagram)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)

## 🎯 Overview

DreamWall V2 is a modern wallpaper sharing platform built with React.js and Node.js. Users can upload, discover, and share high-quality wallpapers with real-time analytics and social features.

## 👥 Contributors

| Name            | Contributions                                                                 |
|-----------------|--------------------------------------------------------------------------------|
| **Anas Najam**  | Built the **entire backend**, managed **API development**, created project **documentation**, and implemented the **Community section** (likes, comments, interactions). |
| **Ayan Ahmad Khan** | Designed the **Frontend UI**, handled **Authentication**, **Landing Page**, **SEO**, and took care of **Deployment**. |

**Live Demo**: [https://dreamwallv2.vercel.app](https://dreamwallv2.vercel.app)

## ✨ Features

- 🔐 JWT Authentication with secure cookies
- 📤 Image upload via Cloudinary
- 🔍 Real-time search and filtering
- 📊 User analytics dashboard
- 💬 Comments and likes system
- ♾️ Infinite scroll pagination
- 📱 Mobile responsive design

## 🛠️ Tech Stack

**Frontend**: React 18, React Router, Axios, CSS3  
**Backend**: Node.js, Express.js, MongoDB, Mongoose  
**Storage**: Cloudinary (images), JWT (auth)  
**Security**: Bcrypt, CORS, Rate Limiting

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   FRONTEND      │    │    BACKEND      │    │   DATABASE      │
│   (React.js)    │    │   (Express.js)  │    │   (MongoDB)     │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • Components    │◄──►│ • Authentication│◄──►│ • Users         │
│ • Pages         │    │ • File Upload   │    │ • Wallpapers    │
│ • Routing       │    │ • API Routes    │    │ • Comments      │
│ • State Mgmt    │    │ • Middleware    │    │ • Analytics     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                ▲
                                │
                       ┌─────────────────┐
                       │   CLOUDINARY    │
                       │ (Image Storage) │
                       └─────────────────┘
```

## 📊 Data Flow Diagrams

### 1. User Authentication Flow
```
[User] ──login──► [Frontend] ──POST /api/login──► [Backend]
   ▲                                                  │
   │                                                  ▼
   └──dashboard──── [Set Cookie] ◄──JWT Token──── [Database]
```

### 2. Wallpaper Upload Flow
```
[User] ──select file──► [Frontend] ──FormData──► [Backend]
                                                     │
                                                     ▼
[Success] ◄──response──── [Save to DB] ◄──URL──── [Cloudinary]
```

### 3. Content Discovery Flow
```
[User] ──search/filter──► [Frontend] ──GET /api/wallpapers──► [Backend]
   ▲                                                              │
   │                                                              ▼
   └──display results──────────────── [JSON Response] ◄────── [Database]
```

### 4. Analytics Update Flow
```
[User Action] ──like/download──► [Frontend] ──POST /api/update──► [Backend]
                                                                     │
                                                                     ▼
                                                                [Analytics DB]
```

## 🗄️ Entity Relationship Diagram

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│     USERS       │         │   WALLPAPERS    │         │    COMMENTS     │
├─────────────────┤         ├─────────────────┤         ├─────────────────┤
│ _id (PK)        │◄────────│ uploaderName(FK)│         │ _id (PK)        │
│ username (UK)   │         │ _id (PK)        │◄────────│ wallpaperId(FK) │
│ email (UK)      │         │ wallpaperName   │         │ username (FK)   │
│ password        │         │ imgLink         │         │ commentText     │
│ profileUrl (UK) │         │ linkCopy (UK)   │         │ commentDate     │
│ profileImg      │         │ genre           │         └─────────────────┘
│ createdAt       │         │ resolution      │
└─────────────────┘         │ likes           │         ┌─────────────────┐
         │                  │ downloads       │         │   LEADERBOARD   │
         │                  │ uploadDate      │         ├─────────────────┤
         │                  │ likedBy[]       │         │ _id (PK)        │
         │                  └─────────────────┘         │ username (FK)   │
         │                                              │ totalUploads    │
         │                  ┌─────────────────┐         │ totalLikes      │
         └──────────────────►│   ANALYTICS     │         │ totalDownloads  │
                            ├─────────────────┤         └─────────────────┘
                            │ _id (username)  │
                            │ totalDownloads  │
                            │ totalLikes      │
                            │ totalUploads    │
                            └─────────────────┘

Relationships:
• USERS (1) ──uploads──► (M) WALLPAPERS
• USERS (1) ──writes───► (M) COMMENTS  
• WALLPAPERS (1) ──has──► (M) COMMENTS
• USERS (1) ──has─────► (1) ANALYTICS
• USERS (1) ──appears──► (1) LEADERBOARD
• USERS (M) ──likes───► (M) WALLPAPERS
```

## 📦 Installation

### Prerequisites
- Node.js 16+
- MongoDB 6.0+
- Cloudinary account

### Setup

```bash
# Clone repository
git clone <repository-url>
cd dreamwall-v2

# Backend setup
cd server
npm install
cp .env.example .env  # Configure your environment variables
npm start

# Frontend setup
cd ../dreamwallv2
npm install
cp .env.example .env  # Configure API endpoints
npm start
```

### Environment Variables

**Backend (.env)**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dreamwall
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Frontend (.env)**
```env
REACT_APP_USER_DATA=http://localhost:5000/api/user-data
REACT_APP_WALLPAPER_DISPLAY=http://localhost:5000/api/wallpaper-display
REACT_APP_UPLOAD_WALLPAPER=http://localhost:5000/api/upload-wallpaper
REACT_APP_ANALYTICS_DATA=http://localhost:5000/api/analytics-data
REACT_APP_PROFILE_DATA=http://localhost:5000/api/profile-data
REACT_APP_DELETE_WALLPAPER=http://localhost:5000/api/delete-wallpaper
REACT_APP_LOG_OUT=http://localhost:5000/api/logout
```

## 🔌 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login  
- `POST /api/logout` - User logout
- `GET /api/user-data` - Get current user (Auth required)

### Wallpapers
- `GET /api/wallpaper-display` - Get all wallpapers
- `POST /api/upload-wallpaper` - Upload wallpaper (Auth required)
- `DELETE /api/delete-wallpaper` - Delete wallpaper (Auth required)
- `POST /api/download/:id` - Track download
- `POST /api/like/:id` - Like wallpaper (Auth required)

### Analytics
- `GET /api/analytics-data` - Get user stats (Auth required)
- `GET /api/leaderboard` - Get top users
- `GET /api/profile-data` - Get profile info

## 💾 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: "john_doe",
  email: "john@example.com", 
  password: "$2b$10$hashed_password",
  profileUrl: "john-doe-12345",
  profileImg: "https://cloudinary.com/profile.jpg",
  createdAt: ISODate,
  updatedAt: ISODate
}
```

### Wallpapers Collection
```javascript
{
  _id: ObjectId,
  wallpaperName: "Mountain View",
  imgLink: "https://cloudinary.com/image.jpg",
  genre: "Nature",
  resolution: "1920x1080", 
  uploaderName: "john_doe",
  linkCopy: "mountain-view-12345",
  tags: ["mountain", "nature"],
  deviceTags: "PC",
  likes: 42,
  downloads: 156,
  uploadDate: ISODate,
  likedBy: ["user1", "user2"]
}
```

### Comments Collection
```javascript
{
  _id: ObjectId,
  wallpaperId: ObjectId,
  username: "john_doe",
  commentText: "Amazing wallpaper!",
  commentDate: ISODate,
  profileImg: "https://cloudinary.com/profile.jpg"
}
```

---

**Built with ❤️ using React.js and Node.js**
