import Mood from "./mood";
import "./moods.scss";

export default function Moods() {
  const moods = ["Relax", "Chill", "Study", "Sleep"];

  return (
    <div id="moods">
      {moods.map((value) => (
        <Mood name={value}></Mood>
      ))}
    </div>
  );
}
