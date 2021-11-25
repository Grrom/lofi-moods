import "./App.scss";
import BottomIndicator from "./components/bottom-indicator/bottom-indicator";

import Moods from "./components/moods/moods";
import FireBaseHelper from "./helpers/FirebaseHelper";
import { initializeApp } from "firebase/app";


initializeApp({
      apiKey: "AIzaSyDl1rXG54RQlR7FnxPct8oLKYNkurrwNMY",
      authDomain: "lofi-moods.firebaseapp.com",
      projectId: "lofi-moods",
      storageBucket: "lofi-moods.appspot.com",
      messagingSenderId: "474872717326",
      appId: "1:474872717326:web:50bfa76cd2dcf9164f5c5f",
      measurementId: "G-Q75WDCCK7V",
    })
export const fireBaseHelper = new FireBaseHelper();

function App() {
  return (
    <div
      id="app"
      style={{
        backgroundImage: `url(https://i.ytimg.com/vi/_ITiwPMUzho/maxresdefault.jpg)`,
      }}
    >
      <Moods></Moods>
      <BottomIndicator />
    </div>
  );
}

export default App;
