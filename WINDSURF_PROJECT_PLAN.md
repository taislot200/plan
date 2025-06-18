# 🧠 WindSuf Agent Project Plan

## 🎯 Project Goal
Build a fully functional social networking application (web-first, mobile-adaptable) with standard features inspired by LINE and Facebook. The app must support:
- Real-time chat (1-on-1 + group-ready)
- Post creation (text, image, future: video)
- Comment & like system
- Friend request / follow system
- Post editing/deletion
- Internal credit & loan module (extendable)
- Privacy & security settings
- Realtime notifications

## 🔧 Development Phases

### Phase 1: Foundation Setup
- [ ] Initialize project repo (Node.js + Express + React or Next.js)
- [ ] Install dependencies (Supabase SDK, Socket.IO, Zustand/Redux, Tailwind CSS)
- [ ] Set up Supabase schema for users, friends, posts, comments, likes, messages, loans

### Phase 2: Core Social Features
- [ ] 🧍 User Auth & Profile (Sign up, Login, Edit Profile, Avatar Upload)
- [ ] 🤝 Friend System (Request, Accept, Remove, Block, List)
- [ ] 📝 Post System (Create/Edit/Delete Post with Image Upload)
- [ ] 💬 Comment + Like System (Threaded Comments, Like/Unlike logic)

### Phase 3: Chat Module
- [ ] Real-time 1-on-1 Chat (Socket.IO / Supabase real-time)
- [ ] Chat UI (message bubble, typing indicator)
- [ ] Save message history
- [ ] Seen & timestamp status

### Phase 4: Credit + Loan Module
- [ ] Credit Wallet system for users (top-up, transfer)
- [ ] Credit Loan Request (user-to-user lending)
- [ ] Loan records & status (approved, repaid, expired)
- [ ] Interest calculation per hour
- [ ] Admin dashboard for loan approval & system stats

### Phase 5: Notification & Privacy
- [ ] In-app notifications (friend request, likes, comments)
- [ ] Push notification support (browser/mobile-ready)
- [ ] Privacy setting for posts, profile, comments
- [ ] Delete history, block users, report system

## ⚙️ Tools / Tech Stack
- Frontend: React or Next.js + Tailwind CSS
- Backend: Node.js + Express + Socket.IO
- Database: Supabase (PostgreSQL) with Row Level Security (RLS)
- Realtime: Supabase Realtime or Socket.IO
- Storage: Supabase Storage for media (avatars, post images)
- CI/CD: GitHub Actions + Vercel Deployment

## 📁 Directory Overview
```
/src
  /components
    /pages
      /services
        /contexts
          /modules (Chat, Posts, Friends, Loans, etc.)
          README.md
          .env.example
          supabase.sql (for schema init)
          ```

          ## 📄 Documentation & Auto-update
          Agent must:
          - Automatically update README and API docs after each module
          - Maintain task checklist as part of planning file
          - Generate system contract + DB schema for each module
          