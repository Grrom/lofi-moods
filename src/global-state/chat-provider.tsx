import React, { useState } from "react";
import { useContext } from "react";
import { providerProps } from "../types/interfaces";

export const ChatShownContext = React.createContext(true);
export const ChatShownContextUpdate = React.createContext(() => {});

export function useChatShown() {
  return useContext(ChatShownContext);
}

export function useChatShownUpdate() {
  return useContext(ChatShownContextUpdate);
}

export default function ChatShownProvider({ children }: providerProps) {
  const [isChatShown, setIsChatShown] = useState(true);
  function toggleChatShown() {
    setIsChatShown((current) => !current);
  }

  return (
    <ChatShownContext.Provider value={isChatShown}>
      <ChatShownContextUpdate.Provider value={toggleChatShown}>
        {children}
      </ChatShownContextUpdate.Provider>
    </ChatShownContext.Provider>
  );
}
