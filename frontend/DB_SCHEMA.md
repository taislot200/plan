# WindSurf Social: Supabase/Postgres Schema (Full)

## Users
```sql
create table users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password_hash text, -- สำหรับ auth (hash)
  avatar_url text,
  created_at timestamp with time zone default now()
);
create unique index users_username_idx on users(username);
```

## Friends
```sql
create table friends (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  friend_id uuid references users(id) on delete cascade,
  status text check (status in ('pending','accepted','blocked')),
  created_at timestamp with time zone default now()
);
create index friends_user_id_idx on friends(user_id);
create index friends_friend_id_idx on friends(friend_id);
```

## Posts
```sql
create table posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  text text,
  image_url text,
  created_at timestamp with time zone default now()
);
create index posts_user_id_idx on posts(user_id);
```

## Comments
```sql
create table comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  text text,
  created_at timestamp with time zone default now()
);
create index comments_post_id_idx on comments(post_id);
create index comments_user_id_idx on comments(user_id);
```

## Likes
```sql
create table likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique (post_id, user_id)
);
create index likes_post_id_idx on likes(post_id);
create index likes_user_id_idx on likes(user_id);
```

## Messages
```sql
create table messages (
  id uuid primary key default gen_random_uuid(),
  from_id uuid references users(id) on delete cascade,
  to_id uuid references users(id) on delete cascade,
  text text,
  image_url text,
  created_at timestamp with time zone default now()
);
create index messages_from_id_idx on messages(from_id);
create index messages_to_id_idx on messages(to_id);
```

## Loans
```sql
create table loans (
  id uuid primary key default gen_random_uuid(),
  from_id uuid references users(id) on delete cascade,
  to_id uuid references users(id) on delete cascade,
  amount numeric,
  status text check (status in ('pending','approved','repaid','expired')),
  created_at timestamp with time zone default now()
);
create index loans_from_id_idx on loans(from_id);
create index loans_to_id_idx on loans(to_id);
```

## Notifications
```sql
create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  type text,
  message text,
  read boolean default false,
  created_at timestamp with time zone default now()
);
create index notifications_user_id_idx on notifications(user_id);
```

## Privacy
```sql
create table privacy (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  post_privacy text check (post_privacy in ('public','friends','private')) default 'public',
  profile_privacy text check (profile_privacy in ('public','friends','private')) default 'public',
  created_at timestamp with time zone default now()
);
create unique index privacy_user_id_idx on privacy(user_id);
```

-- หมายเหตุ: สามารถเพิ่ม RLS policies, triggers, views ได้ตามต้องการ
