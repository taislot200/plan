import React, { useState } from 'react';

interface Friend {
  id: number;
  name: string;
  status: 'pending' | 'accepted' | 'blocked';
}

export default function FriendsModule() {
  const [friends, setFriends] = useState<Friend[]>([
    { id: 1, name: 'hacker01', status: 'accepted' },
    { id: 2, name: 'hacker02', status: 'pending' },
  ]);
  const [newFriend, setNewFriend] = useState('');

  const addFriend = () => {
    if (!newFriend) return;
    setFriends([
      ...friends,
      { id: Date.now(), name: newFriend, status: 'pending' },
    ]);
    setNewFriend('');
  };

  const acceptFriend = (id: number) => {
    setFriends(friends.map(f => f.id === id ? { ...f, status: 'accepted' } : f));
  };

  const blockFriend = (id: number) => {
    setFriends(friends.map(f => f.id === id ? { ...f, status: 'blocked' } : f));
  };

  return (
    <div className="bg-black border border-green-700 rounded p-4 text-green-400 font-mono">
      <h2 className="text-xl mb-2">Friends</h2>
      <div className="mb-2 flex gap-2">
        <input
          className="flex-1 bg-black border border-green-700 p-2 text-green-400 rounded"
          value={newFriend}
          onChange={e => setNewFriend(e.target.value)}
          placeholder="Add friend by name..."
        />
        <button
          className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded text-black font-bold"
          onClick={addFriend}
        >
          Add
        </button>
      </div>
      <ul>
        {friends.map(friend => (
          <li key={friend.id} className="mb-2 flex items-center gap-2">
            <span className={friend.status === 'blocked' ? 'line-through' : ''}>{friend.name}</span>
            <span className="text-xs text-green-600">[{friend.status}]</span>
            {friend.status === 'pending' && (
              <button className="text-green-400 hover:text-green-200 text-xs" onClick={() => acceptFriend(friend.id)}>Accept</button>
            )}
            {friend.status !== 'blocked' && (
              <button className="text-red-400 hover:text-red-200 text-xs" onClick={() => blockFriend(friend.id)}>Block</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
