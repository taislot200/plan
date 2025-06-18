import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  user: string;
  text: string;
  time: string;
  image?: string | null;
}

export default function ChatModule() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, user: 'hacker01', text: 'Welcome to Hacker Chat!', time: new Date().toLocaleTimeString() },
  ]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input && !image) return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        user: 'me',
        text: input,
        time: new Date().toLocaleTimeString(),
        image: image ? URL.createObjectURL(image) : null,
      },
    ]);
    setInput('');
    setImage(null);
  };

  return (
    <div className="bg-black border border-green-700 rounded p-4 max-w-md mx-auto text-green-400 font-mono">
      <div className="h-64 overflow-y-auto mb-2 bg-black/80 p-2 border border-green-700 rounded">
        {messages.map(msg => (
          <div key={msg.id} className={msg.user === 'me' ? 'text-right' : 'text-left'}>
            <span className="font-bold">{msg.user}</span>: {msg.text}
            {msg.image && (
              <div className="mt-2">
                <img src={msg.image} alt="chat-img" className="inline-block max-w-xs border border-green-700" />
              </div>
            )}
            <span className="ml-2 text-xs text-green-600">{msg.time}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex flex-col gap-2 md:flex-row md:gap-2">
        <input
          className="flex-1 bg-black border border-green-700 p-2 text-green-400 focus:outline-none focus:border-green-400 rounded"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <input
          type="file"
          accept="image/*"
          className="text-green-400"
          onChange={e => setImage(e.target.files?.[0] || null)}
        />
        <button
          className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded text-black font-bold"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
