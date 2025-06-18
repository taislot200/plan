import React, { useState } from 'react';

export default function PrivacyModule() {
  const [postPrivacy, setPostPrivacy] = useState<'public' | 'friends' | 'private'>('public');
  const [profilePrivacy, setProfilePrivacy] = useState<'public' | 'friends' | 'private'>('public');

  return (
    <div className="bg-black border border-green-700 rounded p-4 text-green-400 font-mono mb-4">
      <h2 className="text-xl mb-2">Privacy Settings</h2>
      <div className="mb-2">
        <label className="block mb-1">Post Privacy:</label>
        <select
          className="bg-black border border-green-700 p-2 text-green-400 rounded w-full"
          value={postPrivacy}
          onChange={e => setPostPrivacy(e.target.value as any)}
        >
          <option value="public">Public</option>
          <option value="friends">Friends Only</option>
          <option value="private">Private</option>
        </select>
      </div>
      <div>
        <label className="block mb-1">Profile Privacy:</label>
        <select
          className="bg-black border border-green-700 p-2 text-green-400 rounded w-full"
          value={profilePrivacy}
          onChange={e => setProfilePrivacy(e.target.value as any)}
        >
          <option value="public">Public</option>
          <option value="friends">Friends Only</option>
          <option value="private">Private</option>
        </select>
      </div>
    </div>
  );
}
