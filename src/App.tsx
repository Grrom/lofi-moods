import "./App.scss";

import Moods from "./components/moods/moods";
import FireBaseHelper from "./helpers/FirebaseHelper";
import { initializeApp } from "firebase/app";
import BottomIndicator from "./components/bottom-indicator/bottom-indicator";
import { useContext, useState } from "react";
import React from "react";

initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

export const fireBaseHelper = new FireBaseHelper();

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

function App() {
  const [isBuffering, setIsBuffering] = useState(false);
  const [bottomMessage, setBottomMessage] = useState(
    "Hello, How are you today?"
  );

  function toggleBuffering(value: boolean) {
    setIsBuffering(() => value);
  }

  function _setBottomMessage(message: string) {
    setBottomMessage(() => message);
  }

  return (
    <div id="app">
      <button onClick={() => setIsBuffering((current) => !current)}>
        buffer
      </button>
      <BufferingContext.Provider value={isBuffering}>
        <BufferingContextUpdate.Provider value={toggleBuffering}>
          <Moods setBottomMessage={_setBottomMessage}></Moods>
          <BottomIndicator message={bottomMessage} />
        </BufferingContextUpdate.Provider>
      </BufferingContext.Provider>
    </div>
  );
}

export default App;
