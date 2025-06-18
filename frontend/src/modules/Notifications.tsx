import React, { useState } from 'react';

interface Notification {
  id: number;
  type: 'friend' | 'like' | 'comment' | 'loan';
  message: string;
  read: boolean;
}

export default function NotificationsModule() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: 'friend', message: 'hacker02 sent you a friend request', read: false },
    { id: 2, type: 'like', message: 'hacker01 liked your post', read: false },
  ]);

  const markRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="bg-black border border-green-700 rounded p-4 text-green-400 font-mono mb-4">
      <h2 className="text-xl mb-2">Notifications</h2>
      <ul>
        {notifications.map(n => (
          <li key={n.id} className={`mb-2 flex items-center gap-2 ${n.read ? 'opacity-50' : ''}`}>
            <span>{n.message}</span>
            {!n.read && (
              <button className="text-green-400 hover:text-green-200 text-xs" onClick={() => markRead(n.id)}>Mark as read</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
