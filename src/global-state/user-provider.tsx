import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { authenticationHelper } from "../App";
import Badge from "../types/badge";
import { providerProps } from "../types/interfaces";
import LofiMoodsUser from "../types/user";

export const UserContext = React.createContext<LofiMoodsUser | null>(null);
export const UserContextUpdate = React.createContext(
  (value: User | null) => {}
);

export function useUser() {
  return useContext(UserContext);
}

export function useUserUpdate() {
  return useContext(UserContextUpdate);
}

export default function UserProvider({ children }: providerProps) {
  const [user, setUser] = useState<LofiMoodsUser | null>(null);
  function updateUser(user: User | null) {
    if (user !== null) {
      setUser(
        () =>
          new LofiMoodsUser(
            user.displayName!,
            user.email!,
            user.uid,
            user.emailVerified
          )
      );
    } else {
      setUser(() => null);
    }
  }

  useEffect(() => {
    const unsubscribe = authenticationHelper.auth.onAuthStateChanged(
      (user: User | null) => {
        updateUser(user);
      }
    );
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={user}>
      <UserContextUpdate.Provider value={updateUser}>
        {children}
      </UserContextUpdate.Provider>
    </UserContext.Provider>
  );
}
