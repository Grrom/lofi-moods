import { fireBaseHelper } from "../../App";
import AlertHelper from "../../helpers/alert-helper";
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
          if (musicList.length === 0) {
            AlertHelper.errorToast(
              "Sorry there are no music in this mood right now, please choose a different mood."
            );
          } else {
            playMusic(musicList[0], mood);
          }
        }
      }}
    >
      {mood}
    </div>
  );
}
