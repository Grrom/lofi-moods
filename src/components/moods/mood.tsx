import { fireBaseHelper } from "../../App";
import { Music } from "../../types/music";

interface _props {
  mood: string;
  playMusic: (music: Music) => void;
  isSelected: boolean;
  onClick: () => void;
}
export default function Mood({ mood, playMusic, isSelected, onClick }: _props) {
  return (
    <div
      className={`mood ${isSelected ? "active" : ""}`}
      onClick={async () => {
        onClick();
        let musicList: Array<Music> = await fireBaseHelper.fetchMusic(mood);
        playMusic(
          musicList[Math.floor(Math.random() * (musicList.length - 0))]
        );
      }}
    >
      {mood}
    </div>
  );
}
