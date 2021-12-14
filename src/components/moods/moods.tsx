import { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { Music } from "../../types/music";
import Mood from "./mood";
import "./moods.scss";

interface _props {
  setBottomMessage: (message: string) => void;
}

export default function Moods({ setBottomMessage }: _props) {
  const moods = [
    "happy",
    "lonely",
    "relax",
    "sleep",
    "haha",
    "haha",
    "haha",
    "haha",
    "haha",
    "haha",
    "haha",
    "haha",
    "haha",
    "haha",
  ];
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [music, setMusic] = useState<Music>();
  const [bg, setBg] = useState(
    "https://i.ytimg.com/vi/_ITiwPMUzho/maxresdefault.jpg"
  );

  function playMusic(music: Music) {
    setMusic(() => music);
    setIsPlaying(() => true);
    console.log(isPlaying);
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
      <div id="moods">
        {moods.map((value) => (
          <Mood mood={value} playMusic={playMusic}></Mood>
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
