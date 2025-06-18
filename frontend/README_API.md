# WindSurf Social API Plan

## Endpoints (to implement in backend)

### Auth
- POST /api/auth/signup
- POST /api/auth/login
- POST /api/auth/logout

### Users
- GET /api/users/me
- PATCH /api/users/me (edit profile)
- GET /api/users/:id

### Friends
- GET /api/friends
- POST /api/friends/request
- POST /api/friends/accept
- POST /api/friends/block

### Posts
- GET /api/posts
- POST /api/posts
- PATCH /api/posts/:id
- DELETE /api/posts/:id

### Comments
- POST /api/posts/:id/comments
- DELETE /api/comments/:id

### Likes
- POST /api/posts/:id/like
- POST /api/posts/:id/unlike

### Chat
- GET /api/messages?userId=xxx
- POST /api/messages

### Loans
- GET /api/loans
- POST /api/loans/request
- POST /api/loans/approve
- POST /api/loans/repay

### Notifications
- GET /api/notifications
- POST /api/notifications/read

### Privacy
- GET /api/privacy
- PATCH /api/privacy

---

> See supabase.sql for DB schema. Update this file as backend is implemented.
