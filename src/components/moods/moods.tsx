import { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { Music } from "../../types/music";
import { ActionButton } from "../misc/action-button/action-button";
import Mood from "./mood";
import "./moods.scss";

import mute from "../../assets/mute.svg";
import unMute from "../../assets/unMute.svg";

interface _props {
  setBottomMessage: (message: string) => void;
  setIsBuffering: (isBuffering: boolean) => void;
}

export default function Moods({ setBottomMessage, setIsBuffering }: _props) {
  const moods = ["happy", "lonely", "relax", "sleep"];
  const [isPlaying, setIsPlaying] = useState(false);
  const [selected, setSelected] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [music, setMusic] = useState<Music>();
  const [bg, setBg] = useState(
    "https://i.ytimg.com/vi/_ITiwPMUzho/maxresdefault.jpg"
  );

  function playMusic(music: Music) {
    setMusic(() => music);
    setIsPlaying(() => true);
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
    <div id="parent" style={{ backgroundImage: `url(${bg})` }}>
      <ActionButton
        onClick={() => setIsMuted((current) => !current)}
        isLoading={false}
        text={""}
        icon={isMuted ? mute : unMute}
        className="mute-button"
      />
      <div id="moods">
        {moods.map((value) => (
          <Mood
            onClick={() => setSelected(value)}
            mood={value}
            playMusic={playMusic}
            key={value}
            isSelected={selected === value}
          ></Mood>
        ))}
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
    </div>
  );
}
