import { useState } from "react";
import ReactPlayer from "react-player/youtube";
import Mood from "./mood";
import "./moods.scss";

import play from "../../assets/play.svg";
import pause from "../../assets/pause.svg";

export default function Moods() {
  const moods = ["happy", "lonely", "relax", "sleep"];
  const [playIcon, setPlayIcon] = useState(play);
  const [bottomPreview, setBottomPreview] = useState("How are you today?");
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicId, setMusicId] = useState("");
  const [bg, setBg] = useState(
    "https://i.ytimg.com/vi/_ITiwPMUzho/maxresdefault.jpg"
  );

  function playMusic(musicId: string) {
    setMusicId(() => musicId);
    checkAndSetBg(musicId);
    setIsPlaying(() => true);
    console.log(isPlaying);
  }
  function checkAndSetBg(musicId: string) {
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
            setBottomPreview("Now Playing: " + musicId);
            checkAndSetBg(musicId);
          }}
          onError={() =>
            setBottomPreview("Something went wrong while fetching the music")
          }
          onPlay={() => setPlayIcon(play)}
          onPause={() => setPlayIcon(pause)}
          playing={isPlaying}
          controls={true}
          autoPlay={true}
          url={`https://www.youtube.com/watch?v=${musicId}`}
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
