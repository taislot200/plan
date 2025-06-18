import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const api = {
  // --- Auth ---
  signup: async (username: string) => (await axios.post(`${API_URL}/auth/signup`, { username })).data,
  login: async (username: string) => (await axios.post(`${API_URL}/auth/login`, { username })).data,
  logout: async () => (await axios.post(`${API_URL}/auth/logout`)).data,

  // --- Users ---
  getMe: async () => (await axios.get(`${API_URL}/users/me`)).data,
  updateMe: async (data: any) => (await axios.patch(`${API_URL}/users/me`, data)).data,
  getUser: async (id: number) => (await axios.get(`${API_URL}/users/${id}`)).data,

  // --- Friends ---
  getFriends: async () => (await axios.get(`${API_URL}/friends`)).data,
  requestFriend: async (to: number) => (await axios.post(`${API_URL}/friends/request`, { to })).data,
  acceptFriend: async (id: number) => (await axios.post(`${API_URL}/friends/accept`, { id })).data,
  blockFriend: async (id: number) => (await axios.post(`${API_URL}/friends/block`, { id })).data,

  // --- Posts ---
  getPosts: async () => (await axios.get(`${API_URL}/posts`)).data,
  createPost: async (post: any) => (await axios.post(`${API_URL}/posts`, post)).data,
  updatePost: async (id: number, data: any) => (await axios.patch(`${API_URL}/posts/${id}`, data)).data,
  deletePost: async (id: number) => (await axios.delete(`${API_URL}/posts/${id}`)).data,

  // --- Comments ---
  commentPost: async (id: number, comment: any) => (await axios.post(`${API_URL}/posts/${id}/comments`, comment)).data,
  deleteComment: async (id: number) => (await axios.delete(`${API_URL}/comments/${id}`)).data,

  // --- Likes ---
  likePost: async (id: number) => (await axios.post(`${API_URL}/posts/${id}/like`)).data,
  unlikePost: async (id: number) => (await axios.post(`${API_URL}/posts/${id}/unlike`)).data,

  // --- Chat ---
  getMessages: async () => (await axios.get(`${API_URL}/messages`)).data,
  sendMessage: async (msg: any) => (await axios.post(`${API_URL}/messages`, msg)).data,

  // --- Loans ---
  getLoans: async () => (await axios.get(`${API_URL}/loans`)).data,
  requestLoan: async (to: number, amount: number) => (await axios.post(`${API_URL}/loans/request`, { to, amount })).data,
  approveLoan: async (id: number) => (await axios.post(`${API_URL}/loans/approve`, { id })).data,
  repayLoan: async (id: number) => (await axios.post(`${API_URL}/loans/repay`, { id })).data,

  // --- Notifications ---
  getNotifications: async () => (await axios.get(`${API_URL}/notifications`)).data,
  readNotifications: async () => (await axios.post(`${API_URL}/notifications/read`)).data,

  // --- Privacy ---
  getPrivacy: async () => (await axios.get(`${API_URL}/privacy`)).data,
  updatePrivacy: async (data: any) => (await axios.patch(`${API_URL}/privacy`, data)).data,
};
