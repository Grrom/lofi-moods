import React, { useState } from "react";
import { useContext } from "react";
import { providerProps } from "../types/interfaces";

export const MoodContext = React.createContext<string | undefined>(undefined);
export const MoodContextUpdate = React.createContext((value: string) => {});

export function useMood() {
  return useContext(MoodContext);
}

export function useMoodUpdate() {
  return useContext(MoodContextUpdate);
}

export default function MoodProvider({ children }: providerProps) {
  const [mood, setMood] = useState<string | undefined>(undefined);
  function updateMood(value: string) {
    setMood(() => value);
  }
  return (
    <MoodContext.Provider value={mood}>
      <MoodContextUpdate.Provider value={updateMood}>
        {children}
      </MoodContextUpdate.Provider>
    </MoodContext.Provider>
  );
}
