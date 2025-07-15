
# ManSpace Backend

## Setup Instructions

1. Install dependencies:
```bash
cd server
npm install
```

2. Create .env file (already created with your MongoDB credentials)

3. Start the server:
```bash
npm run dev
```

The server will run on http://localhost:5000

## API Endpoints

- GET /api/posts - Get all posts
- POST /api/posts - Create a new post
- POST /api/posts/:id/replies - Add a reply to a post
- PATCH /api/posts/:id/like - Like a post
- PATCH /api/posts/:postId/replies/:replyId/like - Like a reply
