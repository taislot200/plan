require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

// In-memory mock data for MVP
let posts = [];
let messages = [];
let users = [{ id: 1, username: 'hacker01', avatar: null, privacy: { post: 'public', profile: 'public' } }];
let friends = [];
let loans = [];
let notifications = [];

// --- Auth ---
app.post('/api/auth/signup', (req, res) => {
  const { username } = req.body;
  if (users.find(u => u.username === username)) return res.status(400).json({ error: 'User exists' });
  const user = { id: Date.now(), username, avatar: null, privacy: { post: 'public', profile: 'public' } };
  users.push(user);
  res.json(user);
});
app.post('/api/auth/login', (req, res) => {
  const { username } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});
app.post('/api/auth/logout', (req, res) => res.json({ ok: true }));

// --- Users ---
app.get('/api/users/me', (req, res) => res.json(users[0]));
app.patch('/api/users/me', (req, res) => {
  Object.assign(users[0], req.body);
  res.json(users[0]);
});
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// --- Friends ---
app.get('/api/friends', (req, res) => res.json(friends));
app.post('/api/friends/request', (req, res) => {
  const { to } = req.body;
  friends.push({ id: Date.now(), from: users[0].id, to, status: 'pending' });
  notifications.push({ id: Date.now(), type: 'friend', message: `${users[0].username} sent you a friend request`, read: false });
  res.json({ ok: true });
});
app.post('/api/friends/accept', (req, res) => {
  const { id } = req.body;
  const f = friends.find(f => f.id == id);
  if (f) f.status = 'accepted';
  res.json({ ok: true });
});
app.post('/api/friends/block', (req, res) => {
  const { id } = req.body;
  const f = friends.find(f => f.id == id);
  if (f) f.status = 'blocked';
  res.json({ ok: true });
});

// --- Posts ---
app.get('/api/posts', (req, res) => res.json(posts));
app.post('/api/posts', (req, res) => {
  const { user, text, image } = req.body;
  const post = { id: Date.now(), user, text, image, comments: [], likes: 0 };
  posts.unshift(post);
  res.json(post);
});
app.patch('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  Object.assign(post, req.body);
  res.json(post);
});
app.delete('/api/posts/:id', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.json({ ok: true });
});

// --- Comments ---
app.post('/api/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const { user, text } = req.body;
  const post = posts.find(p => p.id == id);
  if (post) {
    post.comments.push({ user, text });
    notifications.push({ id: Date.now(), type: 'comment', message: `${user} commented on your post`, read: false });
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});
app.delete('/api/comments/:id', (req, res) => {
  for (const post of posts) {
    post.comments = post.comments.filter(c => c.id != req.params.id);
  }
  res.json({ ok: true });
});

// --- Likes ---
app.post('/api/posts/:id/like', (req, res) => {
  const { id } = req.params;
  const post = posts.find(p => p.id == id);
  if (post) {
    post.likes++;
    notifications.push({ id: Date.now(), type: 'like', message: `Someone liked your post`, read: false });
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});
app.post('/api/posts/:id/unlike', (req, res) => {
  const { id } = req.params;
  const post = posts.find(p => p.id == id);
  if (post && post.likes > 0) post.likes--;
  res.json(post);
});

// --- Chat (Socket.IO) ---
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    messages.push(msg);
    io.emit('chat message', msg);
  });
});
app.get('/api/messages', (req, res) => res.json(messages));
app.post('/api/messages', (req, res) => {
  const msg = req.body;
  messages.push(msg);
  io.emit('chat message', msg);
  res.json(msg);
});

// --- Loans ---
app.get('/api/loans', (req, res) => res.json(loans));
app.post('/api/loans/request', (req, res) => {
  const { to, amount } = req.body;
  const loan = { id: Date.now(), from: users[0].id, to, amount, status: 'pending' };
  loans.push(loan);
  notifications.push({ id: Date.now(), type: 'loan', message: `Loan request sent`, read: false });
  res.json(loan);
});
app.post('/api/loans/approve', (req, res) => {
  const { id } = req.body;
  const loan = loans.find(l => l.id == id);
  if (loan) loan.status = 'approved';
  res.json({ ok: true });
});
app.post('/api/loans/repay', (req, res) => {
  const { id } = req.body;
  const loan = loans.find(l => l.id == id);
  if (loan) loan.status = 'repaid';
  res.json({ ok: true });
});

// --- Notifications ---
app.get('/api/notifications', (req, res) => res.json(notifications));
app.post('/api/notifications/read', (req, res) => {
  notifications.forEach(n => n.read = true);
  res.json({ ok: true });
});

// --- Privacy ---
app.get('/api/privacy', (req, res) => res.json(users[0].privacy));
app.patch('/api/privacy', (req, res) => {
  Object.assign(users[0].privacy, req.body);
  res.json(users[0].privacy);
});

// --- Start Server ---
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
