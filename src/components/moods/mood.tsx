import { fireBaseHelper } from "../../App";
import Music from "../../types/music";

interface _props {
  mood: string;
  playMusic: (music: Music, selected: string) => void;
  isSelected: boolean;
}
export default function Mood({ mood, playMusic, isSelected }: _props) {
  return (
    <div
      className={`mood ${isSelected && "active"}`}
      onClick={async () => {
        if (!isSelected) {
          let musicList: Array<Music> = await fireBaseHelper.fetchMusic(mood);
          console.log(musicList);
          playMusic(musicList[0], mood);
        }
      }}
    >
      {mood}
    </div>
  );
}
