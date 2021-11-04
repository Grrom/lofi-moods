import "./App.scss";
import BottomIndicator from "./components/bottom-indicator/bottom-indicator";

import Moods from "./components/moods/moods";

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
