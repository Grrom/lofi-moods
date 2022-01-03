import React, { useState } from "react";
import { useContext } from "react";

export const BufferingContext = React.createContext(false);
export const BufferingContextUpdate = React.createContext((value: boolean) => {
  console.log(value);
});

export function useBuffering() {
  return useContext(BufferingContext);
}

export function useBufferingUpdate() {
  return useContext(BufferingContextUpdate);
}

interface _props {
  children: Array<JSX.Element>;
}

export default function BufferingProvider({ children }: _props) {
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
