import "./App.scss";

import Moods from "./components/moods/moods";
import FireBaseHelper from "./helpers/FirebaseHelper";
import { initializeApp } from "firebase/app";
import BottomIndicator from "./components/bottom-indicator/bottom-indicator";
import { useState } from "react";

initializeApp({
  apiKey: "AIzaSyDl1rXG54RQlR7FnxPct8oLKYNkurrwNMY",
  authDomain: "lofi-moods.firebaseapp.com",
  projectId: "lofi-moods",
  storageBucket: "lofi-moods.appspot.com",
  messagingSenderId: "474872717326",
  appId: "1:474872717326:web:50bfa76cd2dcf9164f5c5f",
  measurementId: "G-Q75WDCCK7V",
});
export const fireBaseHelper = new FireBaseHelper();

function App() {
  const [bottomMessage, setBottomMessage] = useState(
    "Hello, How are you today?"
  );

  function _setBottomMessage(message: string) {
    setBottomMessage(() => message);
  }

  return (
    <div id="app">
      <Moods setBottomMessage={_setBottomMessage}></Moods>
      <BottomIndicator message={bottomMessage} />
    </div>
  );
}

export default App;
