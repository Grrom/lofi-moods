import React, { useState } from "react";
import { useContext } from "react";
import { providerProps } from "../types/interfaces";

export const BufferingContext = React.createContext(false);
export const BufferingContextUpdate = React.createContext(
  (value: boolean) => {}
);

export function useBuffering() {
  return useContext(BufferingContext);
}

export function useBufferingUpdate() {
  return useContext(BufferingContextUpdate);
}

export default function BufferingProvider({ children }: providerProps) {
  const [isBuffering, setIsBuffering] = useState(false);
  function toggleBuffering(value: boolean) {
    setIsBuffering(() => value);
  }
  return (
    <BufferingContext.Provider value={isBuffering}>
      <BufferingContextUpdate.Provider value={toggleBuffering}>
        {children}
      </BufferingContextUpdate.Provider>
    </BufferingContext.Provider>
  );
}
