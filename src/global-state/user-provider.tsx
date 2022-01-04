import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { authenticationHelper } from "../App";
import { providerProps } from "../types/interfaces";
import LofiMoodsUser from "../types/user";

export const UserContext = React.createContext({} as LofiMoodsUser);
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
  const [user, setUser] = useState({} as LofiMoodsUser);
  function updateUser(user: User | null) {
    console.log("updating user");
    console.log(user?.email);
    if (user !== null) {
      setUser(() => new LofiMoodsUser("fasdf", "fadf", "adfasdf"));
    } else {
      setUser(() => ({} as LofiMoodsUser));
    }
  }

  useEffect(() => {
    console.log("listening for updates");
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
