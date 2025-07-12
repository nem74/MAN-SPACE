
# ManSpace - Full Stack Deployment Guide

ManSpace is an anonymous support platform for men built with the MERN stack.

## Project Structure

```
manspace/
├── src/                    # React frontend
├── server/                 # Express.js backend
├── package.json           # Frontend dependencies
└── server/package.json    # Backend dependencies
```

## Backend Setup

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Environment Configuration
Create a `.env` file in the `server/` directory:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### 3. Start Backend Server
```bash
# Development
npm run dev

# Production
npm start
```

## Frontend Setup

### 1. Environment Configuration
Create a `.env` file in the root directory:
```
VITE_API_URL=http://localhost:5000/api
```

For production, update this to your deployed backend URL.

### 2. The frontend is already configured in this Lovable project

## Deployment

### Backend Deployment (Render)

1. **Create a new Web Service on Render**
2. **Connect your GitHub repository**
3. **Configure build settings:**
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
   - Root Directory: Leave empty
4. **Add environment variables:**
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: 5000 (or leave empty for Render default)

### Frontend Deployment (Vercel)

1. **Connect your GitHub repository to Vercel**
2. **Configure build settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Add environment variables:**
   - `VITE_API_URL`: Your deployed backend URL (e.g., `https://your-app.onrender.com/api`)

### MongoDB Setup

1. **Create a MongoDB Atlas account**
2. **Create a new cluster**
3. **Create a database user**
4. **Whitelist IP addresses (0.0.0.0/0 for all)**
5. **Get connection string and add to backend environment variables**

## API Endpoints

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `PATCH /api/posts/:id/like` - Like a post

### Replies
- `POST /api/posts/:id/replies` - Add reply to post
- `PATCH /api/posts/:postId/replies/:replyId/like` - Like a reply

## Features

- Anonymous post creation
- Real-time post feed
- Reply system with nested comments
- Like system for posts and replies
- Responsive design
- MongoDB data persistence
- RESTful API architecture

## Tech Stack

**Frontend:**
- React 18
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- Axios for API calls

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled
- Environment configuration

## Development

1. Start MongoDB (if running locally)
2. Start backend server: `cd server && npm run dev`
3. Start frontend: `npm run dev`
4. Visit `http://localhost:5173`

The application will automatically connect to your backend API and MongoDB database.
