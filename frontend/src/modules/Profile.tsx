import React, { useState } from 'react';

export default function ProfileModule() {
  const [name, setName] = useState('me');
  const [avatar, setAvatar] = useState<string | null>(null);

  return (
    <div className="bg-black border border-green-700 rounded p-4 text-green-400 font-mono mb-4">
      <h2 className="text-xl mb-2">Profile</h2>
      <div className="flex items-center gap-4 mb-2">
        {avatar ? (
          <img src={avatar} alt="avatar" className="w-16 h-16 rounded-full border border-green-700" />
        ) : (
          <div className="w-16 h-16 rounded-full border border-green-700 flex items-center justify-center text-2xl bg-black">?</div>
        )}
        <input
          type="file"
          accept="image/*"
          className="text-green-400"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) setAvatar(URL.createObjectURL(file));
          }}
        />
      </div>
      <input
        className="bg-black border border-green-700 p-2 text-green-400 rounded mb-2 w-full"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Display name"
      />
    </div>
  );
}
