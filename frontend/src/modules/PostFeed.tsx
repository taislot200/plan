import React, { useState } from 'react';

interface Post {
  id: number;
  user: string;
  text: string;
  image: string | null;
  comments: { user: string; text: string }[];
  likes: number;
}

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, user: 'hacker01', text: 'Hello, world!', image: null, comments: [], likes: 0 },
  ]);
  const [newPost, setNewPost] = useState('');
  const [newImage, setNewImage] = useState<File | null>(null);
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});

  const handlePost = () => {
    if (!newPost && !newImage) return;
    setPosts([
      {
        id: Date.now(),
        user: 'me',
        text: newPost,
        image: newImage ? URL.createObjectURL(newImage) : null,
        comments: [],
        likes: 0,
      },
      ...posts,
    ]);
    setNewPost('');
    setNewImage(null);
  };

  const handleLike = (id: number) => {
    setPosts(posts.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post));
  };

  const handleComment = (id: number) => {
    if (!commentInputs[id]) return;
    setPosts(posts.map(post =>
      post.id === id
        ? { ...post, comments: [...post.comments, { user: 'me', text: commentInputs[id] }] }
        : post
    ));
    setCommentInputs({ ...commentInputs, [id]: '' });
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <h1 className="text-3xl mb-4 border-b border-green-700 pb-2">Hacker Social Feed</h1>
      <div className="mb-6">
        <textarea
          className="w-full bg-black border border-green-700 p-2 mb-2 text-green-400 resize-none focus:outline-none focus:border-green-400"
          rows={2}
          placeholder="What's on your mind?"
          value={newPost}
          onChange={e => setNewPost(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          className="mb-2 block text-green-400"
          onChange={e => setNewImage(e.target.files?.[0] || null)}
        />
        <button
          className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded text-black font-bold"
          onClick={handlePost}
        >
          Post
        </button>
      </div>
      <div>
        {posts.map(post => (
          <div key={post.id} className="mb-6 p-4 border border-green-700 rounded bg-black/80">
            <div className="font-bold">{post.user}</div>
            <div className="mb-2 whitespace-pre-line">{post.text}</div>
            {post.image && (
              <img src={post.image} alt="post" className="max-w-xs border border-green-700 mb-2" />
            )}
            <div className="flex gap-4 items-center mt-2">
              <button
                className="text-green-400 hover:text-green-200 font-bold"
                onClick={() => handleLike(post.id)}
              >
                ♥ {post.likes}
              </button>
              <span className="text-xs text-green-600">{post.comments.length} comments</span>
            </div>
            <div className="mt-2">
              {post.comments.map((c, i) => (
                <div key={i} className="text-xs mb-1"><span className="font-bold">{c.user}</span>: {c.text}</div>
              ))}
              <div className="flex gap-2 mt-1">
                <input
                  className="flex-1 bg-black border border-green-700 p-1 text-green-400 text-xs rounded"
                  value={commentInputs[post.id] || ''}
                  onChange={e => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                  onKeyDown={e => e.key === 'Enter' && handleComment(post.id)}
                  placeholder="Add comment..."
                />
                <button
                  className="bg-green-700 hover:bg-green-600 px-2 py-1 rounded text-black text-xs font-bold"
                  onClick={() => handleComment(post.id)}
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
