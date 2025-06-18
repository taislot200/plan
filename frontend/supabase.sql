-- Supabase schema for WindSurf Social

-- Users
create table users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  avatar_url text,
  created_at timestamp with time zone default now()
);

-- Friends
create table friends (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  friend_id uuid references users(id),
  status text check (status in ('pending','accepted','blocked')),
  created_at timestamp with time zone default now()
);

-- Posts
create table posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  text text,
  image_url text,
  created_at timestamp with time zone default now()
);

-- Comments
create table comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id),
  user_id uuid references users(id),
  text text,
  created_at timestamp with time zone default now()
);

-- Likes
create table likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id),
  user_id uuid references users(id),
  created_at timestamp with time zone default now()
);

-- Messages
create table messages (
  id uuid primary key default gen_random_uuid(),
  from_id uuid references users(id),
  to_id uuid references users(id),
  text text,
  image_url text,
  created_at timestamp with time zone default now()
);

-- Loans
create table loans (
  id uuid primary key default gen_random_uuid(),
  from_id uuid references users(id),
  to_id uuid references users(id),
  amount numeric,
  status text check (status in ('pending','approved','repaid','expired')),
  created_at timestamp with time zone default now()
);
