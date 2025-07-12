
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface Post {
  _id: string;
  title: string;
  message: string;
  timestamp: string;
  replies: Reply[];
  likes: number;
}

export interface Reply {
  _id: string;
  message: string;
  timestamp: string;
  likes: number;
}

export const postsApi = {
  // Get all posts
  getAllPosts: async (): Promise<Post[]> => {
    const response = await api.get('/posts');
    return response.data;
  },

  // Create a new post
  createPost: async (title: string, message: string): Promise<Post> => {
    const response = await api.post('/posts', { title, message });
    return response.data;
  },

  // Add a reply to a post
  addReply: async (postId: string, message: string): Promise<Post> => {
    const response = await api.post(`/posts/${postId}/replies`, { message });
    return response.data;
  },

  // Like a post
  likePost: async (postId: string): Promise<Post> => {
    const response = await api.patch(`/posts/${postId}/like`);
    return response.data;
  },

  // Like a reply
  likeReply: async (postId: string, replyId: string): Promise<Post> => {
    const response = await api.patch(`/posts/${postId}/replies/${replyId}/like`);
    return response.data;
  },
};
