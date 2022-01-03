import "./App.scss";

import Moods from "./components/moods/moods";
import FireBaseHelper from "./helpers/FirebaseHelper";
import { initializeApp } from "firebase/app";
import BottomIndicator from "./components/bottom-indicator/bottom-indicator";
import BufferingProvider from "./global-state/buffering-provider";
import BottomMessageProvider from "./global-state/bottom-message-provider";
import Controls from "./components/controls/controls";
import MutedProvider from "./global-state/muted-provider";

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
  return (
    <div id="app">
      <BufferingProvider>
        <BottomMessageProvider>
          <MutedProvider>
            <Controls />
            <Moods />
          </MutedProvider>
          <BottomIndicator />
        </BottomMessageProvider>
      </BufferingProvider>
    </div>
  );
}

export default App;
