import "./App.scss";

import Moods from "./components/moods/moods";
import FireBaseHelper from "./helpers/FirebaseHelper";

import { initializeApp } from "firebase/app";
import BottomIndicator from "./components/bottom-indicator/bottom-indicator";
import BufferingProvider from "./global-state/buffering-provider";
import BottomMessageProvider from "./global-state/bottom-message-provider";
import Controls from "./components/controls/controls";
import MutedProvider from "./global-state/muted-provider";
import ModalProvider from "./global-state/profile-modal-provider";
import Profile from "./components/profile/profile";
import AuthenticationHelper from "./helpers/authentication-helper";
import UserProvider from "./global-state/user-provider";
import LiveChat from "./components/live-chat/live-chat";
import { useState } from "react";
import ChatShownProvider from "./global-state/chat-provider";

export const authenticationHelper = new AuthenticationHelper(
  initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  })
);

export const fireBaseHelper = new FireBaseHelper();

function App() {
  const [bg, setBg] = useState(
    "https://i.ytimg.com/vi/_ITiwPMUzho/maxresdefault.jpg"
  );

  return (
    <div id="app">
      <BufferingProvider>
        <BottomMessageProvider>
          <MutedProvider>
            <ModalProvider>
              <UserProvider>
                <ChatShownProvider>
                  <>
                    <Controls />
                    <Profile />
                    <div id="parent" style={{ backgroundImage: `url(${bg})` }}>
                      <Moods setBg={(bg) => setBg(bg)} />
                      <LiveChat />
                    </div>
                  </>
                </ChatShownProvider>
              </UserProvider>
            </ModalProvider>
          </MutedProvider>
          <BottomIndicator />
        </BottomMessageProvider>
      </BufferingProvider>
    </div>
  );
}

export default App;
