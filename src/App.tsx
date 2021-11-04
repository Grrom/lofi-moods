import "./App.css";
import BottomIndicator from "./components/bottom-indicator/bottom-indicator";

import Moods from "./components/moods/moods";

function App() {
  return (
    <div className="App">
      <Moods></Moods>
      <BottomIndicator />
    </div>
  );
}

export default App;
