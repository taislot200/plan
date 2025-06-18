import React, { useState } from "react";
import Image from "next/image";
import ProfileModule from "../src/modules/Profile";
import FriendsModule from "../src/modules/Friends";
import PostFeed from "../src/modules/PostFeed";
import ChatModule from "../src/modules/Chat";
import LoanModule from "../src/modules/Loan";
import NotificationsModule from "../src/modules/Notifications";
import PrivacyModule from "../src/modules/Privacy";

export default function Home() {
  const [posts, setPosts] = useState([
    { id: 1, user: "hacker01", text: "Hello, world!", image: null, comments: [] },
  ]);
  const [newPost, setNewPost] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

  const handlePost = () => {
    if (!newPost && !newImage) return;
    setPosts([
      {
        id: Date.now(),
        user: "me",
        text: newPost,
        image: newImage ? URL.createObjectURL(newImage) : null,
        comments: [],
      },
      ...posts,
    ]);
    setNewPost("");
    setNewImage(null);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4 flex flex-col md:flex-row gap-8">
      <div className="flex-1 flex flex-col gap-4">
        <ProfileModule />
        <PrivacyModule />
        <FriendsModule />
        <div>
          <h1 className="text-3xl mb-4 border-b border-green-700 pb-2">
            Hacker Social Feed
          </h1>
          <div className="mb-6">
            <textarea
              className="w-full bg-black border border-green-700 p-2 mb-2 text-green-400 resize-none focus:outline-none focus:border-green-400"
              rows={2}
              placeholder="What's on your mind?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              className="mb-2 block text-green-400"
              onChange={(e) => setNewImage(e.target.files?.[0] || null)}
            />
            <button
              className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded text-black font-bold"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
          <div>
            {posts.map((post) => (
              <div
                key={post.id}
                className="mb-6 p-4 border border-green-700 rounded bg-black/80"
              >
                <div className="font-bold">{post.user}</div>
                <div className="mb-2 whitespace-pre-line">{post.text}</div>
                {post.image && (
                  <img
                    src={post.image}
                    alt="post"
                    className="max-w-xs border border-green-700 mb-2"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full md:w-[400px] flex flex-col gap-4">
        <NotificationsModule />
        <ChatModule />
        <LoanModule />
      </div>
    </div>
  );
}
