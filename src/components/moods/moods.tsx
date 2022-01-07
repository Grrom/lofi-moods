import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import Music from "../../types/music";
import Mood from "./mood";
import "./moods.scss";

import { fireBaseHelper } from "../../App";
import { useBufferingUpdate } from "../../global-state/buffering-provider";
import { useBottomMessageUpdate } from "../../global-state/bottom-message-provider";
import { useMuted } from "../../global-state/muted-provider";
import { Loader } from "../misc/loader/loader";
import { useMood, useMoodUpdate } from "../../global-state/mood-provider";

interface _props {
  setBg: (bg: string) => void;
}

export default function Moods({ setBg }: _props) {
  const [moods, setMoods] = useState([] as Array<string>);
  const [fetchingMoods, setFetchingMoods] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [music, setMusic] = useState<Music>();

  useEffect(() => {
    async function fetchMoods() {
      setFetchingMoods(true);
      let fetchedMoods = await fireBaseHelper.fetchMoods();
      setMoods(() => fetchedMoods);
      setFetchingMoods(false);
    }

    fetchMoods();
  }, []);

  const setIsBuffering = useBufferingUpdate();
  const setBottomMessage = useBottomMessageUpdate();
  const isMuted = useMuted();

  const mood = useMood();
  const setMood = useMoodUpdate();

  function playMusic(music: Music) {
    setMusic(() => music);
    setIsPlaying(() => true);
    setBottomMessage(`Fetching: ${music.title}`);
  }
  function checkAndSetBg(musicId?: string) {
    let image = new Image();
    image.src = `https://i.ytimg.com/vi/${musicId}/maxresdefault.jpg`;
    image.onload = function () {
      if (image.width > 120) {
        setBg(image.src);
      } else {
        setBg(`https://i.ytimg.com/vi/${musicId}/hqdefault.jpg`);
      }
    };
  }

  return (
    <div id="moods">
      {fetchingMoods ? (
        <Loader />
      ) : (
        moods.map((value) => (
          <Mood
            onClick={() => setMood(value)}
            mood={value}
            playMusic={playMusic}
            key={value}
            isSelected={mood === value}
          ></Mood>
        ))
      )}
      <ReactPlayer
        className="react-player"
        onStart={() => {
          setBottomMessage("Now Playing: " + music?.title);
          checkAndSetBg(music?.link);
        }}
        onError={() =>
          setBottomMessage("Something went wrong while fetching the music")
        }
        onBuffer={() => setIsBuffering(true)}
        onBufferEnd={() => setIsBuffering(false)}
        playing={isPlaying}
        muted={isMuted}
        controls={true}
        autoPlay={true}
        url={`https://www.youtube.com/watch?v=${music?.link}`}
        loop={true}
        config={{
          playerVars: {
            height: "144px",
            width: "256px",
            vq: "small",
          },
        }}
      />
    </div>
  );
}
