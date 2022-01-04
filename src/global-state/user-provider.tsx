import React, { useState } from "react";
import { useContext } from "react";
import { providerProps } from "../types/interfaces";
import User from "../types/user";

export const UserContext = React.createContext({} as User);
export const UserContextUpdate = React.createContext((value: User) => {});

export function useUser() {
  return useContext(UserContext);
}

export function useUserUpdate() {
  return useContext(UserContextUpdate);
}

export default function UserProvider({ children }: providerProps) {
  const [user, setUser] = useState({} as User);
  function updateUser(value: User) {
    setUser(() => value);
  }
  return (
    <UserContext.Provider value={user}>
      <UserContextUpdate.Provider value={updateUser}>
        {children}
      </UserContextUpdate.Provider>
    </UserContext.Provider>
  );
}
