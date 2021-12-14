import { fireBaseHelper } from "../../App";
import { Music } from "../../types/music";

interface _props {
  mood: string;
  playMusic: (music: Music) => void;
}
export default function Mood({ mood, playMusic }: _props) {
  return (
    <div
      className="mood"
      onClick={async () => {
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
