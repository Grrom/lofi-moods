import "./App.scss";

import Moods from "./components/moods/moods";
import FireBaseHelper from "./helpers/firebase-helpers";

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
import MoodProvider from "./global-state/mood-provider";

export const authenticationHelper = new AuthenticationHelper(
  initializeApp({
    apiKey: "AIzaSyDl1rXG54RQlR7FnxPct8oLKYNkurrwNMY",
    authDomain: "lofi-moods.firebaseapp.com",
    databaseURL:
      "https://lofi-moods-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lofi-moods",
    storageBucket: "lofi-moods.appspot.com",
    messagingSenderId: "474872717326",
    appId: "1:474872717326:web:6284da735dc0392f4f5c5f",
    measurementId: "G-3LQDEFT82T",
  })
);

export const fireBaseHelper = new FireBaseHelper();
fireBaseHelper.testinglang();

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
                  <MoodProvider>
                    <>
                      <Controls />
                      <Profile />
                      <div
                        id="parent"
                        style={{ backgroundImage: `url(${bg})` }}
                      >
                        <Moods setBg={(bg) => setBg(bg)} />
                        <LiveChat />
                      </div>
                    </>
                  </MoodProvider>
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
