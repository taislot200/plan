import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  avatar: string | null;
}

const UserContext = createContext<{
  user: User;
  setUser: (u: User) => void;
}>({ user: { name: 'me', avatar: null }, setUser: () => {} });

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({ name: 'me', avatar: null });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
