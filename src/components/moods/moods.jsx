import Mood from "./mood";
import "./moods.scss";

export default function Moods() {
  const moods = ["Chill", "Study", "Sleep", "Sad", "Happy"];

  return (
    <div id="moods">
      {moods
        .sort((a, b) => a > b)
        .map((value) => (
          <Mood name={value}></Mood>
        ))}
    </div>
  );
}
