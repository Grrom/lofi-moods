import "./App.scss";

import Moods from "./components/moods/moods";
import FireBaseHelper from "./helpers/FirebaseHelper";
import { initializeApp } from "firebase/app";
import BottomIndicator from "./components/bottom-indicator/bottom-indicator";
import { useState } from "react";

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

function App() {
  const [isBuffering, setIsBuffering] = useState(false);
  const [bottomMessage, setBottomMessage] = useState(
    "Hello, How are you today?"
  );

  function _setIsBuffering(isBuffering: boolean) {
    console.log(isBuffering);
    setIsBuffering(() => isBuffering);
  }

  function _setBottomMessage(message: string) {
    setBottomMessage(() => message);
  }

  return (
    <div id="app">
      <Moods
        setBottomMessage={_setBottomMessage}
        setIsBuffering={_setIsBuffering}
      ></Moods>
      <BottomIndicator message={bottomMessage} isBuffering={isBuffering} />
    </div>
  );
}

export default App;
