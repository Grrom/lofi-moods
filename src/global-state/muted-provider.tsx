import React, { useState } from "react";
import { useContext } from "react";
import { providerProps } from "../types/interfaces";

export const MutedContext = React.createContext(false);
export const MutedContextUpdate = React.createContext(() => {});

export function useMuted() {
  return useContext(MutedContext);
}

export function useMutedUpdate() {
  return useContext(MutedContextUpdate);
}

export default function MutedProvider({ children }: providerProps) {
  const [isMuted, setIsMuted] = useState(false);
  function toggleMuted() {
    setIsMuted((current) => !current);
  }

  return (
    <MutedContext.Provider value={isMuted}>
      <MutedContextUpdate.Provider value={toggleMuted}>
        {children}
      </MutedContextUpdate.Provider>
    </MutedContext.Provider>
  );
}
