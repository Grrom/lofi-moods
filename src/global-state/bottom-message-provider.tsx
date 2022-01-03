import React, { useState } from "react";
import { useContext } from "react";

export const BottomMessageContext = React.createContext("");
export const BottomMessageContextUpdate = React.createContext(
  (value: string) => {}
);

export function useBottomMessage() {
  return useContext(BottomMessageContext);
}

export function useBottomMessageUpdate() {
  return useContext(BottomMessageContextUpdate);
}

interface _props {
  children: Array<JSX.Element>;
}

export default function BottomMessageProvider({ children }: _props) {
  const [bottomMessage, setBottomMessage] = useState(
    "Hello, How are you today?"
  );
  function updateBottomMessage(value: string) {
    setBottomMessage(() => value);
  }
  return (
    <BottomMessageContext.Provider value={bottomMessage}>
      <BottomMessageContextUpdate.Provider value={updateBottomMessage}>
        {children}
      </BottomMessageContextUpdate.Provider>
    </BottomMessageContext.Provider>
  );
}
